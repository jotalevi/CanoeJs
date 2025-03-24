import DefaultStyles from "../enum/DefaultStyles";
import SpinnerSize from "../enum/SpinnerSize";
import Widget from "../Widget";

export default class Spinner implements Widget {
    id: string;
    style: DefaultStyles;
    size: SpinnerSize;

    constructor(
        opts: Partial<{
            id: string;
            style: DefaultStyles;
            size: SpinnerSize;
        }>
    ) {
        this.id = opts.id ?? "spinner";
        this.style = opts.style ?? DefaultStyles.LIGHT;
        this.size = opts.size ?? SpinnerSize.SMALL;

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");

        thisElement.id = this.id;

        thisElement.classList.add("spinner");
        thisElement.classList.add("spinner-" + this.style);
        thisElement.classList.add("spinner-" + this.size);

        return thisElement;
    }
}

