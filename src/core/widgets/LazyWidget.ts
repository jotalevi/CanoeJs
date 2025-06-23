import Widget from "../Widget";
import randomId from "../utils/randomId";
import { memo } from "../utils/memo";

interface LazyWidgetOptions {
    id?: string;
    loader: () => Promise<Widget>;
    placeholder?: Widget;
    css?: {};
    classes?: string[];
}

export default class LazyWidget implements Widget {
    id: string;
    loader: () => Promise<Widget>;
    placeholder: Widget | null;
    css: {};
    classes: string[];
    private loadedWidget: Widget | null = null;
    private isLoading: boolean = false;

    constructor(opts: LazyWidgetOptions) {
        this.id = opts.id ?? randomId(5);
        this.loader = opts.loader;
        this.placeholder = opts.placeholder ?? null;
        this.css = opts.css ?? {};
        this.classes = opts.classes ?? [];
        this.classes.push('lazy-widget');

        return this;
    }

    private async loadWidget(): Promise<Widget> {
        if (this.loadedWidget) {
            return this.loadedWidget;
        }

        if (this.isLoading) {
            // Esperar si ya está cargando
            while (this.isLoading) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            return this.loadedWidget!;
        }

        this.isLoading = true;
        
        try {
            this.loadedWidget = await this.loader();
            return this.loadedWidget;
        } finally {
            this.isLoading = false;
        }
    }

    render(): HTMLElement {
        const container = document.createElement("div");
        container.id = this.id;
        container.style.position = "relative";

        this.classes.forEach((className) => {
            container.classList.add(className);
        });

        Object.keys(this.css).forEach((key) => {
            container.style[key] = this.css[key];
        });

        if (this.loadedWidget) {
            // Widget ya cargado
            container.appendChild(this.loadedWidget.render());
        } else if (this.placeholder) {
            // Mostrar placeholder mientras carga
            container.appendChild(this.placeholder.render());
            
            // Cargar widget en background
            this.loadWidget().then(() => {
                // Re-renderizar cuando esté listo
                const newContent = this.loadedWidget!.render();
                container.innerHTML = '';
                container.appendChild(newContent);
            });
        } else {
            // Sin placeholder, cargar inmediatamente
            this.loadWidget().then(() => {
                const newContent = this.loadedWidget!.render();
                container.appendChild(newContent);
            });
        }

        return container;
    }

    // Método para precargar el widget
    async preload(): Promise<void> {
        await this.loadWidget();
    }
} 