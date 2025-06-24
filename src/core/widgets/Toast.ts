import randomId from "../utils/randomId";
import Widget from "../Widget";
import EventLinker from "../EventLinker";
import { ThemeProvider } from "../theme/ThemeProvider";
import { AnimationManager } from "../animation/AnimationManager";

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default class Toast implements Widget {
  id: string;
  classes: string[];
  css: {};
  callbacks: {};
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showCloseButton: boolean;
  onClose?: () => void;

  constructor(options: ToastOptions) {
    this.id = options.id ?? randomId(5);
    this.classes = [];
    this.css = {};
    this.callbacks = {};
    this.title = options.title ?? '';
    this.message = options.message;
    this.type = options.type ?? 'info';
    this.duration = options.duration ?? 5000;
    this.position = options.position ?? 'top-right';
    this.showCloseButton = options.showCloseButton ?? true;
    this.onClose = options.onClose;

    return this;
  }

  render(): HTMLElement {
    const theme = ThemeProvider.getTheme();
    const toast = document.createElement("div");
    toast.id = this.id;
    toast.className = `toast toast-${this.type}`;
    
    // Base styles
    Object.assign(toast.style, {
      position: 'fixed',
      backgroundColor: this.getTypeColor(theme),
      color: theme.colors.white,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      boxShadow: theme.shadows.lg,
      maxWidth: '400px',
      minWidth: '300px',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
      opacity: '0',
      transform: 'translateY(-100%)',
      ...this.getPositionStyles(),
      ...this.css
    });

    // Icon
    const icon = document.createElement("div");
    icon.className = 'toast-icon';
    icon.innerHTML = this.getTypeIcon();
    Object.assign(icon.style, {
      fontSize: '1.2rem',
      flexShrink: '0',
      marginTop: '2px'
    });

    // Content
    const content = document.createElement("div");
    content.className = 'toast-content';
    Object.assign(content.style, {
      flex: '1',
      minWidth: '0'
    });

    if (this.title) {
      const titleElement = document.createElement("div");
      titleElement.className = 'toast-title';
      titleElement.textContent = this.title;
      Object.assign(titleElement.style, {
        fontWeight: theme.typography.fontWeight.semibold,
        marginBottom: theme.spacing.xs,
        fontSize: theme.typography.fontSize.sm
      });
      content.appendChild(titleElement);
    }

    const messageElement = document.createElement("div");
    messageElement.className = 'toast-message';
    messageElement.textContent = this.message;
    Object.assign(messageElement.style, {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: '1.4'
    });
    content.appendChild(messageElement);

    // Close button
    if (this.showCloseButton) {
      const closeButton = document.createElement("button");
      closeButton.className = 'toast-close';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', () => this.close());
      Object.assign(closeButton.style, {
        background: 'none',
        border: 'none',
        color: 'inherit',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '0',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        opacity: '0.7',
        transition: 'opacity 0.2s'
      });

      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
      });

      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.7';
      });

      toast.appendChild(closeButton);
    }

    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(content);

    // Add custom callbacks
    Object.keys(this.callbacks).forEach((key) => {
      EventLinker.addEvent(toast, key, this.callbacks[key]);
    });

    return toast;
  }

  private getTypeColor(theme: any): string {
    switch (this.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.gray[600];
    }
  }

  private getTypeIcon(): string {
    switch (this.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  }

  private getPositionStyles(): any {
    const theme = ThemeProvider.getTheme();
    const margin = theme.spacing.md;
    
    switch (this.position) {
      case 'top-right':
        return { top: margin, right: margin };
      case 'top-left':
        return { top: margin, left: margin };
      case 'bottom-right':
        return { bottom: margin, right: margin };
      case 'bottom-left':
        return { bottom: margin, left: margin };
      case 'top-center':
        return { top: margin, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-center':
        return { bottom: margin, left: '50%', transform: 'translateX(-50%)' };
      default:
        return { top: margin, right: margin };
    }
  }

  async show(): Promise<void> {
    const toastElement = document.getElementById(this.id);
    if (toastElement) {
      await AnimationManager.presets.toast.enter(toastElement);
      
      if (this.duration > 0) {
        setTimeout(() => this.close(), this.duration);
      }
    }
  }

  async close(): Promise<void> {
    const toastElement = document.getElementById(this.id);
    if (toastElement) {
      await AnimationManager.presets.toast.exit(toastElement);
      toastElement.remove();
      if (this.onClose) {
        this.onClose();
      }
    }
  }
}

// Toast Manager for managing multiple toasts
export class ToastManager {
  private static toasts: Toast[] = [];
  private static container: HTMLElement | null = null;

  static show(options: ToastOptions): Toast {
    const toast = new Toast(options);
    this.toasts.push(toast);
    
    if (!this.container) {
      this.createContainer();
    }
    
    if (this.container) {
      const toastElement = toast.render();
      this.container.appendChild(toastElement);
      toast.show();
    }
    
    return toast;
  }

  static success(message: string, options: Partial<ToastOptions> = {}): Toast {
    return this.show({ ...options, message, type: 'success' });
  }

  static error(message: string, options: Partial<ToastOptions> = {}): Toast {
    return this.show({ ...options, message, type: 'error' });
  }

  static warning(message: string, options: Partial<ToastOptions> = {}): Toast {
    return this.show({ ...options, message, type: 'warning' });
  }

  static info(message: string, options: Partial<ToastOptions> = {}): Toast {
    return this.show({ ...options, message, type: 'info' });
  }

  static closeAll(): void {
    this.toasts.forEach(toast => toast.close());
    this.toasts = [];
  }

  private static createContainer(): void {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    Object.assign(this.container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '9998'
    });
    document.body.appendChild(this.container);
  }
} 