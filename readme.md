# CanoeJs 🛶

CanoeJs is a lightweight, flexible UI framework designed for building dynamic web applications with a **Widget-based** approach. It follows a **Flutter-inspired layout system** and utilizes an **efficient DOM diffing algorithm** for optimized rendering.

## 🚀 Features
- **Widget-Based System**: Components extend a `Widget` interface, ensuring consistency.
- **Flutter-Style Layout**: Includes `Row`, `Col` and more to come.
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
├── public/                 # The public served files
```
---

## 🛠️ Getting Started

```sh
# Install CanoeJS from npm (or bun... or yarn... or deno...).
npm install -g canoejs

# Create a new project
canoe new <projectname>

# CD into the new project
cd <projectname>

# Install Dependencies
npm i

# Run project
npm run serve
```

---

## 🚧 Usage

### **1️⃣ Define Your Root Widget**
Your app starts with a `Widget`, which will be updated dynamically.

```typescript
import { Canoe, H } from "canoejs";

Canoe.buildApp("root", {}, (state) => {
  return new H({
    size: 1,
    text: "CanoeJs App",
    style: {
      fontSize: "50px",
      fontWeight: "900",
      margin: "0px",
      padding: "0px",
      color: "#000000FF",
    },
  })
}).render();
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
    wrap: FlexWrap.NOWRAP,
    alignContent: FlexAlignContent.CENTER,
    justify: FlexJustify.CENTER,
    alignItems: FlexAlignItems.CENTER,
    gap: "5px",
    children: [
        ...
    ],
});
```

### **🟨 Col**
A flex container with **vertical alignment options**.

```typescript
new Row({
    wrap: FlexWrap.NOWRAP,
    alignContent: FlexAlignContent.CENTER,
    justify: FlexJustify.CENTER,
    alignItems: FlexAlignItems.CENTER,
    gap: "5px",
    children: [
        ...
    ],
});
```

### **🟥 TextInput**
A text input field that **updates state on user input**.

```typescript
new TextInput({
    value: state.text,
    callbacks: [{
        key: "keydown",
        value: (e) => {
            Canoe.setState({ text: e.target.value })
        }
    }]
})
```

---

## 🏗️ Roadmap
- ✅ Core rendering & diffing engine.
- 📝 Widget system (`Row`, `Col` and more to come).
- 📔 Documentation Pages.
- 🔄 Component lifecycle methods (`onInit`, `onDestroy`).
- 📦 Widget library (Buttons, Modals, etc.).
- 🏎️ Performance optimizations.

---

## 🤝 Contributing
Feel free to fork, submit PRs, or report issues. All contributions are welcome! 🚀

---

## 📄 License
MIT License © 2025 E.J. Talevi
