import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Button implements Widget {
    id: string;
    classes: string[];
    style: {}
    attributes: {}
    callbacks: { key: string; value: Function }[] | undefined;
    children: Widget[] = [];

    constructor(
        opts: Partial<{
            id: string | undefined;
            classes: string[] | undefined;
            style: {} | undefined;
            attributes: {} | undefined;
            callbacks: { key: string; value: Function }[] | undefined;
            children: Widget[] | undefined;
        }>
    ) {
        this.id = opts.id || randomId();
        this.classes = opts.classes || [];
        this.style = opts.style || [];
        this.attributes = opts.attributes || [];
        this.callbacks = opts.callbacks || [];
        this.children = opts.children || [];

        this.classes.push("button");

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
