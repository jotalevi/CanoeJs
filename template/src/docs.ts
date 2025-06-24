import {
  Canoe,
  Router,
  Col,
  Row,
  H,
  P,
  Card,
  Button,
  Input,
  Alert,
  Badge,
  Spinner,
  Progress,
  Container,
  GroupedButtons,
  Link,
  VirtualList,
  LazyWidget,
  Modal,
  Tooltip,
  ToastManager,
  ThemeProvider,
  AnimationManager,
  DefaultStyles,
  Widget
} from "canoejs";

// Widget para mostrar bloques de código
class CodeBlock extends Widget {
  private code: string;
  private language: string;

  constructor({ code, language = "javascript" }: { code: string; language?: string }) {
    super();
    this.code = code;
    this.language = language;
  }

  render(): HTMLElement {
    const element = document.createElement("pre");
    element.style.cssText = `
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 1rem 0;
    `;
    element.textContent = this.code;
    return element;
  }
}

// Widget para demostrar animaciones
class AnimationDemo extends Widget {
  

  private animateElement = (type: string) => {
    const el = this.root?.querySelector("#anim-demo") as HTMLElement;
    if (!el) return;
    switch (type) {
      case "fadeIn": AnimationManager.fadeIn(el); break;
      case "bounce": AnimationManager.bounce(el); break;
      case "shake": AnimationManager.shake(el); break;
      case "rotate": AnimationManager.rotate(el, 360); break;
      case "slideIn": AnimationManager.slideIn(el, "left"); break;
      case "fadeOut": AnimationManager.fadeOut(el); break;
      case "slideOut": AnimationManager.slideOut(el, "right"); break;
    }
  };

  render(): HTMLElement {
    const codeBlock = new CodeBlock({
      code: `import { AnimationManager } from "canoejs";

// Animar un elemento
AnimationManager.fadeIn(element);
AnimationManager.bounce(element);
AnimationManager.shake(element);
AnimationManager.rotate(element, 360);
AnimationManager.slideIn(element, "left");`
    });

    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "🎬 Animations", css: { marginBottom: "1rem" } }),
        new P({ text: "CanoeJS incluye un sistema de animaciones listo para usar:" }),
        codeBlock,
        new Row({
          css: { gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" },
          children: [
            new Button({ text: "Fade In", callbacks: { click: () => this.animateElement("fadeIn") } }),
            new Button({ text: "Fade Out", callbacks: { click: () => this.animateElement("fadeOut") } }),
            new Button({ text: "Bounce", callbacks: { click: () => this.animateElement("bounce") } }),
            new Button({ text: "Shake", callbacks: { click: () => this.animateElement("shake") } }),
            new Button({ text: "Rotate", callbacks: { click: () => this.animateElement("rotate") } }),
            new Button({ text: "Slide In", callbacks: { click: () => this.animateElement("slideIn") } }),
            new Button({ text: "Slide Out", callbacks: { click: () => this.animateElement("slideOut") } })
          ]
        }),
        new Col({
          id: "anim-demo",
          css: { 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "2rem",
            borderRadius: "8px",
            marginTop: "1rem",
            textAlign: "center",
            color: "white",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: [new P({ 
            text: "¡Anima este elemento!",
            css: {
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white"
            }
           })]
        })
      ]
    });
    return card.render();
  }
}

// Widget para demostrar temas
class ThemeDemo extends Widget {
  private isDark: boolean = false;

  constructor() {
    super();
    this.isDark = Canoe.getState().theme != undefined ? Canoe.getState().theme === 'dark' : false;
  }

  private toggleTheme = () => {
    const currentTheme = Canoe.getState().theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    Canoe.setState({ theme: newTheme });
    
    ToastManager.show({
      message: `Tema cambiado a ${newTheme === "dark" ? "oscuro" : "claro"}`,
      type: newTheme === "dark" ? "success" : "info",
      duration: 3000
    });
  };

  render(): HTMLElement {
    // This will automatically detect that we're using 'theme' from global state
    const currentTheme = Canoe.getState().theme || 'light';
    this.isDark = currentTheme === 'dark';

    console.log("Current theme:", this.isDark ? "Dark" : "Light");
    console.log("Canoe state:", Canoe.getState());

    const codeBlock = new CodeBlock({
      code: `import { ThemeProvider } from "canoejs";
            // Cambiar tema
            ThemeProvider.toggleDarkMode();
            ThemeProvider.setTheme(customTheme);`
      });

    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "🌙 Dark Mode", css: { marginBottom: "1rem" } }),
        new P({ text: "Cambia entre tema claro y oscuro:" }),
        codeBlock,
        new Button({
          text: this.isDark ? "☀️ Switch to Light" : "🌙 Switch to Dark",
          callbacks: { click: this.toggleTheme },
          style: this.isDark ? DefaultStyles.WARNING : DefaultStyles.INFO,
          css: { marginTop: "1rem" }
        }),
        new P({
          text: `Tema actual: ${this.isDark ? "Oscuro" : "Claro"}`,
          css: {
            marginTop: "1rem",
            padding: "0.5rem",
            background: this.isDark ? "#2d3748" : "#f7fafc",
            color: this.isDark ? "#e2e8f0" : "#2d3748",
            borderRadius: "4px",
            fontSize: "0.9rem"
          }
        })
      ]
    });
    return card.render();
  }
}

// Widget para demostrar modales
class ModalDemo extends Widget {
  private openModal = () => {
    Canoe.setState({ modalOpen: true });
  };

  private closeModal = () => {
    Canoe.setState({ modalOpen: false });
  };

  render(): HTMLElement {
    // This will automatically detect that we're using 'modalOpen' from global state
    const isOpen = Canoe.getState().modalOpen || false;

    const codeBlock = new CodeBlock({
      code: `import { Modal } from "canoejs";

const modal = new Modal({
  title: "Mi Modal",
  content: new P({ text: "Contenido del modal" }),
  showCloseButton: true,
  closeOnOverlayClick: true
});`
    });

    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "📋 Modals", css: { marginBottom: "1rem" } }),
        new P({ text: "Crea diálogos modales fácilmente:" }),
        codeBlock,
        new Button({
          text: "Abrir Modal",
          callbacks: { click: this.openModal },
          style: DefaultStyles.PRIMARY,
          css: { marginTop: "1rem" }
        }),
        new Modal({
          show: isOpen,
          title: "🎉 ¡Modal Funcionando!",
          content: new Col({
            children: [
              new P({ text: "Este es un modal interactivo creado con CanoeJS." }),
              new P({ text: "Puedes cerrarlo haciendo click en el botón X o fuera del modal." }),
              new Button({
                text: "Cerrar",
                callbacks: { click: this.closeModal },
                style: DefaultStyles.SECONDARY,
                css: { marginTop: "1rem" }
              })
            ]
          }),
          callbacks: { onClose: this.closeModal }
        })
      ]
    });
    return card.render();
  }
}

// Widget para demostrar tooltips
class TooltipDemo extends Widget {
  private showTooltip = () => {
    Canoe.setState({ tooltipVisible: true });
  };
  
  private hideTooltip = () => {
    Canoe.setState({ tooltipVisible: false });
  };
  
  private toggleTooltip = () => {
    const currentVisible = Canoe.getState().tooltipVisible || false;
    Canoe.setState({ tooltipVisible: !currentVisible });
  };

  render(): HTMLElement {
    // This will automatically detect that we're using 'tooltipVisible' from global state
    const visible = Canoe.getState().tooltipVisible || false;

    const codeBlock = new CodeBlock({
      code: `import { Tooltip } from "canoejs";

const tooltip = new Tooltip({
  text: "Información útil",
  position: "top",
  trigger: "hover"
});
tooltip.attachTo(element);`
    });

    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "💡 Tooltips", css: { marginBottom: "1rem" } }),
        new P({ text: "Muestra información contextual:" }),
        codeBlock,
        new Row({
          css: { gap: "1rem", marginTop: "1rem" },
          children: [
            new Button({
              text: "Hover me",
              callbacks: {
                mouseenter: this.showTooltip,
                mouseleave: this.hideTooltip
              },
              style: DefaultStyles.INFO
            }),
            new Button({
              text: "Click me",
              callbacks: {
                click: this.toggleTooltip
              },
              style: DefaultStyles.SUCCESS
            })
          ]
        }),
        ...(visible ? [
          new Tooltip({
            text: "¡Este es un tooltip interactivo!",
            position: "top",
            trigger: "hover",
            show: true,
            target: document.body
          })
        ] : [])
      ]
    });
    return card.render();
  }
}

// Widget para demostrar notificaciones
class NotificationDemo extends Widget {
  private showToast = (type: "success" | "error" | "warning" | "info") => {
    ToastManager.show({
      message: `Notificación tipo ${type}`,
      type
    });
  };

  render(): HTMLElement {
    const codeBlock = new CodeBlock({
      code: `import { ToastManager } from "canoejs";

ToastManager.success("¡Éxito!");
ToastManager.error("Error!");
ToastManager.warning("Advertencia!");
ToastManager.info("Información!");`
    });

    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "🔔 Notifications", css: { marginBottom: "1rem" } }),
        new P({ text: "Muestra notificaciones toast:" }),
        codeBlock,
        new Row({
          css: { gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" },
          children: [
            new Button({
              text: "Success",
              callbacks: { click: () => this.showToast("success") },
              style: DefaultStyles.SUCCESS
            }),
            new Button({
              text: "Error",
              callbacks: { click: () => this.showToast("error") },
              style: DefaultStyles.DANGER
            }),
            new Button({
              text: "Warning",
              callbacks: { click: () => this.showToast("warning") },
              style: DefaultStyles.WARNING
            }),
            new Button({
              text: "Info",
              callbacks: { click: () => this.showToast("info") },
              style: DefaultStyles.INFO
            })
          ]
        })
      ]
    });
    return card.render();
  }
}

// Widget para demostrar widgets
class WidgetsDemo extends Widget {
  render(): HTMLElement {
    const card = new Card({
      css: { padding: "1.5rem", margin: "1rem 0" },
      body: [
        new H({ size: 3, text: "🧩 Widgets", css: { marginBottom: "1rem" } }),
        new P({ text: "CanoeJS incluye una variedad de widgets optimizados:" }),
        new Row({
          css: { gap: "1rem", flexWrap: "wrap", marginTop: "1rem" },
          children: [
            new Button({ text: "Button" }),
            new Badge({ children: [new P({ text: "Badge" })] }),
            new Alert({ text: "Alert", style: DefaultStyles.INFO }),
            new Spinner({}),
            new Progress({ percentage: 75 }),
            new Card({ body: [new P({ text: "Card" })] }),
            new GroupedButtons({ 
              buttons: [
                new Button({ text: "A" }),
                new Button({ text: "B" }),
                new Button({ text: "C" })
              ]
            })
          ]
        }),
        new H({ size: 4, text: "Virtual List", css: { marginTop: "2rem", marginBottom: "1rem" } }),
        new VirtualList({
          items: Array.from({ length: 100 }, (_, i) => ({ id: i, text: `Item ${i}` })),
          itemHeight: 32,
          containerHeight: 200,
          renderItem: item => new P({ text: item.text })
        })
      ]
    });
    const el = card.render();
    this.root = el;
    return el;
  }
}

// Widget wrapper para las demos
class DemoWrapper extends Widget {
  private demo: any;

  constructor(demo: any) {
    super();
    this.demo = demo;
  }

  render(): HTMLElement {
    return this.demo.render();
  }
}

// Página principal de documentación
export default function DocsPage() {
  return new Container({
    css: { maxWidth: "1200px", margin: "0 auto", padding: "2rem" },
    children: [
      // Header
      new Col({
        css: { textAlign: "center", marginBottom: "3rem" },
        children: [
          new H({ 
            size: 1, 
            text: "📚 CanoeJS Documentation",
            css: { 
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem"
            }
          }),
          new P({ 
            text: "Guía completa de las características más importantes de CanoeJS",
            css: { fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }
          }),
          new Row({
            css: { justifyContent: "center", gap: "1rem" },
            children: [
              new Link({
                text: "← Volver al Home",
                to: "/",
                css: {
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  background: "#667eea",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "500"
                }
              }),
              new Link({
                text: "🐙 Ver en GitHub",
                to: "https://github.com/jotalevi/CanoeJs",
                css: {
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  background: "#333",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "500"
                }
              })
            ]
          })
        ]
      }),

      // Introducción
      new Alert({
        text: "¡Esta documentación es interactiva! Prueba todos los ejemplos en vivo.",
        style: DefaultStyles.INFO,
        css: { marginBottom: "2rem" }
      }),

      // Secciones de documentación
      new DemoWrapper(new AnimationDemo()),
      new DemoWrapper(new ThemeDemo()),
      new DemoWrapper(new ModalDemo()),
      new DemoWrapper(new TooltipDemo()),
      new DemoWrapper(new NotificationDemo()),
      new DemoWrapper(new WidgetsDemo()),

      // Footer
      new Card({
        css: { 
          padding: "2rem", 
          marginTop: "3rem", 
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white"
        },
        body: [
          new H({ size: 2, text: "🚀 ¿Listo para empezar?", css: { color: "white", marginBottom: "1rem" } }),
          new P({ 
            text: "CanoeJS te ofrece todo lo que necesitas para construir aplicaciones web modernas y rápidas.",
            css: { color: "rgba(255,255,255,0.9)", marginBottom: "1.5rem" }
          }),
          new Link({
            text: "Comenzar con CanoeJS",
            to: "/",
            css: {
              display: "inline-block",
              padding: "1rem 2rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "500",
              border: "2px solid rgba(255,255,255,0.3)"
            }
          })
        ]
      })
    ]
  });
} 