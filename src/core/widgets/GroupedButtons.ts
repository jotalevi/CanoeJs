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
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes ?? [];
        this.css = opts.css ?? {};

        if (!opts.buttons || opts.buttons.length === 0)
            throw new Error('GroupedButtons should recieve at least one button.');
        
        this.buttons = opts.buttons;

        this.classes.push('btn-group');

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
