import DefaultStyles from "../enum/defaultStyles";
import EventLinker from "../EventLinker";
import randomId from "../utils/randomId";
import Widget from "../Widget";

export default class Alert extends Widget {
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
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.classes.push('alert');
        this.classes.push('alert-' + (opts.style ?? DefaultStyles.PRIMARY).toString());

        this.css = opts.css ?? {};
        this.text = opts.text ?? 'Alert';
        this.isClosable = opts.isClosable ?? false;

        this.onClose = opts.onClose ?? ((e: any) => { });
        this.onClick = opts.onClick ?? ((e: any) => { });
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
            closeButton.style.cursor = "pointer";

            closeButton.setAttribute('eid', randomId(15));
            EventLinker.addEvent(closeButton, "click", (e) => {
                // fadeAlert(e) // Function not defined
                this.onClose(e);
            });
            
            thisElement.appendChild(closeButton);
        }

        thisElement.setAttribute('eid', randomId(15));
        EventLinker.addEvent(thisElement, "click", (e) => {
            this.onClick(e);
        });

        return thisElement;
    }
}
