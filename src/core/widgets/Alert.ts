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

    constructor(
        opts: Partial<{
            style: DefaultStyles,
            id: string,
            classes: string[],
            css: {},
            text: string,
            isClosable: boolean,
        }>
    ) {
        this.id = opts.id ?? randomId(5);
        this.classes = opts.classes;
        this.css = opts.css;
        this.text = opts.text ?? 'Alert';
        this.isClosable = opts.isClosable ?? false;

        this.classes.push('alert');
        this.classes.push('alert-' + (opts.style ?? DefaultStyles.PRIMARY).toString());

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
            closeButton.addEventListener("click", fadeAlert(this));
            thisElement.appendChild(closeButton);
        }

        return thisElement;
    }
}
