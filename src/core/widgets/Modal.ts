import DefaultStyles from "../enum/defaultStyles";
import Widget from "../Widget";
import EventLinker from "../EventLinker";
import { ThemeProvider } from "../theme/ThemeProvider";

export default class Modal extends Widget {
    classes: string[];
    css: {};
    callbacks: {};
    title: string;
    content: Widget;
    show: boolean;
    size: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick: boolean;
    showCloseButton: boolean;

    constructor(
        opts: Partial<{
            id: string,
            classes: string[],
            css: {},
            callbacks: {},
            title: string,
            content: Widget,
            show: boolean,
            size: 'sm' | 'md' | 'lg' | 'xl',
            closeOnOverlayClick: boolean,
            showCloseButton: boolean,
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.css = opts.css ?? {};
        this.callbacks = opts.callbacks ?? {};
        this.title = opts.title ?? 'Modal';
        this.content = opts.content;
        this.show = opts.show ?? false;
        this.size = opts.size ?? 'md';
        this.closeOnOverlayClick = opts.closeOnOverlayClick ?? true;
        this.showCloseButton = opts.showCloseButton ?? true;
    }

    render(): HTMLElement {
        if (!this.show) {
            return document.createElement('div'); // Empty div when hidden
        }

        const theme = ThemeProvider.getTheme();
        const modalOverlay = document.createElement("div");
        modalOverlay.id = this.id;
        modalOverlay.className = 'modal-overlay';
        
        // Overlay styles
        Object.assign(modalOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            ...this.css
        });

        // Modal container
        const modalContainer = document.createElement("div");
        modalContainer.className = 'modal-container';
        
        const sizeMap = {
            sm: '400px',
            md: '600px',
            lg: '800px',
            xl: '1000px'
        };

        Object.assign(modalContainer.style, {
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.xl,
            maxWidth: sizeMap[this.size],
            width: '90%',
            maxHeight: '90vh',
            overflow: 'hidden',
            position: 'relative'
        });

        // Header
        const header = document.createElement("div");
        header.className = 'modal-header';
        Object.assign(header.style, {
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.gray[200]}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        });

        const titleElement = document.createElement("h3");
        titleElement.textContent = this.title;
        Object.assign(titleElement.style, {
            margin: '0',
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.gray[900]
        });

        header.appendChild(titleElement);

        // Close button
        if (this.showCloseButton) {
            const closeButton = document.createElement("button");
            closeButton.innerHTML = '&times;';
            closeButton.className = 'modal-close';
            Object.assign(closeButton.style, {
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.gray[500],
                borderRadius: theme.borderRadius.full
            });

            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.backgroundColor = theme.colors.gray[100];
            });

            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.backgroundColor = 'transparent';
            });

            closeButton.addEventListener('click', () => {
                this.show = false;
                if (this.callbacks['onClose']) {
                    this.callbacks['onClose']();
                }
            });

            header.appendChild(closeButton);
        }

        // Body
        const body = document.createElement("div");
        body.className = 'modal-body';
        Object.assign(body.style, {
            padding: theme.spacing.lg,
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 120px)'
        });

        const contentElement = this.content.render();
        body.appendChild(contentElement);

        // Assemble modal
        modalContainer.appendChild(header);
        modalContainer.appendChild(body);
        modalOverlay.appendChild(modalContainer);

        // Overlay click handler
        if (this.closeOnOverlayClick) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.show = false;
                    if (this.callbacks['onClose']) {
                        this.callbacks['onClose']();
                    }
                }
            });
        }

        // Add custom callbacks
        Object.keys(this.callbacks).forEach((key) => {
            if (key !== 'onClose') {
                EventLinker.addEvent(modalOverlay, key, this.callbacks[key]);
            }
        });

        return modalOverlay;
    }
} 