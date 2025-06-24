import DefaultStyles from "../enum/defaultStyles";
import Widget from "../Widget";
import Button from "./Button";

export default class Card extends Widget {
    classes: string[];
    css: {};
    header: Widget[];
    body: Widget[];
    footer: Widget[]; 
    style: DefaultStyles;

    constructor(
        opts: Partial<{
            id: string;
            classes: string[];
            css: {};
            header: Widget[];
            body: Widget[];
            footer: Widget[];
            style: DefaultStyles;
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.css = opts.css ?? {};
        this.style = opts.style ?? DefaultStyles.LIGHT;

        this.header = opts.header ?? [];
        this.body = opts.body ?? [];
        this.footer = opts.footer ?? [];

        this.classes.push('card');
        this.classes.push('card-' + this.style);
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");

        thisElement.id = this.id;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        if (this.header.length > 0) {
            let headerElement = document.createElement("div");
            headerElement.classList.add("card-header");
            this.header.forEach((child) => {
                headerElement.appendChild(child.render());
            });
            thisElement.appendChild(headerElement);
        }

        if (this.body.length > 0) {
            let bodyElement = document.createElement("div");
            bodyElement.classList.add("card-body");
            this.body.forEach((child) => {
                bodyElement.appendChild(child.render());
            });
            thisElement.appendChild(bodyElement);
        }

        if (this.footer.length > 0) {
            let footerElement = document.createElement("div");
            footerElement.classList.add("card-footer");
            this.footer.forEach((child) => {
                footerElement.appendChild(child.render());
            });
            thisElement.appendChild(footerElement);
        }

        return thisElement;
    }
}
