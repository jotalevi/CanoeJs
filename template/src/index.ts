import { 
  Canoe, 
  Router, 
  PerformanceManager,
  Col, 
  Row, 
  H, 
  Button, 
  Card,
  Link,
  P,
  Badge,
  Container,
  Alert,
  Spinner,
  memo,
  EventLinker,
  DefaultStyles
} from "canoejs";
import { getBuildConfig, logger, features, isDevelopment, isProduction } from "./config/build";
import DocsPage from "./docs";

// Get build configuration
const buildConfig = getBuildConfig();

// Log environment information
logger.log(`Starting CanoeJS Template in ${buildConfig.isDevelopment ? 'development' : 'production'} mode`);

// Configure performance optimizations
PerformanceManager.setConfig({
  enableVirtualScrolling: true,
  enableLazyLoading: true,
  enableMemoization: true,
  enableEventDelegation: true,
  enableBatchUpdates: true,
  enableRenderCaching: true,
  maxCacheSize: buildConfig.isProduction ? 2000 : 1000,
  cacheTTL: buildConfig.isProduction ? 10 * 60 * 1000 : 5 * 60 * 1000,
  debounceDelay: buildConfig.isProduction ? 16 : 32,
  throttleDelay: buildConfig.isProduction ? 100 : 200
});

// Memoized header for better performance
const MemoizedHeader = () => {
  return memo("header", () => new H({ 
    size: 1, 
    text: "CanoeJS 🚦",
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
  return memo("subtitle", () => new H({ 
    size: 3, 
    text: "Ultra Fast & Lightweight UI Framework",
    css: {
      textAlign: "center",
      color: "#666",
      marginBottom: "2rem",
      fontWeight: "300"
    }
  }));
};

// Features section
const FeaturesSection = () => {
  const features = [
    {
      icon: "⚡",
      title: "Ultra Fast",
      description: "Lightweight bundle (~8KB) with optimized rendering"
    },
    {
      icon: "🎯",
      title: "Widget-Based",
      description: "Simple, composable widgets for rapid development"
    },
    {
      icon: "🔄",
      title: "Hot Reload",
      description: "Instant updates during development"
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Built-in responsive design system"
    },
    {
      icon: "🛠️",
      title: "TypeScript",
      description: "Full TypeScript support with type safety"
    },
    {
      icon: "🚀",
      title: "Zero Config",
      description: "Get started instantly with minimal setup"
    }
  ];

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
        text: "✨ Features",
        css: { marginBottom: "2rem", color: "#333", textAlign: "center" }
      }),
      new Row({
        css: { 
          gap: "2rem", 
          flexWrap: "wrap",
          justifyContent: "center"
        },
        children: features.map(feature => 
          new Col({
            css: { 
              flex: "1 1 300px",
              textAlign: "center",
              padding: "1rem"
            },
            children: [
              new H({ 
                size: 3, 
                text: feature.icon,
                css: { fontSize: "2.5rem", marginBottom: "1rem" }
              }),
              new H({ 
                size: 4, 
                text: feature.title,
                css: { marginBottom: "0.5rem", color: "#333" }
              }),
              new P({ 
                text: feature.description,
                css: { color: "#666", fontSize: "0.9rem" }
              })
            ]
          })
        )
      })
    ]
  });
};

// Installation section
const InstallationSection = () => {
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
        text: "🚀 Quick Start",
        css: { marginBottom: "1rem", color: "white" }
      }),
      new P({ 
        text: "Get started with CanoeJS in seconds:",
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
          new P({ text: "npm install canoejs", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "canoejs new myapp", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "cd myapp && npm run dev", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } })
        ]
      }),
      new Row({
        css: { gap: "1rem", justifyContent: "center" },
        children: [
          new Link({
            text: "📚 View Documentation",
            to: "/docs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)"
            }
          }),
          new Link({
            text: "🐙 GitHub",
            to: "https://github.com/jotalevi/CanoeJs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)"
            }
          })
        ]
      })
    ]
  });
};

// Performance section
const PerformanceSection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      color: "white"
    },
    body: [
      new H({ 
        size: 2, 
        text: "⚡ Performance",
        css: { marginBottom: "1rem", color: "white" }
      }),
      new P({ 
        text: "Built for speed and efficiency:",
        css: { marginBottom: "1.5rem", color: "rgba(255,255,255,0.9)" }
      }),
      new Row({
        css: { gap: "1rem", flexWrap: "wrap" },
        children: [
          new Badge({ children: [new P({ text: "~8KB Bundle", css: { color: "white" } })] }),
          new Badge({ children: [new P({ text: "Virtual Scrolling", css: { color: "white" } })] }),
          new Badge({ children: [new P({ text: "Lazy Loading", css: { color: "white" } })] }),
          new Badge({ children: [new P({ text: "Memoization", css: { color: "white" } })] }),
          new Badge({ children: [new P({ text: "Event Delegation", css: { color: "white" } })] })
        ]
      })
    ]
  });
};

// Demo section with counter
const DemoSection = () => {
  const currentCounter = Canoe.getState().demoCounter || 0;
  
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
        text: "🎮 Try the Demo",
        css: { marginBottom: "1rem", color: "#333" }
      }),
      new P({ 
        text: "Experience the performance difference:",
        css: { marginBottom: "1rem", color: "#666" }
      }),
      new Button({
        text: `Click me! (Counter: ${currentCounter})`,
        callbacks: { click: handleDemoClick },
        css: {
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500"
        }
      })
    ]
  });
};

// Handler function defined outside to avoid recreation on each render
const handleDemoClick = () => {
  console.log("handleDemoClick");
  const currentState = Canoe.getState();
  const newCounter = (currentState.demoCounter || 0) + 1;
  logger.debug('Demo button clicked, counter:', newCounter);
  Canoe.setState({ demoCounter: newCounter });
};

// Community section
const CommunitySection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      color: "white"
    },
    body: [
      new H({ 
        size: 2, 
        text: "🤝 Join the Community",
        css: { marginBottom: "1rem", color: "white" }
      }),
      new P({ 
        text: "Connect with other developers and contribute to the project:",
        css: { marginBottom: "1.5rem", color: "rgba(255,255,255,0.9)" }
      }),
      new Row({
        css: { gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
        children: [
          new Link({
            text: "🐙 GitHub",
            to: "https://github.com/jotalevi/CanoeJs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)"
            }
          }),
          new Link({
            text: "📚 Documentation",
            to: "/docs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)"
            }
          }),
          new Link({
            text: "💬 Issues",
            to: "https://github.com/jotalevi/CanoeJs/issues",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)"
            }
          })
        ]
      })
    ]
  });
};

// Main landing page
const HomePage = () => {
  return new Col({
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
          
          // Demo section
          DemoSection(),
          
          // Features section
          FeaturesSection(),
          
          // Performance section
          PerformanceSection(),
          
          // Installation section
          InstallationSection(),
          
          // Community section
          CommunitySection(),
          
          // Footer
          new Card({
            css: {
              padding: "2rem",
              margin: "2rem 0 0 0",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              background: "rgba(255,255,255,0.9)",
              textAlign: "center"
            },
            body: [
              new P({ 
                text: "Made with ❤️ by Eros T.",
                css: { color: "#666", marginBottom: "0.5rem" }
              }),
              new P({ 
                text: "MIT License • Open Source",
                css: { color: "#999", fontSize: "0.9rem" }
              })
            ]
          })
        ]
      })
    ]
  });
};

// Initialize the application
const context = {
  url: window.location.pathname,
  demoCounter: 0,
  buildMode: buildConfig.isDevelopment ? 'development' : 'production',
  features: features
};

// Solo una ruta: HomePage
Router.addRoute("/", (state?: any) => HomePage(), "CanoeJS - Ultra Fast & Lightweight UI Framework");
Router.addRoute("/docs", (state?: any) => DocsPage(), "CanoeJS - Documentation");

const renderApp = (state: any) => {
  // Merge the context with the current state
  const mergedState = {
    ...context,
    ...state
  };
  // Update the context with the new state
  Object.assign(context, state);
  return Router.render(mergedState);
};

logger.log("Initializing CanoeJS Template application...");
Canoe.buildApp("root", context, renderApp).render();

// Hacer Canoe accesible globalmente para debug en consola
if (typeof window !== "undefined") {
  (window as any).Canoe = Canoe;
} 