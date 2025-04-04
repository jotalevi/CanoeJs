import { Canoe, Col, H } from "../canoe";
import Widget from "./Widget";

export default class Router {
    routesp = {
        "/": {
            component: () => new H({ text: "Home" }),
            title: "Home",
        }
    }
    private static routes: { [key: string]: {
                                component: () => Widget
                                title: string
                            }} = {};

    public static addRoute(path: string, component: () => Widget, title: string | null = null): void {
        Router.routes[path] = {
            component: component,
            title: title == null ? path : title,
        }
        
        console.log("Route added: " + path);
        console.log(Router.routes);
    }

    public static render(state): Widget | null {
        console.log("Requested Path:", state.url)
        console.log("Routes Available:", Router.routes)

        if (Router.routes[state.url]) {
            console.log("Rendering route: " + state.url);
            Canoe.setTitle(Router.routes[state.url].title);
            return Router.routes[state.url].component();
        }

        let requiredRouteArr = state.url.split("/");
        for (const route of Object.keys(Router.routes)) {
            let routeArr = route.split("/");

            if (requiredRouteArr.length !== routeArr.length) continue;

            let isMatch = true;
            let params = {}
            for (let i = 0; i < routeArr.length; i++) {
                if (routeArr[i] !== requiredRouteArr[i] && !routeArr[i].startsWith(":")) {
                    isMatch = false;
                    break;
                }

                if (routeArr[i].startsWith(":")) {
                    params[routeArr[i].replace(':', '')] = requiredRouteArr[i];
                }
            }
            Canoe.setState({
                ...Canoe.getState(),
                ...params,
            });

            Canoe.setTitle(Router.routes[route].title);
            return Router.routes[route].component();

        }

        Canoe.setTitle("Page not found");
        return new Col({
            children: [
                new H({
                    size: 1,
                    text: "404",
                })
            ]
        })
    }

    public static navigate(url: string): void {
        if (url.includes("http") || url.includes("www")) {
            window.open(url, "_blank");
            return;
        } else {
            window.history.pushState({}, "", url);
        }
    }
}