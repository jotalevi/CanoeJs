import randomId from "../utils/randomId";
import Widget from "../Widget";
import Input from "./Input";
import InputLabel from "./InputLabel";


export default class InputGroup implements Widget {
    id: string;
    input: Input
    label: InputLabel;
    rtl: boolean = false;
    css: {};

    constructor(
        opts: Partial<{
            id: string,
            input: Input,
            label: InputLabel,
            rtl: boolean,
            css: {},
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.input = opts.input ?? new Input({});
        this.label = opts.label ?? new InputLabel({});
        this.rtl = opts.rtl ?? false;
        this.css = opts.css ?? {};

        return this;
    }

    render(): HTMLElement {
        //<div class="input-group">
        let thisElement = document.createElement("div");
        thisElement.id = this.id;
        thisElement.classList.add("input-group");
        
        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        // WHAT A SHIT WAY TO MANAGE LTR
        if (this.rtl) thisElement.appendChild(this.label.render());
        thisElement.appendChild(this.input.render());
        if (!this.rtl) thisElement.appendChild(this.label.render());

        return thisElement;
    }
}