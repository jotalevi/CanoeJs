import { Canoe } from "../../canoe";

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
}