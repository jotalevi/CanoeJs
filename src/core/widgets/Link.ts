import { Canoe } from "../../canoe";
import Widget from "../Widget";

export default class Logo implements Widget {
    id: string;
    classes: string[];
    style: {};
    attributes: {};
    callbacks: { key: string; value: Function }[];
    children: Widget[];
    to: string;

    constructor(
        opts: Partial<{
            id: string | undefined;
            classes: string[] | undefined;
            style: {} | undefined;
            attributes: {} | undefined;
            callbacks: { key: string; value: Function }[] | undefined;
            children: Widget[] | undefined;
            to: string | undefined;
        }>
    ) {
      
        this.id = opts.id || "link";
        this.classes = opts.classes || [];
        this.style = opts.style || {};
        this.attributes = opts.attributes || {};
        this.callbacks = opts.callbacks || [];
        this.children = opts.children || [];
        this.to = opts.to || "#";

        return this
    }

    render(): HTMLElement {
        let element = document.createElement("a");

        element.id = this.id;
        element.className = this.classes.join(" ");
        element.style.cssText = Object.entries(this.style).map(([key, value]) => `${key}: ${value};`).join(" ");
        
        Object.entries(this.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value as string);
        });


        this.callbacks.push({
            key: "click",
            value: () => {
                Canoe.navigate(this.to);
            }
        });

        this.callbacks.forEach(({ key, value }) => {
            // @ts-ignore
            element.addEventListener(key, value);
        });

        this.children.forEach((child) => {
            element.appendChild(child.render());
        });

        return element;
    }
}