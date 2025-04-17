import { EventLinker } from "canoejs";
import Widget from "./Widget";
import { Canoe } from "../canoe";

export default class Render {
  rootId: string = "";
  rootWidget: Widget;

  constructor(rootId: string = "", rootWidget: Widget) {
    this.rootId = rootId;
    this.rootWidget = rootWidget;
  }

  private getFocus = (): string | null => {
    let el: Element | null = document.activeElement;
    if (!el) return null;

    const stack: string[] = [];
    while (el && el.parentNode) {
      let sibCount = 0;
      let sibIndex = 0;

      if (el.parentNode instanceof HTMLElement) {
        const siblings = el.parentNode.children;
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeName === el.nodeName) {
            if (siblings[i] === el) sibIndex = sibCount;
            sibCount++;
          }
        }
      }

      if (el instanceof HTMLElement && el.id) {
        stack.unshift(`${el.nodeName.toLowerCase()}#${el.id}`);
      } else if (sibCount > 1) {
        stack.unshift(`${el.nodeName.toLowerCase()}:nth-of-type(${sibIndex + 1})`);
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }

      el = el.parentNode as Element;
    }

    return stack.length > 1 ? stack.slice(1).join(' > ') : null;
  };

  private setFocus = (selector: string | null) => {
    if (!selector) return;
    const element = document.querySelector(selector) as HTMLElement | null;
    element?.focus();
  };

  private updateAttributes = (oldEl: HTMLElement, newEl: HTMLElement) => {
    const oldAttrs = new Set(oldEl.getAttributeNames());
    const newAttrs = new Set(newEl.getAttributeNames());

    // Remove old attributes
    oldAttrs.forEach(attr => {
      if (!newAttrs.has(attr)) {
        oldEl.removeAttribute(attr);
      }
    });

    // Set new and changed attributes
    newAttrs.forEach(attr => {
      const newVal = newEl.getAttribute(attr);
      if (oldEl.getAttribute(attr) !== newVal) {
        oldEl.setAttribute(attr, newVal || "");
      }
    });
  };

  private updateChildren = (oldEl: HTMLElement, newEl: HTMLElement) => {
    const oldChildren = Array.from(oldEl.childNodes);
    const newChildren = Array.from(newEl.childNodes);

    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];

      if (!oldChild && newChild) {
        oldEl.appendChild(newChild.cloneNode(true));
      } else if (oldChild && !newChild) {
        oldEl.removeChild(oldChild);
      } else if (
        oldChild?.nodeType === Node.TEXT_NODE &&
        newChild?.nodeType === Node.TEXT_NODE
      ) {
        if (oldChild.textContent !== newChild.textContent) {
          oldChild.textContent = newChild.textContent;
        }
      } else if (
        oldChild instanceof HTMLElement &&
        newChild instanceof HTMLElement
      ) {
        this.updateElement(oldChild, newChild);
      } else if (oldChild && newChild) {
        oldEl.replaceChild(newChild.cloneNode(true), oldChild);
      }
    }
  };

  private updateElement = (oldEl: HTMLElement, newEl: HTMLElement) => {
    if (oldEl.tagName !== newEl.tagName) {
      oldEl.replaceWith(newEl);
      return;
    }

    this.updateAttributes(oldEl, newEl);
    this.updateChildren(oldEl, newEl);
  };

  render(): HTMLElement | null {
    EventLinker.clearEvents();
    const focusSelector = this.getFocus();
    const rootElement = document.getElementById(this.rootId);
    const newContent = this.rootWidget.render();

    if (!rootElement) {
      if (Canoe.debug) console.warn(`Render error: element with id '${this.rootId}' not found.`);
      return null;
    }

    // Failsafe: replace everything on major route change
    if (rootElement.firstChild) {
      this.updateElement(rootElement.firstChild as HTMLElement, newContent);
    } else {
      rootElement.appendChild(newContent);
    }

    this.setFocus(focusSelector);

    EventLinker.linkEvents();
    return rootElement;
  }

}
