import DefaultStyles from "../enum/defaultStyles";
import Widget from "../Widget";

export default class Progress extends Widget {
    percentage: number;
    style: DefaultStyles;

    constructor(
        opts: Partial<{
            id: string;
            percentage: number;
            style: DefaultStyles;
        }> = {}
    ) {
        super(opts);
        this.percentage = opts.percentage ?? 0;
        this.style = opts.style ?? DefaultStyles.PRIMARY;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");
        thisElement.id = this.id;
        thisElement.classList.add("progress");
        thisElement.classList.add("progress-" + this.style);
        thisElement.setAttribute("data-progress", this.percentage.toString());

        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        thisElement.appendChild(progressBar);

        return thisElement;
    }
}