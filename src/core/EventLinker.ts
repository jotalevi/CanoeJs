import { Canoe } from "../canoe";

export default class EventLinker {
    private static events: { elementAtId: string, eventName: string, callback: EventListener }[] = [];
    private static sEvents : { eventName: string, callback: EventListener }[] = [];

    static addEvent(
        elementAtId: string | HTMLElement,
        eventName: string,
        callback: (event: Event) => void | EventListenerObject | null | undefined
    ): void {
        EventLinker.events.push({
            elementAtId: typeof elementAtId === 'string' ? elementAtId : elementAtId.attributes.getNamedItem('eid')?.value || elementAtId.id,
            eventName: eventName.toString(),
            callback: callback
        });
    }

    static addStaticEvent(
        eventName: string,
        callback: (event: Event) => void | EventListenerObject | null | undefined
    ): void {
        EventLinker.sEvents.push({
            eventName: eventName.toString(),
            callback: callback
        });
    }

    static removeEvent(elementAtId: HTMLElement, eventName: EventListener): void {
        EventLinker.events = EventLinker.events.filter(event => {
            return !(event.elementAtId === elementAtId.id && event.eventName === eventName.toString());
        });
    }

    static clearEvents(): void {
        EventLinker.events = [];
    }

    static linkEvents(): void {
        for (const event of EventLinker.events) {
            const element = document.getElementById(event.elementAtId) || document.querySelector(`[eid="${event.elementAtId}"]`);
            if (element) {
                element.addEventListener(event.eventName, event.callback);
            } else {
                if (Canoe.debug) console.warn(`Element with id ${event.elementAtId} not found for event ${event.eventName}`);
            }
        }
    }

    static send(eventName: string): void {
        for (const event of EventLinker.sEvents) {
            if (event.eventName === eventName) {
                event.callback(new Event(eventName));
            }
        }
    }
}