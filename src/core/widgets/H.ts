import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class H implements Widget {
    id: string;
    size: number | string;   
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
        this.size = opts.size ?? 1;
        this.text = opts.text ?? "";
        this.css = opts.css ?? {};

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("h" + this.size.toString());
        thisElement.id = this.id;
        thisElement.innerText = this.text;
        thisElement.classList.add("h" + this.size.toString());

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        return thisElement;
    }
}