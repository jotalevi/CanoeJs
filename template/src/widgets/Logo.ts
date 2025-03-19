import { randomId, Widget } from "canoejs";

export default class Logo implements Widget {
    id: string
    width: string
    height: string

    constructor(opts: Partial<{
        id: string;
        width: string;
        height: string;
    }>) {
        this.id = opts.id || "logo" + randomId();
        this.width = opts.width || "500px";
        this.height = opts.height || "500px";

        return this;
    }

    render(): HTMLElement {
        let element = document.createElement("img");

        element.id = this.id;
        element.src = "logo.png";
        element.alt = "CanoeJS Logo";
        element.style.width = this.width;
        element.style.height = this.height;
        element.style.margin = "-150px";
        element.style.marginTop = "0px";
        

        return element;
    }
}