# Canoe 🛶

Canoe is a lightweight, flexible UI framework designed for building dynamic web applications with a **Widget-based** approach. It follows a **Flutter-inspired layout system** and utilizes an **efficient DOM diffing algorithm** for optimized rendering.

## 🚀 Features
- **Widget-Based System**: Components extend a `Widget` interface, ensuring consistency.
- **Flutter-Style Layout**: Includes `Row`, `Col`, and `Stack` with `MainAxisAlignment` and `CrossAxisAlignment` options.
- **Efficient State Management**: Automatically triggers re-renders on state updates.
- **Minimal DOM Updates**: Uses a custom diffing algorithm to update only changed elements.
- **Extendable & Modular**: Easily extend with custom widgets.

---

## 📂 Project Structure

```
canoe/
│── core/
│   ├── Widget.ts        # Base Widget interface
│   ├── Render.ts        # Handles rendering & state updates
│   ├── State.ts         # Manages state with deep proxy tracking
│── widgets/
│   ├── Div.ts           # Basic Div widget
│   ├── Row.ts           # Flex row widget
│   ├── Col.ts           # Flex column widget
│   ├── Stack.ts         # Overlapping elements widget
│── utils/
│   ├── diff.ts          # DOM diffing algorithm
│   ├── hash.ts          # Utility for hashing objects
│── index.ts             # Entry point for Canoe
│── README.md            # Project Documentation
```

---

## 🛠️ Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/yourusername/canoe.git
cd canoe
npm install
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
