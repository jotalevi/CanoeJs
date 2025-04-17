import { Canoe, Router } from "../../canoe";

export default function addHistoryEventsListener (): void {
    (function (history) {
        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = function (...args) {
            const result = pushState.apply(this, args);
            window.dispatchEvent(new Event('locationchange'));
            return result;
        };

        history.replaceState = function (...args) {
            const result = replaceState.apply(this, args);
            window.dispatchEvent(new Event('locationchange'));
            return result;
        };

        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('locationchange'));
        });
    })(window.history);

    window.addEventListener('locationchange', () => {
        Canoe.setState({ url: window.location.pathname });
    });

    window.onpopstate = () => {
        if (Canoe.debug) console.log("popstate event triggered");
        const widget = Router.render({ url: location.pathname });
        const root = document.getElementById("app");
        if (root && widget) {
            const html = widget.render();
            root.replaceChildren(html);
        }
    };
}