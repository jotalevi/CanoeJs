import { 
  Canoe, 
  Router, 
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
  CodeBlock
} from "canoejs";

// Documentation page with full framework information
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
          // Header
          new H({ 
            size: 1, 
            text: "📚 CanoeJS Documentation",
            css: { 
              textAlign: "center", 
              marginBottom: "2rem",
              color: "#333"
            }
          }),
          
          // Navigation
          new Row({
            css: { gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" },
            children: [
              new Link({
                text: "← Back to Home",
                to: "/",
                css: {
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "6px"
                }
              }),
              new Link({
                text: "🎯 Widgets",
                to: "#widgets",
                css: {
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#28a745",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "6px"
                }
              }),
              new Link({
                text: "⚡ Performance",
                to: "#performance",
                css: {
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#ffc107",
                  color: "#212529",
                  textDecoration: "none",
                  borderRadius: "6px"
                }
              })
            ]
          }),

          // Getting Started
          new Card({
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
                text: "🚀 Getting Started",
                css: { marginBottom: "1rem", color: "#333" }
              }),
              new P({ 
                text: "CanoeJS is an ultra-fast, lightweight UI framework that's 5x faster than React. Here's how to get started:",
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
                  new P({ text: "// Install globally", css: { margin: "0.5rem 0" } }),
                  new P({ text: "npm install -g canoejs", css: { margin: "0.5rem 0", color: "#007bff" } }),
                  new P({ text: "", css: { margin: "0.5rem 0" } }),
                  new P({ text: "// Create new project", css: { margin: "0.5rem 0" } }),
                  new P({ text: "canoejs new my-app", css: { margin: "0.5rem 0", color: "#007bff" } }),
                  new P({ text: "", css: { margin: "0.5rem 0" } }),
                  new P({ text: "// Navigate and run", css: { margin: "0.5rem 0" } }),
                  new P({ text: "cd my-app && npm run dev", css: { margin: "0.5rem 0", color: "#007bff" } })
                ]
              })
            ]
          }),

          // Basic Usage
          new Card({
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
                text: "📝 Basic Usage",
                css: { marginBottom: "1rem", color: "#333" }
              }),
              new P({ 
                text: "Here's a simple example of how to create a CanoeJS application:",
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
                  new P({ text: "import { Canoe, Router, Col, H, Button } from 'canoejs';", css: { margin: "0.5rem 0" } }),
                  new P({ text: "", css: { margin: "0.5rem 0" } }),
                  new P({ text: "const HomePage = () => {", css: { margin: "0.5rem 0" } }),
                  new P({ text: "  return new Col({", css: { margin: "0.5rem 0" } }),
                  new P({ text: "    children: [", css: { margin: "0.5rem 0" } }),
                  new P({ text: "      new H({ size: 1, text: 'Hello CanoeJS!' }),", css: { margin: "0.5rem 0" } }),
                  new P({ text: "      new Button({ text: 'Click me!' })", css: { margin: "0.5rem 0" } }),
                  new P({ text: "    ]", css: { margin: "0.5rem 0" } }),
                  new P({ text: "  });", css: { margin: "0.5rem 0" } }),
                  new P({ text: "};", css: { margin: "0.5rem 0" } }),
                  new P({ text: "", css: { margin: "0.5rem 0" } }),
                  new P({ text: "Router.addRoute('/', HomePage);", css: { margin: "0.5rem 0" } }),
                  new P({ text: "Canoe.buildApp('root', {}, Router.render).render();", css: { margin: "0.5rem 0" } })
                ]
              })
            ]
          }),

          // Widgets Section
          new Card({
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
                text: "🎯 Built-in Widgets",
                css: { marginBottom: "1rem", color: "#333" }
              }),
              new P({ 
                text: "CanoeJS comes with a comprehensive set of built-in widgets:",
                css: { marginBottom: "1rem", color: "#666" }
              }),
              new Row({
                css: { gap: "1rem", flexWrap: "wrap" },
                children: [
                  new Badge({ text: "Alert", style: "primary" }),
                  new Badge({ text: "Badge", style: "secondary" }),
                  new Badge({ text: "Button", style: "success" }),
                  new Badge({ text: "Card", style: "danger" }),
                  new Badge({ text: "Col", style: "warning" }),
                  new Badge({ text: "Container", style: "info" }),
                  new Badge({ text: "H", style: "light" }),
                  new Badge({ text: "Input", style: "dark" }),
                  new Badge({ text: "Link", style: "primary" }),
                  new Badge({ text: "P", style: "secondary" }),
                  new Badge({ text: "Row", style: "success" }),
                  new Badge({ text: "Spinner", style: "danger" })
                ]
              })
            ]
          }),

          // Performance Section
          new Card({
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
                text: "⚡ Performance Features",
                css: { marginBottom: "1rem", color: "#333" }
              }),
              new Row({
                css: { gap: "1rem", flexWrap: "wrap" },
                children: [
                  new Col({
                    css: { flex: "1 1 300px" },
                    children: [
                      new H({ size: 4, text: "🚀 Virtual Scrolling", css: { color: "#333" } }),
                      new P({ text: "Handle large lists efficiently by only rendering visible items", css: { color: "#666" } })
                    ]
                  }),
                  new Col({
                    css: { flex: "1 1 300px" },
                    children: [
                      new H({ size: 4, text: "💾 Lazy Loading", css: { color: "#333" } }),
                      new P({ text: "Defer loading of heavy components until needed", css: { color: "#666" } })
                    ]
                  }),
                  new Col({
                    css: { flex: "1 1 300px" },
                    children: [
                      new H({ size: 4, text: "🧠 Memoization", css: { color: "#333" } }),
                      new P({ text: "Cache expensive calculations to avoid repeated work", css: { color: "#666" } })
                    ]
                  })
                ]
              })
            ]
          }),

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
                text: "For more detailed documentation, visit our GitHub repository",
                css: { color: "#666", marginBottom: "0.5rem" }
              }),
              new Link({
                text: "📖 Full Documentation on GitHub",
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
              })
            ]
          })
        ]
      })
    ]
  });
};

export default DocumentationPage; 