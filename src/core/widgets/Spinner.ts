import DefaultStyles from "../enum/defaultStyles";
import SpinnerSize from "../enum/SpinnerSize";
import Widget from "../Widget";

export default class Spinner extends Widget {
    style: DefaultStyles;
    size: SpinnerSize;

    constructor(
        opts: Partial<{
            id: string;
            style: DefaultStyles;
            size: SpinnerSize;
        }> = {}
    ) {
        super(opts);
        this.style = opts.style ?? DefaultStyles.LIGHT;
        this.size = opts.size ?? SpinnerSize.SMALL;
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

