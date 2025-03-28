import { Canoe, Col, H } from "../canoe";
import Widget from "./Widget";

export default class Router {
    private static routes: { [key: string]: () => Widget } = {};

    public static addRoute(path: string, component: () => Widget) {
        Router.routes[path] = component;

        console.log("Route added: " + path);
        console.log(Router.routes);
    }

    public static render(state): Widget | null {
        console.log("Requested Path:", state.url)
        console.log("Routes Available:", Router.routes)

        if (Router.routes[state.url]) {
            console.log("Rendering route: " + state.url);
            return Router.routes[state.url]();
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

            return Router.routes[route]();

        }

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