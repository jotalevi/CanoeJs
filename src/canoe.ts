import Widget from "./core/Widget";
import Div from "./core/Div";
import H from "./core/H";

import Render from "./core/Render";
import TextInput from "./core/TextInput";

const Canoe = {
  Widget: Widget,
  Div: Div,
  H: H,
  Render: Render,
};

const getDomPath = (el: Element): string | null => {
  if (!(el instanceof HTMLElement)) return null;
  const path = [];
  while (el && el.nodeType === Node.ELEMENT_NODE && el !== document.body) {
    let selector = el.nodeName.toLowerCase();
    if (el.className) {
      const classes = el.className.trim().split(/\s+/).join(".");
      selector += `.${classes}`;
    }
    const sibling = Array.from(el.parentNode!.children).filter(
      (e) => e.nodeName === el.nodeName
    );
    if (sibling.length > 1) {
      selector += `:nth-of-type(${
        Array.from(el.parentNode!.children).indexOf(el) + 1
      })`;
    }
    path.unshift(selector);
    el = el.parentElement!;
  }
  return path.join(" > ");
};

// Restore focus to an element using the stored selector
const restoreFocus = (selector: string | null) => {
  if (!selector) return;
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

const state = {
  text: "Initial Text",
};

const setState = (newState: any) => {
  let trState = { ...state, ...newState };

  for (let key in state) delete state[key];
  for (let key in trState) state[key] = trState[key];

  let focus = getDomPath(document.activeElement);
  reRender();
  restoreFocus(focus);
};

const reRender = () => {
  let appWidgets = new Div({
    children: [
      new H({
        text: state.text,
      }),
      new TextInput({
        value: state.text,
        callbacks: [
          {
            key: "keyup",
            value: (e: Event) => {
              console.log(e);
              setState({ text: (e.target as HTMLInputElement).value });
            },
          },
        ],
      }),
    ],
  });

  new Render("root", appWidgets).render();
};

reRender();
