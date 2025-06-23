import { Canoe } from "../canoe";

export default class EventLinker {
    private static events: { elementAtId: string, eventName: string, callback: EventListener }[] = [];
    private static sEvents : { eventName: string, callback: EventListener }[] = [];
    private static delegatedEvents: { selector: string, eventName: string, callback: EventListener }[] = [];
    private static eventCache = new Map<string, EventListener>();

    static addEvent(
        elementAtId: string | HTMLElement,
        eventName: string,
        callback: (event: Event) => void | EventListenerObject | null | undefined
    ): void {
        const elementId = typeof elementAtId === 'string' ? elementAtId : elementAtId.attributes.getNamedItem('eid')?.value || elementAtId.id;
        
        EventLinker.events.push({
            elementAtId: elementId,
            eventName: eventName.toString(),
            callback: callback as EventListener
        });
    }

    static addDelegatedEvent(
        selector: string,
        eventName: string,
        callback: (event: Event) => void
    ): void {
        EventLinker.delegatedEvents.push({
            selector,
            eventName: eventName.toString(),
            callback: callback as EventListener
        });
    }

    static addStaticEvent(
        eventName: string,
        callback: (event: Event) => void | EventListenerObject | null | undefined
    ): void {
        EventLinker.sEvents.push({
            eventName: eventName.toString(),
            callback: callback as EventListener
        });
    }

    static removeEvent(elementAtId: HTMLElement, eventName: EventListener): void {
        EventLinker.events = EventLinker.events.filter(event => {
            return !(event.elementAtId === elementAtId.id && event.eventName === eventName.toString());
        });
    }

    static clearEvents(): void {
        EventLinker.events = [];
        EventLinker.delegatedEvents = [];
        EventLinker.eventCache.clear();
    }

    static linkEvents(): void {
        // Link eventos directos
        for (const event of EventLinker.events) {
            const element = document.getElementById(event.elementAtId) || document.querySelector(`[eid="${event.elementAtId}"]`);
            if (element) {
                // Evitar agregar el mismo evento múltiples veces
                const cacheKey = `${event.elementAtId}-${event.eventName}`;
                if (!EventLinker.eventCache.has(cacheKey)) {
                    element.addEventListener(event.eventName, event.callback);
                    EventLinker.eventCache.set(cacheKey, event.callback);
                }
            } else {
                if (Canoe.debug) console.warn(`Element with id ${event.elementAtId} not found for event ${event.eventName}`);
            }
        }

        // Link eventos delegados (una sola vez)
        if (EventLinker.delegatedEvents.length > 0 && !document.body.hasAttribute('data-delegated-events-bound')) {
            document.body.setAttribute('data-delegated-events-bound', 'true');
            
            for (const event of EventLinker.delegatedEvents) {
                document.body.addEventListener(event.eventName, (e: Event) => {
                    const target = e.target as Element;
                    if (target && target.matches(event.selector)) {
                        event.callback(e);
                    }
                });
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