export default abstract class Widget {
  id: string = "";
  classes: string[] = [];
  style: { key: string; value: string }[] = [];
  attributes: { key: string; value: string }[] = [];
  callbacks: { key: string; value: Function }[] = [];

  randomId = (length = 8): string => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  constructor(
    opts: Partial<{
      id: string | undefined;
      classes: string[] | undefined;
      style: { key: string; value: string }[] | undefined;
      attributes: { key: string; value: string }[] | undefined;
      callbacks: { key: string; value: Function }[] | undefined;
    }>
  ) {
    this.id = opts.id || this.randomId();
    this.classes = opts.classes || [];
    this.style = opts.style || [];
    this.attributes = opts.attributes || [];
    this.callbacks = opts.callbacks || [];

    return this;
  }

  render(): HTMLElement {
    let thisElement = document.createElement("p");

    thisElement.id = this.id;
    thisElement.innerHTML = `Widget with ID: ${this.id}`;

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
