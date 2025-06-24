import DefaultStyles from "../enum/defaultStyles";
import Widget from "../Widget";
import EventLinker from "../EventLinker";

export default class Button extends Widget {
    classes: string[];
    css: {};
    callbacks: {};
    text: string;
    style: DefaultStyles;

    constructor(
        opts: Partial<{
            style: DefaultStyles,
            id: string,
            classes: string[],
            css: {},
            callbacks: {},
            text: string,
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.classes.push('btn');
        this.style = opts.style ?? DefaultStyles.PRIMARY;
        this.classes.push('btn-' + this.style.toString());

        this.css = opts.css ?? {};
        this.callbacks = opts.callbacks ?? {};
        this.text = opts.text ?? 'Button';
        
        // Add default cursor pointer if not already set
        if (!this.css['cursor']) {
            this.css['cursor'] = 'pointer';
        }
    }

    render(): HTMLElement {
        let thisElement = document.createElement("button");

        thisElement.id = this.id;
        thisElement.innerText = this.text;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        Object.keys(this.callbacks).forEach((key) => {
            EventLinker.addEvent(thisElement, key, this.callbacks[key]);
        });

        return thisElement;
    }
}
