import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Router implements Widget {
  id: string;
  routes: { route: string, widget: Widget }[] = [];
  currentRoute: string;

  constructor() {
    this.id = randomId();
    this.routes = [];
    this.currentRoute = window.location.pathname;
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
