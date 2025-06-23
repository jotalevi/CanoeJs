import Widget from "../Widget";
import randomId from "../utils/randomId";

interface VirtualListOptions {
    id?: string;
    items: any[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: any, index: number) => Widget;
    css?: {};
    classes?: string[];
}

export default class VirtualList implements Widget {
    id: string;
    items: any[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: any, index: number) => Widget;
    css: {};
    classes: string[];
    private visibleStart: number = 0;
    private visibleEnd: number = 0;

    constructor(opts: VirtualListOptions) {
        this.id = opts.id ?? randomId(5);
        this.items = opts.items;
        this.itemHeight = opts.itemHeight;
        this.containerHeight = opts.containerHeight;
        this.renderItem = opts.renderItem;
        this.css = opts.css ?? {};
        this.classes = opts.classes ?? [];
        this.classes.push('virtual-list');

        this.calculateVisibleRange();
        return this;
    }

    private calculateVisibleRange(): void {
        const scrollTop = window.scrollY || 0;
        this.visibleStart = Math.floor(scrollTop / this.itemHeight);
        this.visibleEnd = Math.min(
            this.visibleStart + Math.ceil(this.containerHeight / this.itemHeight) + 1,
            this.items.length
        );
    }

    render(): HTMLElement {
        const container = document.createElement("div");
        container.id = this.id;
        container.style.height = `${this.containerHeight}px`;
        container.style.overflow = "auto";
        container.style.position = "relative";

        this.classes.forEach((className) => {
            container.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            container.style[key] = this.css[key];
        });

        // Crear contenedor interno con altura total
        const innerContainer = document.createElement("div");
        innerContainer.style.height = `${this.items.length * this.itemHeight}px`;
        innerContainer.style.position = "relative";

        // Renderizar solo elementos visibles
        for (let i = this.visibleStart; i < this.visibleEnd; i++) {
            const item = this.items[i];
            const itemElement = this.renderItem(item, i).render();
            itemElement.style.position = "absolute";
            itemElement.style.top = `${i * this.itemHeight}px`;
            itemElement.style.width = "100%";
            innerContainer.appendChild(itemElement);
        }

        container.appendChild(innerContainer);

        // Agregar scroll listener para actualizar elementos visibles
        container.addEventListener("scroll", () => {
            this.calculateVisibleRange();
            // Re-renderizar solo si es necesario
            const newInnerContainer = this.render().firstChild as HTMLElement;
            container.replaceChild(newInnerContainer, innerContainer);
        });

        return container;
    }
} 