import { Canoe } from "../canoe";

export default class EventLinker {
    public static events: { elementAtId: string, eventName: string, callback: EventListener }[] = [];
    private static sEvents : { eventName: string, callback: EventListener }[] = [];
    private static delegatedEvents: { selector: string, eventName: string, callback: EventListener }[] = [];
    private static elementListenerMap: WeakMap<HTMLElement, Map<string, EventListener>> = new WeakMap();
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
        // Remover todos los event listeners del DOM antes de limpiar las referencias
        EventLinker.events.forEach(event => {
            const element = document.getElementById(event.elementAtId) || document.querySelector(`[eid="${event.elementAtId}"]`);
            if (element) {
                element.removeEventListener(event.eventName, event.callback);
            }
        });

        // Limpiar todos los event listeners de elementos mapeados
        // WeakMap no tiene forEach, pero podemos iterar sobre los elementos que conocemos
        // Los event listeners se limpiarán automáticamente cuando los elementos se eliminen del DOM

        // Remover eventos delegados del body si existen
        if (document.body.hasAttribute('data-delegated-events-bound')) {
            document.body.removeAttribute('data-delegated-events-bound');
        }

        // Limpiar todas las estructuras de datos
        EventLinker.events = [];
        EventLinker.sEvents = [];
        EventLinker.delegatedEvents = [];
        EventLinker.eventCache.clear();
        EventLinker.elementListenerMap = new WeakMap();
        
        if (Canoe.debug) {
            console.log('🧹 EventLinker: Todos los eventos limpiados del DOM y memoria');
        }
    }

    static linkEvents(): void {
        // Link eventos directos
        let seenElements = new Set<string>();
        for (const event of EventLinker.events) {
            const eventKey = event.elementAtId + event.eventName + event.callback.toString();
            if (seenElements.has(eventKey)) continue;
            seenElements.add(eventKey);
            
            const element = document.getElementById(event.elementAtId) || document.querySelector(`[eid="${event.elementAtId}"]`);
            if (element) {
                let listenerMap = EventLinker.elementListenerMap.get(element);
                if (!listenerMap) {
                    listenerMap = new Map();
                    EventLinker.elementListenerMap.set(element, listenerMap);
                }
                
                // Remover listener anterior si existe
                const prevListener = listenerMap.get(event.eventName);
                if (prevListener) {
                    element.removeEventListener(event.eventName, prevListener);
                }
                
                // Agregar nuevo listener
                element.addEventListener(event.eventName, event.callback);
                listenerMap.set(event.eventName, event.callback);
            } else {
                if (Canoe.debug) console.warn(`Element with id ${event.elementAtId} not found for event ${event.eventName}`);
            }
        }

        // Link eventos delegados (una sola vez por sesión)
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
            
            if (Canoe.debug) {
                console.log(`🎯 Eventos delegados vinculados: ${EventLinker.delegatedEvents.length} eventos`);
            }
        }
        
        if (Canoe.debug) {
            console.log(`🔗 Eventos vinculados: ${EventLinker.events.length} eventos directos`);
        }
    }

    static send(eventName: string): void {
        for (const event of EventLinker.sEvents) {
            if (event.eventName === eventName) {
                event.callback(new Event(eventName));
            }
        }
    }

    // Método para obtener estadísticas de eventos (útil para debugging)
    static getEventStats(): { direct: number, delegated: number, static: number, cached: number } {
        return {
            direct: EventLinker.events.length,
            delegated: EventLinker.delegatedEvents.length,
            static: EventLinker.sEvents.length,
            cached: EventLinker.eventCache.size
        };
    }

    // Método para verificar si hay eventos duplicados
    static checkForDuplicates(): { hasDuplicates: boolean, duplicates: string[] } {
        const seen = new Set<string>();
        const duplicates: string[] = [];
        
        EventLinker.events.forEach(event => {
            const key = `${event.elementAtId}-${event.eventName}-${event.callback.toString()}`;
            if (seen.has(key)) {
                duplicates.push(key);
            } else {
                seen.add(key);
            }
        });
        
        return {
            hasDuplicates: duplicates.length > 0,
            duplicates
        };
    }
}