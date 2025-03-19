import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Image implements Widget {
  id: string;
  src: string;
  alt: string | undefined;
  fit: string | undefined;
  width: string | undefined;
  height: string | undefined;
  classes: string[];
  style: {}
  attributes: {}
  callbacks: { key: string; value: Function }[] | undefined;

  constructor(
    opts: Partial<{
      id: string | undefined;
      src: string;
      alt: string | undefined;
      fit: string | undefined;
      width: string | undefined;
      height: string | undefined;
      classes: string[] | undefined;
      style: {} | undefined;
      attributes: {} | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
    }>
  ) {
    this.id = opts.id || randomId();
    this.src = opts.src;
    this.alt = opts.alt || "Image";
    this.fit = opts.fit || "cover";
    this.width = opts.width || "100px";
    this.height = opts.height || "100px";
    this.classes = opts.classes || [];
    this.style = opts.style || {};
    this.attributes = opts.attributes || {};
    this.callbacks = opts.callbacks || [];

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement("img");

    thisElement.id = this.id;
    thisElement.src = this.src;
    thisElement.alt = this.alt;
    thisElement.style.width = this.width;
    thisElement.style.height = this.height;
    thisElement.style.objectFit = this.fit;

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
