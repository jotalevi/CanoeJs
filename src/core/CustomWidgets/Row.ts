import FlexAlignContent from "../enum/FlexAlignContent";
import FlexAlignItems from "../enum/FlexAlignItems";
import FlexJustify from "../enum/FlexJustify";
import FlexWrap from "../enum/Flexwrap";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Row implements Widget {
  static Wrap = FlexWrap;
  static AlignContent = FlexAlignContent;
  static Justify = FlexJustify;
  static AlignItems = FlexAlignItems;

  id: string;
  classes: string[];
  style: {}
  attributes: {}
  callbacks: { key: string; value: Function }[] | undefined;
  children: Widget[] = [];
  wrap: FlexWrap | undefined;
  alignContent: FlexAlignContent | undefined;
  justify: FlexJustify | undefined;
  alignItems: FlexAlignItems | undefined;
  gap: string | number | undefined;

  constructor(
    opts: Partial<{
      id: string | undefined;
      classes: string[] | undefined;
      style: {} | undefined;
      attributes: {} | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
      children: Widget[] | undefined;
      wrap: FlexWrap | undefined;
      alignContent: FlexAlignContent | undefined;
      justify: FlexJustify | undefined;
      alignItems: FlexAlignItems | undefined;
      gap: string | number | undefined;
    }>
  ) {
    this.id = opts.id || randomId();
    this.classes = opts.classes || [];
    this.style = opts.style || [];
    this.attributes = opts.attributes || [];
    this.callbacks = opts.callbacks || [];
    this.children = opts.children || [];

    this.style["display"] = "flex";
    this.style["flex-direction"] = "row";
    this.style["flex-wrap"] = opts.wrap || FlexWrap.WRAP;
    this.style["align-content"] = opts.alignContent || FlexAlignContent.START;
    this.style["justify-content"] = opts.justify || FlexJustify.START;
    this.style["align-items"] = opts.alignItems || FlexAlignItems.START;
    this.style["gap"] = opts?.gap?.toString() || "10px";

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement("div");

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

    this.children.forEach((child) => {
      thisElement.appendChild(child.render());
    });

    return thisElement;
  }
}
