import Widget from "../Widget";
import EventLinker from "../EventLinker";
import { ThemeProvider } from "../theme/ThemeProvider";

export default class Tooltip extends Widget {
    classes: string[];
    css: {};
    callbacks: {};
    text: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    trigger: 'hover' | 'click';
    show: boolean;
    target: HTMLElement | null;

    constructor(
        opts: Partial<{
            id: string,
            classes: string[],
            css: {},
            callbacks: {},
            text: string,
            position: 'top' | 'bottom' | 'left' | 'right',
            trigger: 'hover' | 'click',
            show: boolean,
            target: HTMLElement,
        }> = {}
    ) {
        super(opts);
        this.classes = opts.classes ?? [];
        this.css = opts.css ?? {};
        this.callbacks = opts.callbacks ?? {};
        this.text = opts.text ?? 'Tooltip';
        this.position = opts.position ?? 'top';
        this.trigger = opts.trigger ?? 'hover';
        this.show = opts.show ?? false;
        this.target = opts.target ?? null;
    }

    render(): HTMLElement {
        const theme = ThemeProvider.getTheme();
        const tooltip = document.createElement("div");
        tooltip.id = this.id;
        tooltip.className = 'tooltip';
        tooltip.textContent = this.text;
        
        // Base styles
        Object.assign(tooltip.style, {
            position: 'absolute',
            backgroundColor: theme.colors.gray[900],
            color: theme.colors.white,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.normal,
            boxShadow: theme.shadows.md,
            zIndex: '1000',
            pointerEvents: 'none',
            opacity: '0',
            transition: 'opacity 0.2s ease-in-out',
            maxWidth: '200px',
            wordWrap: 'break-word',
            ...this.css
        });

        // Position styles
        this.updatePosition(tooltip);

        // Show/hide logic
        if (this.show) {
            tooltip.style.opacity = '1';
        }

        // Add custom callbacks
        Object.keys(this.callbacks).forEach((key) => {
            EventLinker.addEvent(tooltip, key, this.callbacks[key]);
        });

        return tooltip;
    }

    private updatePosition(tooltip: HTMLElement): void {
        if (!this.target) return;

        const targetRect = this.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        switch (this.position) {
            case 'top':
                top = targetRect.top - tooltipRect.height - 8;
                left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = targetRect.bottom + 8;
                left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.right + 8;
                break;
        }

        // Ensure tooltip stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 0) left = 8;
        if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8;
        if (top < 0) top = 8;
        if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height - 8;

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }

    showTooltip(): void {
        this.show = true;
        const tooltipElement = document.getElementById(this.id);
        if (tooltipElement) {
            tooltipElement.style.opacity = '1';
            this.updatePosition(tooltipElement);
        }
    }

    hideTooltip(): void {
        this.show = false;
        const tooltipElement = document.getElementById(this.id);
        if (tooltipElement) {
            tooltipElement.style.opacity = '0';
        }
    }

    attachTo(element: HTMLElement): void {
        this.target = element;
        
        if (this.trigger === 'hover') {
            element.addEventListener('mouseenter', () => this.showTooltip());
            element.addEventListener('mouseleave', () => this.hideTooltip());
        } else if (this.trigger === 'click') {
            element.addEventListener('click', () => {
                if (this.show) {
                    this.hideTooltip();
                } else {
                    this.showTooltip();
                }
            });
        }
    }
} 