import Widget from "./Widget";

export default class Div extends Widget {
  placeholder: string | undefined;
  value: string | undefined;

  constructor(
    opts: Partial<{
      id: string | undefined;
      placeholder: string | undefined;
      classes: string[] | undefined;
      style: { key: string; value: string }[] | undefined;
      attributes: { key: string; value: string }[] | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      value: string | undefined;
    }>
  ) {
    super(opts);
    this.placeholder = opts.placeholder || "";
    this.value = opts.value || "";

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement("input");

    thisElement.type = "text";
    thisElement.placeholder = this.placeholder;
    thisElement.value = this.value;

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

    return thisElement;
  }
}
