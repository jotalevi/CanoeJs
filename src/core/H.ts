import Widget from "./Widget";

export default class H extends Widget {
  size: number = 3;
  text: string = "";

  constructor(
    opts: Partial<{
      id: string | undefined;
      classes: string[] | undefined;
      style: { key: string; value: string }[] | undefined;
      attributes: { key: string; value: string }[] | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      size: number | undefined;
      text: string | undefined;
    }>
  ) {
    super(opts);

    this.size = opts.size || 3;
    this.text = opts.text || "";

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement(`H${this.size}`);
    thisElement.id = this.id;

    thisElement.innerText = this.text;

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
