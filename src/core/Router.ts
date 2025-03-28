import Widget from "./Widget";

export default class Router {
    private static routes: { [key: string]: () => Widget } = {};

    public static addRoute(path: string, component: () => Widget) {
        this.routes[path] = component;
    }

    public static render(path: string = "/"): Widget | null {
        if (this.routes[path]) {
            return this.routes[path]();
        }

        let reqRoute = path.split("/");

        for (const route of Object.keys(this.routes)) {
            let routeParts = route.split("/");
            if (routeParts.length !== reqRoute.length) {
                continue;
            }
            
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i] !== reqRoute[i] && !routeParts[i].startsWith(":")) {
                    break;
                }
            }

            return this.routes[route]();
        }

        return null;
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