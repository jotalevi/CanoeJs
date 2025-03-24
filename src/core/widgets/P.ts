import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class P implements Widget {
    id: string;
    text: string;
    css: {};

    constructor(
        opts: Partial<{
            id: string;
            size: number | string;
            text: string;
            css: {};
        }>
    ) {
        this.id = opts.id ?? randomId();
        this.text = opts.text ?? "";
        this.css = opts.css ?? {};

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("p");
        thisElement.id = this.id;
        thisElement.innerText = this.text;
        thisElement.classList.add("p");

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        return thisElement;
    }
}