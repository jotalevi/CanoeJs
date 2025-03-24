import DefaultStyles from "../enum/DefaultStyles";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Alert implements Widget {
    id: string;
    classes: string[];
    css: {};
    text: string;
    style: DefaultStyles;
    isClosable: boolean;
    onClose: (e: any) => void;
    onClick: (e: any) => void;

    constructor(
        opts: Partial<{
            style: DefaultStyles,
            id: string,
            classes: string[],
            css: {},
            text: string,
            isClosable: boolean,
            onClose: (e: any) => void,
            onClick: (e: any) => void,
        }>
    ) {
        this.id = opts.id ?? randomId(5);

        this.classes = opts.classes ?? [];
        this.classes.push('alert');
        this.classes.push('alert-' + (opts.style ?? DefaultStyles.PRIMARY).toString());

        this.css = opts.css ?? {};
        this.text = opts.text ?? 'Alert';
        this.isClosable = opts.isClosable ?? false;

        this.onClose = opts.onClose ?? ((e: any) => { });
        this.onClick = opts.onClick ?? ((e: any) => { });

        return this;
    }

    render(): HTMLElement {
        let thisElement = document.createElement("div");

        thisElement.id = this.id;
        thisElement.innerText = this.text;

        this.classes.forEach((className) => {
            thisElement.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            thisElement.style[key] = this.css[key];
        });

        if (this.isClosable) {
            let closeButton = document.createElement("button");
            closeButton.classList.add("close-btn");
            closeButton.setAttribute("data-bs-dismiss", "alert");
            closeButton.setAttribute("aria-label", "Close");
            closeButton.innerHTML = "×";
            closeButton.addEventListener("click", (e) => {
                fadeAlert(e)
                this.onClose(e);
            });
            thisElement.appendChild(closeButton);
        }

        thisElement.addEventListener("click", (e) => {
            this.onClick(e);
        });

        return thisElement;
    }
}
