import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Router implements Widget {
  id: string;
  routes: { route: string, widget: Widget }[] = [];
  currentRoute: string;

  constructor(opts: Partial<{
    id?: string,
    routes: {
      route: string,
      widget: Widget
    }[],
    currentRoute: string
  }> = {}) {
    this.id = opts.id || randomId();
    this.routes = opts.routes || [];
    this.currentRoute = opts.currentRoute || window.location.pathname;
    return this;
  }

  addRoute(route: string, widget: Widget) {
    this.routes.push({ route, widget });
  }

  render(): HTMLElement {
    this.currentRoute = window.location.pathname;

    const element = this.routes.find((r) => r.route === this.currentRoute);

    if (!element) {
      const notFound = document.createElement("div");
      notFound.innerText = "404 Not Found";
      return notFound;
    }

    return element.widget.render();
  }
}
