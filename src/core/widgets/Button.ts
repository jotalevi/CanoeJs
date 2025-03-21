import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Button implements Widget {
    id: string;
    classes: string[];
    style: {};
    callbacks: {};
    text: string;

    constructor(
        opts: Partial<{
            id: string,
            classes: string[],
            style: {},
            callbacks: {},
            text: string,
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes;
        this.style = opts.style;
        this.callbacks = opts.callbacks;
        this.text = opts.text ?? 'Button';

        this.classes.push('btn');
        this.classes.push('btn-primary');

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");

        thisElement.id = this.id;
        thisElement.innerText = this.text;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.style).forEach((key) => {
            thisElement.style[key] = this.style[key];
        });

        Object.keys(this.callbacks).forEach((key) => {
            thisElement.addEventListener(key, this.callbacks[key]);
        });

        return thisElement;
    }
}
