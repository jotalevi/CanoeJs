import Widget from "../Widget";

export default class Container extends Widget {
    classes: string[];
    css: {};
    children: Widget[];

    constructor(
        opts: Partial<{
            id: string;
            classes: string[];
            css: {};
            children: Widget[];
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.classes.push('container');

        this.css = opts.css ?? {};
        this.children = opts.children ?? [];
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

        this.children.forEach((child) => {
            thisElement.appendChild(child.render());
        });

        return thisElement;
    }
}
