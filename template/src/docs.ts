import {
  Canoe,
  Col,
  Row,
  H,
  P,
  Card,
  Button,
  Alert,
  Badge,
  Spinner,
  Progress,
  Container,
  GroupedButtons,
  Link,
  VirtualList,
  Modal,
  Tooltip,
  ToastManager,
  AnimationManager,
  DefaultStyles,
  memo
} from "canoejs";
import { getBuildConfig, logger } from "./config/build";

// Get build configuration
const buildConfig = getBuildConfig();

// Log environment information
logger.log(`Loading CanoeJS Documentation in ${buildConfig.isDevelopment ? 'development' : 'production'} mode`);

// Enable debug mode in development
if (buildConfig.isDevelopment) {
  Canoe.debug = true;
}

// Widget para mostrar bloques de código
class CodeBlock {
  public code: string;
  private language: string;

  constructor({ code, language = "javascript" }: { code: string; language?: string }) {
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

// Memoized header for better performance
const MemoizedHeader = () => {
  return memo("docs-header", () => new H({ 
    size: 1, 
    text: "📚 CanoeJS Documentation",
    css: {
      fontSize: "3rem",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      marginBottom: "1rem"
    }
  }));
};

// Memoized subtitle
const MemoizedSubtitle = () => {
  return memo("docs-subtitle", () => new H({ 
    size: 3, 
    text: "Guía completa de las características más importantes",
    css: {
      textAlign: "center",
      color: "#666",
      marginBottom: "2rem",
      fontWeight: "300"
    }
  }));
};

// Navigation section
const NavigationSection = () => {
  return memo("navigation-section", () => new Row({
    css: { justifyContent: "center", gap: "1rem", marginBottom: "2rem" },
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
  }));
};

// Animations section
const AnimationsSection = () => {
  let animationElement: HTMLElement | null = null;

  const animateElement = async (type: string) => {
    // Intentar encontrar el elemento de múltiples formas
    let el = animationElement;
    
    if (!el) {
      el = document.querySelector("#anim-demo") as HTMLElement;
    }
    
    if (!el) {
      // Buscar por clase o contenido
      const elements = document.querySelectorAll('[style*="linear-gradient"]');
      el = Array.from(elements).find(el => 
        el.textContent?.includes("¡Anima este elemento!")
      ) as HTMLElement;
    }
    
    if (!el) {
      console.warn("Elemento #anim-demo no encontrado. Intentando buscar en el DOM...");
      console.log("Elementos con gradiente encontrados:", document.querySelectorAll('[style*="linear-gradient"]').length);
      return;
    }
    
    // Guardar referencia para futuros usos
    animationElement = el;
    
    console.log(`Animando elemento específico con tipo: ${type}`, el);
    
    try {
      switch (type) {
        case "fadeIn": 
          // Aplicar animación directamente al elemento
          el.style.opacity = "0";
          el.style.transition = "opacity 0.3s ease-in-out";
          setTimeout(() => {
            el.style.opacity = "1";
          }, 10);
          console.log("FadeIn completado");
          break;
        case "bounce": 
          // Animación de bounce personalizada
          el.style.transition = "transform 0.6s ease-in-out";
          el.style.transform = "scale(1.1)";
          setTimeout(() => {
            el.style.transform = "scale(0.9)";
            setTimeout(() => {
              el.style.transform = "scale(1.05)";
              setTimeout(() => {
                el.style.transform = "scale(1)";
              }, 100);
            }, 100);
          }, 100);
          console.log("Bounce completado");
          break;
        case "shake": 
          // Animación de shake personalizada
          el.style.transition = "transform 0.1s ease-in-out";
          const shakeSteps = [
            "translateX(-10px)",
            "translateX(10px)", 
            "translateX(-10px)",
            "translateX(10px)",
            "translateX(0)"
          ];
          shakeSteps.forEach((step, index) => {
            setTimeout(() => {
              el.style.transform = step;
            }, index * 100);
          });
          console.log("Shake completado");
          break;
        case "rotate": 
          // Animación de rotación personalizada
          el.style.transition = "transform 1s linear";
          el.style.transform = "rotate(360deg)";
          setTimeout(() => {
            el.style.transform = "rotate(0deg)";
          }, 1000);
          console.log("Rotate completado");
          break;
        case "slideIn": 
          // Animación de slide in personalizada
          el.style.transition = "transform 0.3s ease-out";
          el.style.transform = "translateX(-100%)";
          setTimeout(() => {
            el.style.transform = "translateX(0)";
          }, 10);
          console.log("SlideIn completado");
          break;
        case "fadeOut": 
          // Animación de fade out personalizada
          el.style.transition = "opacity 0.3s ease-in-out";
          el.style.opacity = "1";
          setTimeout(() => {
            el.style.opacity = "0";
          }, 10);
          console.log("FadeOut completado");
          break;
        case "slideOut": 
          // Animación de slide out personalizada
          el.style.transition = "transform 0.3s ease-in";
          el.style.transform = "translateX(0)";
          setTimeout(() => {
            el.style.transform = "translateX(100%)";
          }, 10);
          console.log("SlideOut completado");
          break;
        case "test":
          // Prueba simple de animación CSS
          el.style.transition = "transform 0.3s ease";
          el.style.transform = "scale(1.2)";
          setTimeout(() => {
            el.style.transform = "scale(1)";
          }, 300);
          console.log("Test animation completado");
          break;
        default:
          console.warn(`Tipo de animación desconocido: ${type}`);
      }
    } catch (error) {
      console.error(`Error en animación ${type}:`, error);
    }
  };

  return memo("animations-section", () => {
    const codeBlock = new CodeBlock({
      code: `// Animaciones CSS personalizadas
element.style.transition = "opacity 0.3s ease-in-out";
element.style.opacity = "0";
setTimeout(() => element.style.opacity = "1", 10);

// O usar AnimationManager
await AnimationManager.fadeIn(element);
await AnimationManager.bounce(element);`
    });

    const animDemoElement = new Col({
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
        justifyContent: "center",
        transition: "all 0.3s ease"
      },
      children: [new P({ 
        text: "¡Anima este elemento!",
        css: {
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          margin: "0"
        }
       })]
    });

    // Guardar referencia al elemento cuando se renderiza
    setTimeout(() => {
      const el = document.querySelector("#anim-demo") as HTMLElement;
      if (el) {
        animationElement = el;
        console.log("Elemento de animación encontrado y guardado:", el);
      }
    }, 100);

    return new Card({
      css: {
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white"
      },
      body: [
        new H({ 
          size: 2, 
          text: "🎬 Animations",
          css: { marginBottom: "1rem", color: "#333" }
        }),
        new P({ 
          text: "CanoeJS incluye un sistema de animaciones listo para usar:",
          css: { marginBottom: "1rem", color: "#666" }
        }),
        new Container({
          css: {
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "1rem"
          },
          children: [
            new P({ text: codeBlock.code, css: { margin: "0", color: "#e2e8f0" } })
          ]
        }),
        new Row({
          css: { gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" },
          children: [
            new Button({ 
              text: "Test", 
              callbacks: { click: () => animateElement("test") },
              style: DefaultStyles.DANGER
            }),
            new Button({ 
              text: "Fade In", 
              callbacks: { click: () => animateElement("fadeIn") },
              style: DefaultStyles.PRIMARY
            }),
            new Button({ 
              text: "Fade Out", 
              callbacks: { click: () => animateElement("fadeOut") },
              style: DefaultStyles.SECONDARY
            }),
            new Button({ 
              text: "Bounce", 
              callbacks: { click: () => animateElement("bounce") },
              style: DefaultStyles.SUCCESS
            }),
            new Button({ 
              text: "Shake", 
              callbacks: { click: () => animateElement("shake") },
              style: DefaultStyles.WARNING
            }),
            new Button({ 
              text: "Rotate", 
              callbacks: { click: () => animateElement("rotate") },
              style: DefaultStyles.INFO
            }),
            new Button({ 
              text: "Slide In", 
              callbacks: { click: () => animateElement("slideIn") },
              style: DefaultStyles.DANGER
            }),
            new Button({ 
              text: "Slide Out", 
              callbacks: { click: () => animateElement("slideOut") },
              style: DefaultStyles.PRIMARY
            })
          ]
        }),
        animDemoElement
      ]
    });
  });
};

// Theme section
const ThemeSection = () => {
  const toggleTheme = () => {
    const currentTheme = Canoe.getState().theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    Canoe.setState({ theme: newTheme });
    
    ToastManager.show({
      message: `Tema cambiado a ${newTheme === "dark" ? "oscuro" : "claro"}`,
      type: newTheme === "dark" ? "success" : "info",
      duration: 3000
    });
  };

  return memo("theme-section", () => {
    const currentTheme = Canoe.getState().theme || 'light';
    const isDark = currentTheme === 'dark';

    const codeBlock = new CodeBlock({
      code: `import { ThemeProvider } from "canoejs";

// Cambiar tema
ThemeProvider.toggleDarkMode();
ThemeProvider.setTheme(customTheme);`
    });

    return new Card({
      css: {
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white"
      },
      body: [
        new H({ 
          size: 2, 
          text: "🌙 Dark Mode",
          css: { marginBottom: "1rem", color: "white" }
        }),
        new P({ 
          text: "Cambia entre tema claro y oscuro:",
          css: { marginBottom: "1rem", color: "rgba(255,255,255,0.9)" }
        }),
        new Container({
          css: {
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            border: "1px solid rgba(255,255,255,0.2)",
            marginBottom: "1rem"
          },
          children: [
            new P({ text: codeBlock.code, css: { margin: "0", color: "rgba(255,255,255,0.9)" } })
          ]
        }),
        new Button({
          text: isDark ? "☀️ Switch to Light" : "🌙 Switch to Dark",
          callbacks: { click: toggleTheme },
          style: isDark ? DefaultStyles.WARNING : DefaultStyles.INFO,
          css: { marginTop: "1rem" }
        }),
        new P({
          text: `Tema actual: ${isDark ? "Oscuro" : "Claro"}`,
          css: {
            marginTop: "1rem",
            padding: "0.5rem",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "4px",
            fontSize: "0.9rem"
          }
        })
      ]
    });
  });
};

// Modals section
const ModalsSection = () => {
  const openModal = () => {
    Canoe.setState({ modalOpen: true });
  };

  const closeModal = () => {
    Canoe.setState({ modalOpen: false });
  };

  return memo("modals-section", () => {
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

    return new Card({
      css: {
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white"
      },
      body: [
        new H({ 
          size: 2, 
          text: "📋 Modals",
          css: { marginBottom: "1rem", color: "#333" }
        }),
        new P({ 
          text: "Crea diálogos modales fácilmente:",
          css: { marginBottom: "1rem", color: "#666" }
        }),
        new Container({
          css: {
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "1rem"
          },
          children: [
            new P({ text: codeBlock.code, css: { margin: "0", color: "#e2e8f0" } })
          ]
        }),
        new Button({
          text: "Abrir Modal",
          callbacks: { click: openModal },
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
                callbacks: { click: closeModal },
                style: DefaultStyles.SECONDARY,
                css: { marginTop: "1rem" }
              })
            ]
          }),
          callbacks: { onClose: closeModal }
        })
      ]
    });
  });
};

// Tooltips section
const TooltipsSection = () => {
  const showTooltip = () => {
    Canoe.setState({ tooltipVisible: true });
  };
  
  const hideTooltip = () => {
    Canoe.setState({ tooltipVisible: false });
  };
  
  const toggleTooltip = () => {
    const currentVisible = Canoe.getState().tooltipVisible || false;
    Canoe.setState({ tooltipVisible: !currentVisible });
  };

  return memo("tooltips-section", () => {
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

    return new Card({
      css: {
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white"
      },
      body: [
        new H({ 
          size: 2, 
          text: "💡 Tooltips",
          css: { marginBottom: "1rem", color: "#333" }
        }),
        new P({ 
          text: "Muestra información contextual:",
          css: { marginBottom: "1rem", color: "#666" }
        }),
        new Container({
          css: {
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "1rem"
          },
          children: [
            new P({ text: codeBlock.code, css: { margin: "0", color: "#e2e8f0" } })
          ]
        }),
        new Row({
          css: { gap: "1rem", marginTop: "1rem" },
          children: [
            new Button({
              text: "Hover me",
              callbacks: {
                mouseenter: showTooltip,
                mouseleave: hideTooltip
              },
              style: DefaultStyles.INFO
            }),
            new Button({
              text: "Click me",
              callbacks: {
                click: toggleTooltip
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
  });
};

// Notifications section
const NotificationsSection = () => {
  const showToast = (type: "success" | "error" | "warning" | "info") => {
    ToastManager.show({
      message: `Notificación tipo ${type}`,
      type
    });
  };

  return memo("notifications-section", () => {
    const codeBlock = new CodeBlock({
      code: `import { ToastManager } from "canoejs";

ToastManager.success("¡Éxito!");
ToastManager.error("Error!");
ToastManager.warning("Advertencia!");
ToastManager.info("Información!");`
    });

    return new Card({
      css: {
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white"
      },
      body: [
        new H({ 
          size: 2, 
          text: "🔔 Notifications",
          css: { marginBottom: "1rem", color: "#333" }
        }),
        new P({ 
          text: "Muestra notificaciones toast:",
          css: { marginBottom: "1rem", color: "#666" }
        }),
        new Container({
          css: {
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "1rem"
          },
          children: [
            new P({ text: codeBlock.code, css: { margin: "0", color: "#e2e8f0" } })
          ]
        }),
        new Row({
          css: { gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" },
          children: [
            new Button({
              text: "Success",
              callbacks: { click: () => showToast("success") },
              style: DefaultStyles.SUCCESS
            }),
            new Button({
              text: "Error",
              callbacks: { click: () => showToast("error") },
              style: DefaultStyles.DANGER
            }),
            new Button({
              text: "Warning",
              callbacks: { click: () => showToast("warning") },
              style: DefaultStyles.WARNING
            }),
            new Button({
              text: "Info",
              callbacks: { click: () => showToast("info") },
              style: DefaultStyles.INFO
            })
          ]
        })
      ]
    });
  });
};

// Widgets section
const WidgetsSection = () => {
  return memo("widgets-section", () => new Card({
    css: {
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    body: [
      new H({ 
        size: 2, 
        text: "🧩 Widgets",
        css: { marginBottom: "1rem", color: "#333" }
      }),
      new P({ 
        text: "CanoeJS incluye una variedad de widgets optimizados:",
        css: { marginBottom: "1rem", color: "#666" }
      }),
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
  }));
};

// Debug section
const DebugSection = () => {
  return memo("debug-section", () => new Card({
    css: {
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "#f8f9fa"
    },
    body: [
      new H({ 
        size: 2, 
        text: "🐛 Debug Tools",
        css: { marginBottom: "1rem", color: "#333" }
      }),
      new P({ 
        text: "Herramientas para verificar que el sistema de actualización funciona correctamente:",
        css: { marginBottom: "1rem", color: "#666" }
      }),
      new Row({
        css: { gap: "1rem", marginTop: "1rem" },
        children: [
          new Button({
            text: "Debug Events",
            callbacks: { click: () => Canoe.debugEvents() },
            style: DefaultStyles.INFO
          }),
          new Button({
            text: "Debug State",
            callbacks: { click: () => console.log("Current state:", Canoe.getState()) },
            style: DefaultStyles.SUCCESS
          }),
          new Button({
            text: "Force Render",
            callbacks: { click: () => Canoe.forceRender() },
            style: DefaultStyles.WARNING
          })
        ]
      })
    ]
  }));
};

// Footer section
const FooterSection = () => {
  return memo("footer-section", () => new Card({
    css: {
      padding: "2rem",
      margin: "2rem 0 0 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      textAlign: "center"
    },
    body: [
      new H({ 
        size: 2, 
        text: "🚀 ¿Listo para empezar?",
        css: { color: "white", marginBottom: "1rem" }
      }),
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
  }));
};

// Main documentation page
const DocsPage = () => {
  return new Col({
    id: "docs-page",
    css: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "2rem 1rem"
    },
    children: [
      new Container({
        css: { maxWidth: "1200px", margin: "0 auto" },
        children: [
          // Development indicator
          ...(buildConfig.isDevelopment ? [new Alert({
            text: "🛠️ Development Mode - Hot reload enabled",
            style: DefaultStyles.INFO,
            css: { marginBottom: "1rem" }
          })] : []),
          
          MemoizedHeader(),
          MemoizedSubtitle(),
          NavigationSection(),
          
          // Interactive alert
          new Alert({
            text: "¡Esta documentación es interactiva! Prueba todos los ejemplos en vivo.",
            style: DefaultStyles.INFO,
            css: { marginBottom: "2rem" }
          }),

          // Documentation sections
          AnimationsSection(),
          ThemeSection(),
          ModalsSection(),
          TooltipsSection(),
          NotificationsSection(),
          WidgetsSection(),
          DebugSection(),
          FooterSection()
        ]
      })
    ]
  });
};

export default DocsPage; 