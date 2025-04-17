import randomId from "../utils/randomId";
import Widget from "../Widget";
import { Canoe } from "../../canoe";

export default class Input implements Widget {
    id: string;
    value: string;
    type: string;
    placeholder: string;
    onChange: (value: string) => void;
    css: {};
    validator: ((value: string) => boolean) | null = null;

    constructor(
        opts: Partial<{
            id: string,
            value: string,
            type: string,
            placeholder: string,
            onChange: (value: string) => void,
            css: {},
            validator: (value: string) => boolean
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.value = opts.value ?? ""
        this.type = opts.type ?? "text"
        this.placeholder = opts.placeholder ?? ""
        this.onChange = opts.onChange ?? ((e) => { if (Canoe.debug) console.log(e) })
        this.css = opts.css
        this.validator = opts.validator ?? ((e) => true)

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("input");
        thisElement.id = this.id;
        thisElement.type = this.type;
        thisElement.value = this.value;
        thisElement.placeholder = this.placeholder;
        thisElement.classList.add("input");

        thisElement.addEventListener("input", (e) => {
            this.value = (e.target as HTMLInputElement).value;
            if (this.onChange) {
                this.onChange(this.value);
            }
        });
        
        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        this.validator(this.value) ? thisElement.classList.remove("invalid") : thisElement.classList.add("invalid");

        return thisElement;
    }
}