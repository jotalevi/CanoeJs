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
  EventLinker
} from "canoejs";
import { getBuildConfig, logger, features, isDevelopment, isProduction } from "./config/build";

// Get build configuration
const buildConfig = getBuildConfig();

// Log environment information
logger.log(`Starting CanoeJS Template in ${buildConfig.isDevelopment ? 'development' : 'production'} mode`);
logger.debug('Build features:', features);

// Configure performance optimizations based on environment
PerformanceManager.setConfig({
  enableVirtualScrolling: true,
  enableLazyLoading: true,
  enableMemoization: true,
  enableEventDelegation: true,
  enableBatchUpdates: true,
  enableRenderCaching: true,
  maxCacheSize: buildConfig.isProduction ? 2000 : 1000,
  cacheTTL: buildConfig.isProduction ? 10 * 60 * 1000 : 5 * 60 * 1000, // 10min prod, 5min dev
  debounceDelay: buildConfig.isProduction ? 16 : 32, // More responsive in dev
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

// Environment indicator
const EnvironmentIndicator = () => {
  if (!buildConfig.isDevelopment) return null;
  
  return new Alert({
    text: `🛠️ Development Mode - Debug: ${features.debug ? 'ON' : 'OFF'} | Logging: ${features.logging ? 'ON' : 'OFF'} | Hot Reload: ${features.hotReload ? 'ON' : 'OFF'}`,
    style: "info",
    css: {
      marginBottom: "1rem",
      fontSize: "0.9rem"
    }
  });
};

// Development tools section
const DevelopmentToolsSection = () => {
  if (!buildConfig.isDevelopment) return null;
  
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      color: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "🛠️ Development Tools Available",
        css: { color: "white", marginBottom: "1rem" }
      }),
      new P({ 
        text: "Open browser console and type 'Canoe.help()' to see all available commands:",
        css: { color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }
      }),
      new Container({
        css: {
          background: "rgba(255,255,255,0.1)",
          padding: "1rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          border: "1px solid rgba(255,255,255,0.2)"
        },
        children: [
          new P({ text: "// State Management", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.8)" } }),
          new P({ text: "Canoe.state()           // Get current state", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "Canoe.setState({...})   // Update state", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "", css: { margin: "0.5rem 0" } }),
          new P({ text: "// Performance", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.8)" } }),
          new P({ text: "Canoe.performance()     // Get performance stats", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "Canoe.getBuildStats()   // Get build times", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "", css: { margin: "0.5rem 0" } }),
          new P({ text: "// Debug", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.8)" } }),
          new P({ text: "Canoe.debug.logState()  // Log current state", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } }),
          new P({ text: "Canoe.debug.logEvents() // Log events", css: { margin: "0.5rem 0", color: "rgba(255,255,255,0.9)" } })
        ]
      })
    ]
  });
};

// Performance comparison card
const PerformanceCard = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "Performance Comparison",
        css: { color: "white", marginBottom: "1rem" }
      }),
      new Row({
        css: { gap: "2rem", flexWrap: "wrap" },
        children: [
          new Col({
            children: [
              new H({ size: 4, text: "CanoeJS", css: { color: "white" } }),
              new P({ text: "~8KB Bundle", css: { color: "rgba(255,255,255,0.9)" } }),
              new P({ text: "~50ms Load Time", css: { color: "rgba(255,255,255,0.9)" } }),
              new Badge({ text: "5x Faster", style: "success" })
            ]
          }),
          new Col({
            children: [
              new H({ size: 4, text: "React", css: { color: "white" } }),
              new P({ text: "~42KB Bundle", css: { color: "rgba(255,255,255,0.9)" } }),
              new P({ text: "~150ms Load Time", css: { color: "rgba(255,255,255,0.9)" } }),
              new Badge({ text: "Baseline", style: "secondary" })
            ]
          })
        ]
      })
    ]
  });
};

// Installation section
const InstallationSection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "🚀 Quick Start",
        css: { marginBottom: "1rem", color: "#333" }
      }),
      new P({ 
        text: "Get started with CanoeJS in seconds:",
        css: { marginBottom: "1rem", color: "#666" }
      }),
      new Container({
        css: {
          background: "#f8f9fa",
          padding: "1rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          border: "1px solid #e9ecef"
        },
        children: [
          new P({ text: "# Install globally", css: { margin: "0.5rem 0" } }),
          new P({ text: "npm install -g canoejs", css: { margin: "0.5rem 0", color: "#007bff" } }),
          new P({ text: "", css: { margin: "0.5rem 0" } }),
          new P({ text: "# Create new project", css: { margin: "0.5rem 0" } }),
          new P({ text: "canoejs new my-app", css: { margin: "0.5rem 0", color: "#007bff" } }),
          new P({ text: "", css: { margin: "0.5rem 0" } }),
          new P({ text: "# Navigate and run", css: { margin: "0.5rem 0" } }),
          new P({ text: "cd my-app && npm run dev", css: { margin: "0.5rem 0", color: "#007bff" } })
        ]
      })
    ]
  });
};

// Features section
const FeaturesSection = () => {
  const features = [
    { icon: "⚡", title: "Ultra Fast", desc: "5x faster than React" },
    { icon: "📦", title: "Lightweight", desc: "Only 8KB bundle size" },
    { icon: "🧠", title: "Smart Rendering", desc: "Intelligent DOM diffing" },
    { icon: "🎯", title: "Widget-Based", desc: "Flutter-inspired architecture" },
    { icon: "🚀", title: "Virtual Scrolling", desc: "Handle large lists efficiently" },
    { icon: "💾", title: "Lazy Loading", desc: "Deferred component loading" }
  ];

  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "✨ Key Features",
        css: { marginBottom: "1.5rem", color: "#333" }
      }),
      new Row({
        css: { gap: "1rem", flexWrap: "wrap" },
        children: features.map(feature => 
          new Col({
            css: {
              flex: "1 1 300px",
              padding: "1rem",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              textAlign: "center"
            },
            children: [
              new H({ 
                size: 1, 
                text: feature.icon,
                css: { fontSize: "2rem", marginBottom: "0.5rem" }
              }),
              new H({ 
                size: 4, 
                text: feature.title,
                css: { marginBottom: "0.5rem", color: "#333" }
              }),
              new P({ 
                text: feature.desc,
                css: { color: "#666", fontSize: "0.9rem" }
              })
            ]
          })
        )
      })
    ]
  });
};

// Build modes section
const BuildModesSection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "🔨 Build Modes",
        css: { marginBottom: "1.5rem", color: "#333" }
      }),
      new Row({
        css: { gap: "1rem", flexWrap: "wrap" },
        children: [
          new Col({
            css: {
              flex: "1 1 300px",
              padding: "1.5rem",
              border: "2px solid #28a745",
              borderRadius: "8px",
              background: "#f8fff9"
            },
            children: [
              new H({ 
                size: 3, 
                text: "🛠️ Development",
                css: { color: "#28a745", marginBottom: "1rem" }
              }),
              new P({ text: "• Hot reload enabled", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Source maps included", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Debug logging active", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Performance monitoring", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Console tools available", css: { color: "#666", marginBottom: "0.5rem" } }),
              new Badge({ text: "Current Mode", style: "success" })
            ]
          }),
          new Col({
            css: {
              flex: "1 1 300px",
              padding: "1.5rem",
              border: "2px solid #007bff",
              borderRadius: "8px",
              background: "#f8fbff"
            },
            children: [
              new H({ 
                size: 3, 
                text: "🚀 Production",
                css: { color: "#007bff", marginBottom: "1rem" }
              }),
              new P({ text: "• Code minified", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Optimized bundle", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Error boundaries", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Analytics ready", css: { color: "#666", marginBottom: "0.5rem" } }),
              new P({ text: "• Console tools disabled", css: { color: "#666", marginBottom: "0.5rem" } }),
              new Badge({ text: "Optimized", style: "primary" })
            ]
          })
        ]
      })
    ]
  });
};

// Documentation links
const DocumentationSection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "📚 Documentation",
        css: { marginBottom: "1.5rem", color: "#333" }
      }),
      new Row({
        css: { gap: "1rem", flexWrap: "wrap" },
        children: [
          new Link({
            text: "📖 Full Documentation",
            to: "/docs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          }),
          new Link({
            text: "🎯 Widget Reference",
            to: "/docs/widgets",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          }),
          new Link({
            text: "⚡ Performance Guide",
            to: "/docs/performance",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#ffc107",
              color: "#212529",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          }),
          new Link({
            text: "🚀 Examples",
            to: "/docs/examples",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#6f42c1",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          })
        ]
      })
    ]
  });
};

// Community section
const CommunitySection = () => {
  return new Card({
    css: {
      padding: "2rem",
      margin: "1rem 0",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "white"
    },
    children: [
      new H({ 
        size: 2, 
        text: "🤝 Community",
        css: { marginBottom: "1.5rem", color: "#333" }
      }),
      new Row({
        css: { gap: "1rem", flexWrap: "wrap" },
        children: [
          new Link({
            text: "🐙 GitHub",
            to: "https://github.com/jotalevi/CanoeJs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#333",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          }),
          new Link({
            text: "📝 Issues",
            to: "https://github.com/jotalevi/CanoeJs/issues",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#dc3545",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          }),
          new Link({
            text: "⭐ Star on GitHub",
            to: "https://github.com/jotalevi/CanoeJs",
            css: {
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#ffc107",
              color: "#212529",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }
          })
        ]
      })
    ]
  });
};

// Main landing page
const HomePage = () => {
  let counter = 0;

  const handleTryDemo = () => {
    counter++;
    logger.debug('Demo button clicked, counter:', counter);
    Canoe.setState({ demoCounter: counter });
  };

  return new Col({
    css: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "2rem 1rem"
    },
    children: [
      // Header
      new Container({
        css: { maxWidth: "1200px", margin: "0 auto" },
        children: [
          EnvironmentIndicator(),
          MemoizedHeader(),
          MemoizedSubtitle(),
          
          // Development tools section (dev mode only)
          DevelopmentToolsSection(),
          
          // Performance comparison
          PerformanceCard(),
          
          // Installation
          InstallationSection(),
          
          // Features
          FeaturesSection(),
          
          // Build modes
          BuildModesSection(),
          
          // Demo section
          new Card({
            css: {
              padding: "2rem",
              margin: "1rem 0",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              background: "white",
              textAlign: "center"
            },
            children: [
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
                text: "Click me! (Counter: 0)",
                callbacks: { click: handleTryDemo },
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
          }),
          
          // Documentation
          DocumentationSection(),
          
          // Community
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
            children: [
              new P({ 
                text: "Made with ❤️ by the CanoeJS Team",
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

// Documentation page
const DocumentationPage = () => {
  return new Col({
    css: {
      minHeight: "100vh",
      background: "#f8f9fa",
      padding: "2rem 1rem"
    },
    children: [
      new Container({
        css: { maxWidth: "1200px", margin: "0 auto" },
        children: [
          new H({ 
            size: 1, 
            text: "📚 CanoeJS Documentation",
            css: { 
              textAlign: "center", 
              marginBottom: "2rem",
              color: "#333"
            }
          }),
          new Alert({
            text: "This is a comprehensive documentation page. In a real implementation, this would contain full API documentation, examples, and guides.",
            style: "info"
          }),
          new Link({
            text: "← Back to Home",
            to: "/",
            css: {
              display: "inline-block",
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              marginBottom: "2rem"
            }
          })
        ]
      })
    ]
  });
};

// Configure routes
Router.addRoute("/", HomePage, "CanoeJS - Ultra Fast & Lightweight UI Framework");
Router.addRoute("/docs", DocumentationPage, "CanoeJS - Documentation");

// Configure delegated events
EventLinker.addDelegatedEvent(".btn", "click", (e) => {
  logger.debug("Button clicked:", e.target);
});

// Performance monitoring
Canoe.onLoad(() => {
  logger.log("🚀 CanoeJS Template loaded with optimizations");
  logger.debug("Build config:", buildConfig);
  
  // Log development tools availability
  if (buildConfig.isDevelopment) {
    console.log("🛠️ CanoeJS Development Tools are available in the console!");
    console.log("💡 Type 'Canoe.help()' to see all available commands");
  }
});

Canoe.preBuild(() => {
  logger.performance("preBuild", () => {
    window['timeStart'] = performance.now();
  });
});

Canoe.postBuild(() => {
  logger.performance("postBuild", () => {
    if (buildConfig.enableDebug) {
      const avgTime = PerformanceManager.getAverageTime("postBuild");
      logger.debug(`⚡ Average render time: ${avgTime.toFixed(2)}ms`);
    }
  });
});

// Initialize the application
const context = {
  demoCounter: 0,
  buildMode: buildConfig.isDevelopment ? 'development' : 'production',
  features: features
};

logger.log("Initializing CanoeJS Template application...");
Canoe.buildApp("root", context, Router.render).render();