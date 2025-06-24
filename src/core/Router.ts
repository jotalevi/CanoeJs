import { Canoe, Col, H } from "../canoe";
import Widget from "./Widget";

interface Route {
    component: (state?: any) => Widget;
    title: string;
    params?: string[];
}

interface RouterState {
    url: string;
    [key: string]: any;
}

export default class Router {
    private static routes = new Map<string, Route>();
    private static routeCache = new Map<string, Route>();
    private static paramRoutes: Array<{pattern: string, route: Route, params: string[]}> = [];

    public static addRoute(path: string, component: (state?: any) => Widget, title: string | null = null): void {
        const params: string[] = [];
        const pattern = path.replace(/:(\w+)/g, (_, param) => {
            params.push(param);
            return '([^/]+)';
        });
        
        const route: Route = {
            component,
            title: title ?? path,
            params
        };
        
        if (params.length > 0) {
            // Ruta con parámetros
            this.paramRoutes.push({pattern, route, params});
        } else {
            // Ruta exacta
            this.routes.set(path, route);
        }
        
        if (Canoe.debug) console.log("Route added:", path);
    }

    public static render(state: RouterState): Widget {
        const { url } = state;
        
        // Cache check para rutas exactas
        const exactRoute = this.routes.get(url);
        if (exactRoute) {
            Canoe.setTitle(exactRoute.title);
            return exactRoute.component(state);
        }
        
        // Cache check para rutas con parámetros
        const cachedRoute = this.routeCache.get(url);
        if (cachedRoute) {
            Canoe.setTitle(cachedRoute.title);
            return cachedRoute.component(state);
        }

        // Buscar en rutas con parámetros
        for (const {pattern, route, params} of this.paramRoutes) {
            const regex = new RegExp(`^${pattern}$`);
            const match = url.match(regex);
            
            if (match) {
                const paramValues: Record<string, string> = {};
                params.forEach((param, index) => {
                    paramValues[param] = match[index + 1];
                });
                
                // Actualizar estado con parámetros
                Canoe.setState({
                    ...Canoe.getState(),
                    ...paramValues,
                });
                
                Canoe.setTitle(route.title);
                
                // Cache la ruta para futuras consultas
                this.routeCache.set(url, route);
                
                return route.component(state);
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

    public static clearCache(): void {
        this.routeCache.clear();
    }
}
