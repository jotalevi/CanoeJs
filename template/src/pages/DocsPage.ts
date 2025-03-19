import { Widget } from "canoejs";

export default class DocsPage implements Widget {
    id: string

    constructor() {
        this.id = "docs-page";
    }

    render(): HTMLElement {
        const container = document.createElement("div");
        container.id = this.id;
        container.innerHTML = `
            <h1>Documentation</h1>
            <p>Here you will find the documentation for CanoeJS</p>
        `;
        return container;
    }
}