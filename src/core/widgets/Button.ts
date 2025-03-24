import DefaultStyles from "../enum/DefaultStyles";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Button implements Widget {
    id: string;
    classes: string[];
    css: {};
    callbacks: {};
    text: string;
    style: DefaultStyles;

    constructor(
        opts: Partial<{
            style: DefaultStyles,
            id: string,
            classes: string[],
            css: {},
            callbacks: {},
            text: string,
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes;
        this.css = opts.css;
        this.callbacks = opts.callbacks;
        this.text = opts.text ?? 'Button';

        this.classes.push('btn');
        this.classes.push('btn-' + (opts.style ?? DefaultStyles.PRIMARY).toString());

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");

        thisElement.id = this.id;
        thisElement.innerText = this.text;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        Object.keys(this.callbacks).forEach((key) => {
            thisElement.addEventListener(key, this.callbacks[key]);
        });

        return thisElement;
    }
}
