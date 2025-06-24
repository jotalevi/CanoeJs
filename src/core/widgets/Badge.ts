import DefaultStyles from "../enum/defaultStyles";
import Widget from "../Widget";

export default class Badge extends Widget {
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
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.classes.push('badge');
        this.style = opts.style ?? DefaultStyles.PRIMARY;
        this.classes.push('badge-' + this.style.toString());

        this.css = opts.css ?? {};
        this.callbacks = opts.callbacks ?? {};
        this.children = opts.children ?? [];
    }

    render(): HTMLElement {
        let thisElement = document.createElement("span");

        thisElement.id = this.id;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
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
