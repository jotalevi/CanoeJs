import Widget from "./Widget";

export default class Render {
  rootId: string = "";
  rootWidget: Widget;

  constructor(rootId: string = "", rootWidget: Widget) {
    this.rootId = rootId;
    this.rootWidget = rootWidget;
  }

  render(): HTMLElement {
    //remove all children from root element
    while (document.getElementById(this.rootId).firstChild) {
      document
        .getElementById(this.rootId)
        .removeChild(document.getElementById(this.rootId).firstChild);
    }

    document.getElementById(this.rootId).appendChild(this.rootWidget.render());
    return document.getElementById(this.rootId);
  }
}
