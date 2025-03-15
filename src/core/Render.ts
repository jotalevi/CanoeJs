import Widget from "./Widget";

export default class Render {
  rootId: string = "";
  rootWidget: Widget;

  constructor(rootId: string = "", rootWidget: Widget) {
    this.rootId = rootId;
    this.rootWidget = rootWidget;
  }

  private getFocus = (): string | null => {
    let el = document.activeElement;
    if (!(el instanceof HTMLElement)) return null;
    const path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE && el !== document.body) {
      let selector = el.nodeName.toLowerCase();
      if (el.className) {
        const classes = el.className.trim().split(/\s+/).join(".");
        selector += `.${classes}`;
      }
      const sibling = Array.from(el.parentNode!.children).filter(
        (e) => e.nodeName === el.nodeName
      );
      if (sibling.length > 1) {
        selector += `:nth-of-type(${Array.from(el.parentNode!.children).indexOf(el) + 1
          })`;
      }
      path.unshift(selector);
      el = el.parentElement!;
    }
    return path.join(" > ");
  };

  // Restore focus to an element using the stored selector
  private setFocus = (selector: string | null) => {
    if (!selector) return;
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  render(): HTMLElement {
    //get the current focus
    let focus = this.getFocus();

    //remove all children from root element
    while (document.getElementById(this.rootId).firstChild) {
      document
        .getElementById(this.rootId)
        .removeChild(document.getElementById(this.rootId).firstChild);
    }

    //render the root widget
    document.getElementById(this.rootId).appendChild(this.rootWidget.render());

    //restore focus
    this.setFocus(focus);

    //return the root element
    return document.getElementById(this.rootId);
  }
}
