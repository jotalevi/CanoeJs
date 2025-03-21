import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class H implements Widget {
  id: string;
  classes: string[];
  style: {};
  attributes: {};
  callbacks: { key: string; value: Function }[];
  size: number = 3;
  text: string = "";

  constructor(
    opts: Partial<{
      id: string | undefined;
      classes: string[] | undefined;
      style: {} | undefined;
      attributes: {} | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      size: number | undefined;
      text: string | undefined;
    }>
  ) {
    this.id = opts.id || randomId();
    this.classes = opts.classes || [];
    this.style = opts.style || {};
    this.attributes = opts.attributes || {};
    this.callbacks = opts.callbacks || [];
    this.size = opts.size || 3;
    this.text = opts.text || "";

    this.classes.push("text");

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement(`H${this.size}`);
    thisElement.id = this.id;

    thisElement.innerText = this.text;

    this.classes.forEach((className) => {
      thisElement.classList.add(className);
    });

    Object.keys(this.style).forEach((key) => {
      thisElement.style[key] = this.style[key];
    })

    Object.keys(this.attributes).forEach((key) => {
      thisElement.setAttribute(`canoe-attrib-${key}`, this.attributes[key]);
    })

    this.callbacks.forEach((callback) => {
      // @ts-ignore
      thisElement.addEventListener(callback.key, callback.value);
    });

    return thisElement;
  }
}
