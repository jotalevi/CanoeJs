import { Widget } from "canoejs";

export default class Logo implements Widget {
    id: string = "logo";

    constructor() {
        return this;
    }

    render(): HTMLElement {
        let element = document.createElement("img");

        element.src = "logo.png";
        element.alt = "CanoeJS Logo";
        element.style.width = "500px";
        element.style.height = "500px";
        element.style.margin = "-150px";
        element.style.marginTop = "0px";
        

        return element;
    }
}