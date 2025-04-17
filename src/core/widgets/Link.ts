import { Canoe } from "../../canoe";
import EventLinker from "../EventLinker";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Link implements Widget {
    id: string;
    text: string;
    to: string;
    css: {};

    constructor(
        opts: Partial<{
            id: string;
            to: string;
            text: string;
            css: {};
        }>
    ) {
        this.id = opts.id ?? randomId();
        this.to = opts.to ?? "/"; // Default to root
        this.text = opts.text ?? "";
        this.css = opts.css ?? {};

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("p");
        thisElement.id = this.id;
        thisElement.innerText = this.text;
        thisElement.classList.add("a");

        thisElement.setAttribute('eid', randomId());
        EventLinker.addEvent(thisElement, "click", (e) => {
            Canoe.navigate(this.to);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        return thisElement;
    }
}