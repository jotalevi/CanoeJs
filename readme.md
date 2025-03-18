# Canoe 🛶

Canoe is a lightweight, flexible UI framework designed for building dynamic web applications with a **Widget-based** approach. It follows a **Flutter-inspired layout system** and utilizes an **efficient DOM diffing algorithm** for optimized rendering.

## 🚀 Features
- **Widget-Based System**: Components extend a `Widget` interface, ensuring consistency.
- **Flutter-Style Layout**: Includes `Row`, `Col`, and `Stack`.
- **Efficient State Management**: Automatically triggers re-renders on state updates.
- **Minimal DOM Updates**: Uses a custom diffing algorithm to update only changed elements.
- **Extendable & Modular**: Easily extend with custom widgets.

---

## 📂 Project Structure

```
src/
├── canoe.ts
├── core/
│   ├── Render.ts           # The renderer class and functions
│   ├── Widget.ts           # The Widget interface
│   ├── enum/
│   │   ├── ...*            # Enums... 
│   ├── widgets/
│   │   ├── ...*            # Basic Included Widgets (Row, Col, Div, Button, TextInput, Card, H, etc)
│   ├── utils/
│   │   ├── ...*            # Utilities for dom manipulation, state management and such
├── public/
│   ├── index.html          # The public served HTML file
│   ├── main.css            # The public included CSS Styles
```
---

## 🛠️ Installation

Install Canoe from npm (or bun... or yarn... or deno...).
```sh
npm install canoe
```


Starting a new project
```sh
npm install canoe
canoe create <projectname>
```

---

## 🚧 Usage

### **1️⃣ Define Your Root Widget**
Your app starts with a `Widget`, which will be updated dynamically.

```typescript
import Canoe from "./Canoe";
import Row from "./widgets/Row";
import TextInput from "./widgets/TextInput";

const app = Canoe.buildApp("root", { name: "Eros" }, (state) =>
    new Row({
        children: [new TextInput({ attributes: [{ key: "placeholder", value: state.name }] })],
    })
);
```

---

### **2️⃣ Manage State Easily**
State updates trigger re-renders **only for changed parts**.

```typescript
Canoe.setState({ name: "John" });
```

---

## 📌 Widgets

### **🟦 Row**
A flex container with **horizontal alignment options**.

```typescript
new Row({
    style: [{ key: "justifyContent", value: Row.MainAxisAlignment.CENTER }],
    children: [new TextInput({})],
});
```

### **🟨 Col**
A flex container with **vertical alignment options**.

```typescript
new Col({
    style: [{ key: "alignItems", value: Col.CrossAxisAlignment.START }],
    children: [new TextInput({})],
});
```

### **🟥 Stack**
Overlapping elements on top of each other.

```typescript
new Stack({
    children: [
        new Div({ classes: ["background-box"] }),
        new Div({ classes: ["foreground-box"] }),
    ],
});
```

---

## 🏗️ Roadmap
- ✅ Core rendering & diffing engine.
- ✅ Widget system (`Row`, `Col`, `Stack`).
- 🔄 Component lifecycle methods (`onInit`, `onDestroy`).
- 📦 Widget library (Buttons, Modals, etc.).
- 🏎️ Performance optimizations.

---

## 🤝 Contributing
Feel free to fork, submit PRs, or report issues. All contributions are welcome! 🚀

---

## 📄 License
MIT License © 2025 Canoe Team
