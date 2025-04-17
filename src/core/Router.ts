import { Canoe, Col, H } from "../canoe";
import Widget from "./Widget";

interface Route {
    component: () => Widget;
    title: string;
}

interface RouterState {
    url: string;
    [key: string]: any;
}

export default class Router {
    private static routes: Record<string, Route> = {};

    public static addRoute(path: string, component: () => Widget, title: string | null = null): void {
        Router.routes[path] = {
            component,
            title: title ?? path,
        };
        if (Canoe.debug) console.log("Route added:", path);
    }

    public static render(state: RouterState): Widget {
        const { url } = state;
        const exactRoute = Router.routes[url];

        if (exactRoute) {
            Canoe.setTitle(exactRoute.title);
            return exactRoute.component();
        }

        const requestedParts = url.split("/");

        for (const [routePath, route] of Object.entries(Router.routes)) {
            const routeParts = routePath.split("/");
            if (routeParts.length !== requestedParts.length) continue;

            const params: Record<string, string> = {};
            let isMatch = true;

            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(":")) {
                    params[routeParts[i].substring(1)] = requestedParts[i];
                } else if (routeParts[i] !== requestedParts[i]) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) {
                Canoe.setState({
                    ...Canoe.getState(),
                    ...params,
                });
                Canoe.setTitle(route.title);
                return route.component();
            }
        }

        Canoe.setTitle("Page not found");
        return this.notFoundComponent();

    }

    public static navigate(url: string): void {
        if (/^https?:\/\//.test(url) || url.includes("www")) {
            window.open(url, "_blank");
        } else {
            window.history.pushState({}, "", url);
        }
    }

    private static notFoundComponent: () => Widget = () =>
        new Col({ children: [new H({ size: 1, text: "404" })] });

    public static setNotFoundComponent(component: () => Widget): void {
        this.notFoundComponent = component;
    }

}
