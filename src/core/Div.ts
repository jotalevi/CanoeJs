import Widget from "./Widget";

export default class Div extends Widget {
  children: Widget[] = [];

  constructor(
    opts: Partial<{
      id: string | undefined;
      classes: string[] | undefined;
      style: { key: string; value: string }[] | undefined;
      attributes: { key: string; value: string }[] | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      children: Widget[] | undefined;
    }>
  ) {
    super(opts);
    this.children = opts.children || [];

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement("div");

    thisElement.id = this.id;

    this.classes.forEach((className) => {
      thisElement.classList.add(className);
    });

    this.style.forEach((style) => {
      thisElement.style[style.key] = style.value;
    });

    this.attributes.forEach((attribute) => {
      thisElement.setAttribute(
        `canoe-attrib-${attribute.key}`,
        attribute.value
      );
    });

    this.callbacks.forEach((callback) => {
      // @ts-ignore
      thisElement.addEventListener(callback.key, callback.value);
    });

    this.children.forEach((child) => {
      thisElement.appendChild(child.render());
    });

    return thisElement;
  }
}
