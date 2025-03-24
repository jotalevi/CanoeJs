import randomId from "../utils/randomId";
import Widget from "../Widget";
import Button from "./Button";

export default class GroupedButtons implements Widget {
    id: string;
    classes: string[];
    css: {};
    buttons: Button[];

    constructor(
        opts: Partial<{
            id: string;
            classes: string[];
            css: {};
            buttons: Button[];
        }>
    ) {
        if (!opts.buttons || opts.buttons.length === 0)
            throw new Error('GroupedButtons should recieve at least one button.');
        this.buttons = opts.buttons;

        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes ?? [];
        this.classes.push('btn-group');

        this.css = opts.css ?? {};

        return this;
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

        this.buttons.forEach((button) => {
            thisElement.appendChild(button.render());
        });

        return thisElement;
    }
}
