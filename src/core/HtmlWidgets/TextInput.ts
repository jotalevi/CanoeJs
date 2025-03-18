import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Div implements Widget {
  id: string
  classes: string[]
  style: {}
  attributes: {}
  callbacks: { key: string; value: Function }[]
  placeholder: string | undefined;
  value: string | undefined;

  constructor(
    opts: Partial<{
      id: string | undefined;
      placeholder: string | undefined;
      classes: string[] | undefined;
      style: {} | undefined;
      attributes: {} | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      value: string | undefined;
    }>
  ) {
    this.id = opts.id || randomId();
    this.classes = opts.classes || [];
    this.style = opts.style || {}
    this.attributes = opts.attributes || {};
    this.callbacks = opts.callbacks || [];
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
