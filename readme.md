# CanoeJS 🚦 - Ultra Fast & Lightweight

CanoeJS is an ultra-fast and lightweight UI framework for building dynamic web applications using a **Widget-based** approach. Inspired by Flutter's layout system, it features an **optimized DOM diffing algorithm** for fast and efficient rendering.

## ⚡ Performance Optimizations

### 🚀 High-Performance Features

- **Ultra-Fast Hash Function**: Replaced SHA256 with a simple and efficient hash function
- **Intelligent DOM Diffing**: Optimized algorithm that only updates elements that actually changed
- **Event Delegation**: Delegated event system for better performance
- **Virtual Scrolling**: Support for large lists with virtual rendering
- **Lazy Loading**: Deferred loading of widgets to improve initial load time
- **Memoization**: Intelligent caching system to avoid repeated calculations
- **Batch Updates**: Batch updates to reduce re-renders
- **Render Caching**: Render caching to avoid unnecessary re-renders
- **Optimized Router**: Route system with cache and efficient search

### 📊 Performance Comparison

| Framework | Bundle Size | Load Time | Re-rendering | Memory |
|-----------|-------------|-----------|--------------|--------|
| React     | ~42KB       | ~150ms    | Complete     | High   |
| CanoeJS   | ~8KB        | ~50ms     | Intelligent  | Low    |

---

## 🆕 New Features in v0.6.0

### 🌍 Global State Management
```ts
import { Canoe } from "canoejs";

// Get current state
const currentState = Canoe.getState();

// Update state - triggers automatic re-render
Canoe.setState({ 
  counter: 5, 
  user: { name: "John", age: 25 } 
});

// Nested state updates
Canoe.setState({ 
  user: { 
    ...currentState.user, 
    age: 26 
  } 
});

// Force re-render when needed
Canoe.forceRender();

// Debug state changes
Canoe.debug = true;
Canoe.debugRender({ counter: 10 });
```

### 🔄 Automatic Widget Updates
```ts
import { Widget, Button, Canoe } from "canoejs";

// Widgets automatically update when their state dependencies change
class CounterWidget extends Widget {
  render(): HTMLElement {
    // System automatically detects this widget uses 'counter' from global state
    const currentCounter = Canoe.getState().counter || 0;
    
    return new Button({
      text: `Counter: ${currentCounter}`,
      callbacks: { 
        click: () => {
          Canoe.setState({ counter: currentCounter + 1 });
        }
      }
    }).render();
  }
}

// Widget automatically updates when 'counter' changes!
const widget = new CounterWidget({});
```

### 🎨 Advanced Component System
```ts
import { Component } from "canoejs";

class MyComponent extends Component {
  constructor() {
    super({}, {
      onMount: () => console.log('Component mounted!'),
      onUnmount: () => console.log('Component unmounted!'),
      onUpdate: (prevProps, newProps) => console.log('Props updated!'),
      shouldUpdate: (prevProps, newProps) => prevProps.value !== newProps.value
    });
  }

  render(): HTMLElement {
    return new Button({ text: "Click me!" }).render();
  }
}
```

### 🌈 Dynamic Theme System
```ts
import { ThemeProvider, defaultTheme, darkTheme } from "canoejs";

// Switch themes dynamically
ThemeProvider.setTheme(darkTheme);
ThemeProvider.toggleDarkMode();

// Custom theme
const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#ff6b6b',
    secondary: '#4ecdc4'
  }
};
ThemeProvider.setTheme(customTheme);
```

### 🎭 Animation System
```ts
import { AnimationManager } from "canoejs";

// Basic animations
await AnimationManager.fadeIn(element);
await AnimationManager.bounce(element);
await AnimationManager.shake(element);
await AnimationManager.rotate(element, 360);

// Custom animations
await AnimationManager.animate(element, [
  { transform: 'scale(0)', opacity: '0' },
  { transform: 'scale(1)', opacity: '1' }
], { duration: 500, easing: 'ease-out' });

// Stagger animations
await AnimationManager.stagger(elements, AnimationManager.fadeIn, 100);
```

### 🍞 Toast Notifications
```ts
import { ToastManager } from "canoejs";

// Show different types of toasts
ToastManager.success("Operation completed successfully!");
ToastManager.error("Something went wrong!");
ToastManager.warning("Please check your input");
ToastManager.info("Here's some information");

// Custom toast
ToastManager.show({
  title: "Custom Toast",
  message: "This is a custom toast message",
  type: "success",
  duration: 3000,
  position: "top-center"
});
```

### 🪟 Modal System
```ts
import { Modal } from "canoejs";

const modal = new Modal({
  title: "Confirmation",
  content: new P({ text: "Are you sure?" }),
  size: 'md',
  showCloseButton: true,
  closeOnOverlayClick: true,
  callbacks: {
    onClose: () => console.log('Modal closed')
  }
});
```

### 💡 Tooltip System
```ts
import { Tooltip } from "canoejs";

const tooltip = new Tooltip({
  text: "This is a helpful tooltip",
  position: 'top',
  trigger: 'hover'
});

// Attach to element
tooltip.attachTo(element);
```

---

## 🛠️ Getting Started

```sh
# Install CanoeJS globally (works with npm, bun, yarn, or even Deno).
npm install -g canoejs

# Create a new project
canoejs new <project-name>

# Navigate into your new project
cd <project-name>

# Install dependencies
npm install

# Run the project (with optimized build)
npm run dev
```

---

## 🚧 Creating an App

```ts
import { Canoe, Router, PerformanceManager } from "canoejs";

// Configure performance optimizations
PerformanceManager.setConfig({
    enableVirtualScrolling: true,
    enableLazyLoading: true,
    enableMemoization: true,
    enableEventDelegation: true,
    enableBatchUpdates: true,
    enableRenderCaching: true
});

let context = {
  userData: {
    id: "user1",
    name: "John",
    lastName: "Doe",
    email: "jdoe@example.com"
  }
};

Router.addRoute("/", HomePage, "CanoeJS - Home Page");
Router.addRoute("/docs", DocsPage, "CanoeJS - Documentation");

Canoe.buildApp("root", context, Router.render).render();
```

---

### Example `HomePage` Widget with Optimizations

```ts
import {
  Col, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap,
  H, Link, Router, Row, memo, VirtualList, LazyWidget
} from "canoejs";
import Logo from "../widgets/Logo";

const HomePage = () => {
  // Use memoization to avoid unnecessary re-renders
  const memoizedContent = memo("homepage-content", () => [
    new Logo({}),
    new H({ size: 1, text: "CanoeJS" }),
    new H({ size: 3, text: "A lightweight framework for building web applications" })
  ]);

  return new Col({
    css: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, rgba(135, 135, 250, 0.05), rgba(25, 25, 180, 0.1))",
    },
    flexAlignContent: FlexAlignContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    flexJustify: FlexJustify.CENTER,
    flexWrap: FlexWrap.NOWRAP,
    children: [
      ...memoizedContent,
      new Row({
        flexAlignContent: FlexAlignContent.CENTER,
        flexAlignItems: FlexAlignItems.CENTER,
        flexJustify: FlexJustify.CENTER,
        flexWrap: FlexWrap.NOWRAP,
        children: [
          new Link({ text: "GitHub", to: "https://github.com/jotalevi/CanoeJs" }),
          new H({ size: 5, text: "|" }),
          new Link({ text: "Documentation", to: "/docs" }),
          new H({ size: 5, text: "|" }),
          new Link({ text: "Examples", to: "/examples" }),
        ],
      }),
    ],
  });
};

export default HomePage;
```

---

## 📌 Optimized Widgets

### Basic Widgets
```Alert``` ```Badge``` ```Button``` ```Card``` ```Col``` ```Container```  
```GroupedButtons``` ```H``` ```Input``` ```InputGroup``` ```InputLabel```  
```Link``` ```P``` ```Progress``` ```Row``` ```Spinner```

### High-Performance Widgets
```VirtualList``` ```LazyWidget```

### Advanced Widgets (New!)
```Modal``` ```Tooltip``` ```Toast```

### VirtualList - For Large Lists

```ts
import { VirtualList, H, P } from "canoejs";

const LargeList = () => {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `Description for item ${i}`
  }));

  return new VirtualList({
    items,
    itemHeight: 60,
    containerHeight: 400,
    renderItem: (item) => new Col({
      children: [
        new H({ size: 4, text: item.title }),
        new P({ text: item.description })
      ]
    })
  });
};
```

### LazyWidget - Deferred Loading

```ts
import { LazyWidget, Spinner } from "canoejs";

const LazyComponent = () => {
  return new LazyWidget({
    loader: () => import('./HeavyComponent').then(m => m.default),
    placeholder: new Spinner({})
  });
};
```

---

## 🔄 Optimized Lifecycle Hooks

### `onLoad`
Triggered after the first call to:
```ts
Canoe.buildApp("root", context, Router.render).render();
```

### `preBuild`
Called right after a state update via `Canoe.setState()`.

### `postBuild`
Runs after every state update and allows full access to the **current** DOM.

### Example Usage with Performance Monitoring

```ts
import { Canoe, PerformanceManager } from "canoejs";

Canoe.onLoad(() => {
  console.log("App loaded!");
});

Canoe.preBuild(() => {
  PerformanceManager.measureTime("build", () => {
    // Build logic here
  });
});

Canoe.postBuild(() => {
  console.log("Build completed!");
  console.log("Average build time:", PerformanceManager.getAverageTime("build"));
});
```

---

## 🎨 CSS Custom Properties

CanoeJS automatically applies CSS custom properties for theming:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #06b6d4;
  
  --font-family: system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

## 🚀 Advanced Example

Check out the advanced example in `template/src/example-advanced.ts` to see all new features in action!

```ts
import AdvancedComponent from "./example-advanced";

// Add to your routes
Router.addRoute("/advanced", () => new AdvancedComponent(), "Advanced Demo");
```

---

## 📦 Bundle Size

- **Core Framework**: ~8KB gzipped
- **With All Features**: ~12KB gzipped
- **Tree-shakeable**: Only import what you need

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by Flutter's widget system
- Performance optimizations inspired by React and Vue
- Animation system inspired by Framer Motion
- Hooks system inspired by React Hooks

---

**Made with ❤️ by the CanoeJS Team**

