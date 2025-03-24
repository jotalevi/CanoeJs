import FlexAlignContent from "../enum/FlexAlignContent";
import FlexAlignItems from "../enum/FlexAlignItems";
import FlexJustify from "../enum/FlexJustify";
import FlexWrap from "../enum/FlexWrap";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Col implements Widget {
    id: string;
    classes: string[];
    css: {};
    children: Widget[];

    constructor(
        opts: Partial<{
            id: string;
            classes: string[];
            css: {};
            children: Widget[];
            flexAlignContent: FlexAlignContent;
            flexAlignItems: FlexAlignItems;
            flexJustify: FlexJustify;
            flexWrap: FlexWrap;
            flexGap: string;
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes ?? [];
        this.css = opts.css ?? {};

        this.css["align-items"] = opts.flexAlignItems ?? FlexAlignItems.CENTER;
        this.css["justify-content"] = opts.flexJustify ?? FlexJustify.START;
        this.css["align-content"] = opts.flexAlignContent ?? FlexAlignContent.START;
        this.css["flex-wrap"] = opts.flexWrap ?? FlexWrap.NOWRAP;
        this.css["gap"] = "0.5rem";

        this.classes.push('col');

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

        this.children.forEach((child) => {
            thisElement.appendChild(child.render());
        });

        return thisElement;
    }
}
