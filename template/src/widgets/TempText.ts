import { Widget } from "canoejs";

export default class TempText implements Widget {
    id: string;
    text: string;
    css: {};

    constructor(props: { id: string; text: string; css?: {} }) {
        this.id = props.id;
        this.text = props.text;
        this.css = props.css || {};
    }

    render(): HTMLElement {
        const element = document.createElement("p");

        element.id = this.id;
        element.innerText = this.text;

        Object.keys(this.css).forEach((key) => {
            element.style[key] = this.css[key];
        });

        return element;
    }
} 