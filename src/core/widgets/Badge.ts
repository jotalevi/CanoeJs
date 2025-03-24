import DefaultStyles from "../enum/DefaultStyles";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Badge implements Widget {
    id: string;
    classes: string[];
    css: {};
    callbacks: {};
    children: Widget[];
    style: DefaultStyles;

    constructor(
        opts: Partial<{
            id: string,
            classes: string[],
            style: DefaultStyles,
            css: {},
            callbacks: {},
            children: Widget[]
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes;
        this.css = opts.css;
        this.callbacks = opts.callbacks;
        this.children = opts.children ?? [];

        this.classes.push('badge');
        this.classes.push('badge-' + (opts.style ?? DefaultStyles.PRIMARY).toString());

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("span");

        thisElement.id = this.id;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.style).forEach((key) => {
            thisElement.style[key] = this.style[key];
        });

        Object.keys(this.callbacks).forEach((key) => {
            thisElement.addEventListener(key, this.callbacks[key]);
        });

        this.children.forEach((child) => {
            thisElement.appendChild(child.render());
        });

        return thisElement;
    }
}
