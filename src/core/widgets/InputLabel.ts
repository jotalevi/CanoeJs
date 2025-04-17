import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class InputLabel implements Widget {
    id: string;
    text: string;
    css: {};

    constructor(
        opts: Partial<{
            id: string,
            text: string,
            css: {},
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.text = opts.text ?? "";
        this.css = opts.css ?? {};

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("span");
        thisElement.id = this.id;
        thisElement.classList.add("input-group-text");
        thisElement.innerText = this.text;
        
        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        return thisElement;
    }
}