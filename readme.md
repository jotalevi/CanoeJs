# CanoeJS 🚦

CanoeJS is a lightweight and flexible UI framework for building dynamic web applications using a **Widget-based** approach. Inspired by Flutter’s layout system, it features an efficient **DOM diffing algorithm** for fast, optimized rendering.

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

# Run the project (with nodemon)
npm run dev
```

---

## 🚧 Creating an App

```ts
import { Canoe, Router } from "canoejs";

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

This code sets up an app with two routes. The `/` route displays the contents of the `HomePage` widget, while `/docs` renders `DocsPage`. The `"root"` refers to the HTML element ID where the app will be mounted.

---

### Example `HomePage` Widget

```ts
import {
  Col, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap,
  H, Link, Router, Row
} from "canoejs";
import Logo from "../widgets/Logo";

const HomePage = () => {
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
      new Logo({}),
      new H({ size: 1, text: "CanoeJS" }),
      new H({ size: 3, text: "A lightweight framework for building web applications" }),
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

## 📌 Widgets

In CanoeJS, `Widget` is an abstract base class. On its own, it doesn't render anything—it’s meant to be extended to create both pages and reusable components.

Here are some built-in widgets:

```Alert``` ```Badge``` ```Button``` ```Card``` ```Col``` ```Container```  
```GroupedButtons``` ```H``` ```Input``` ```InputGroup``` ```InputLabel```  
```Link``` ```P``` ```Progress``` ```Row``` ```Spinner```

👉 [Click here for detailed usage and examples of each widget.](https://github.com/jotalevi/CanoeJs/blob/main/readme.md)

---

## 🔄 Lifecycle Hooks

CanoeJS offers a few lifecycle callbacks to hook into different stages of rendering:

### `onLoad`

Triggered after the first call to:

```ts
Canoe.buildApp("root", context, Router.render).render();
```

At this point, you can access `document` and `window`, but the DOM hasn’t been fully built yet.

### `preBuild`

Called right after a state update via `Canoe.setState()`. Like `onLoad`, you can access browser-side globals, and this time you’ll also have access to the **previous** DOM state.

### `postBuild`

Runs after every state update and allows full access to the **current** DOM. This is a great place to manipulate or inspect the page.

---

### Example Usage

```ts
Canoe.onLoad(() => {
  console.log("Loading Canoe...");
});

Canoe.preBuild(() => {
  window['timeStart'] = performance.now(); // Start timing
});

Canoe.postBuild(() => {
  // Measure and log render time
  if (Canoe.debug) {
    console.log("Execution time: " + (performance.now() - window['timeStart']) + "ms");
  }
});
```

---

## 🎯 EventLinker

`EventLinker` helps manage dynamic events tied to state updates. Unlike `addEventListener`, it allows more efficient event tracking and contributes to Canoe’s DOM diffing performance.

### Example

```ts
EventLinker.addEvent(
  "elementID",   // ID of the target element
  "onclick",     // Event type
  (e) => console.log(e) // Callback function
);

EventLinker.addStaticEvent(
  "customEvent",
  (e) => console.log(e)
);

EventLinker.send("customEvent"); // Trigger linked static event
```

While simple, `EventLinker` can greatly improve performance and code quality—especially in forms and input-heavy UIs. We highly recommend using it when building custom `Widgets` that require event handling.

