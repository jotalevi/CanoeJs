import Widget from "./Widget";

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

      if (el instanceof HTMLElement && el.hasAttribute('id') && el.id !== '') stack.unshift(`${el.nodeName.toLowerCase()}#${el.id}`);
      else if (sibCount > 1) stack.unshift(`${el.nodeName.toLowerCase()}:nth-of-type(${sibIndex + 1})`);
      else stack.unshift(el.nodeName.toLowerCase());

      el = el.parentNode as Element;
    }

    return stack.length > 1 ? stack.slice(1).join(' > ') : null; // Removes the html element
  };

  // Restore focus to an element using the stored selector
  private setFocus = (selector: string | null) => {
    if (!selector) return;
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  private updateElement = (oldEl: HTMLElement, newEl: HTMLElement) => {
    if (!oldEl || !newEl) return;

    // Step 1: If the elements are different types, replace the entire node
    if (oldEl.tagName !== newEl.tagName) {
      oldEl.replaceWith(newEl);
      return;
    }

    // Step 2: Update attributes
    this.updateAttributes(oldEl, newEl);

    // Step 3: Compare children recursively
    this.updateChildren(oldEl, newEl);
  }

  private updateAttributes = (oldEl: HTMLElement, newEl: HTMLElement) => {
    // Get old & new attributes
    const oldAttrs = new Set(oldEl.getAttributeNames());
    const newAttrs = new Set(newEl.getAttributeNames());

    // Remove attributes not in newEl
    oldAttrs.forEach(attr => {
      if (!newAttrs.has(attr)) oldEl.removeAttribute(attr);
    });

    // Add/update attributes from newEl
    newAttrs.forEach(attr => {
      const newValue = newEl.getAttribute(attr);
      if (oldEl.getAttribute(attr) !== newValue) {
        oldEl.setAttribute(attr, newValue || "");
      }
    });
  }

  private updateChildren = (oldEl: HTMLElement, newEl: HTMLElement) => {
    const oldChildren = Array.from(oldEl.childNodes);
    const newChildren = Array.from(newEl.childNodes);

    const maxLen = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLen; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];

      if (!newChild) {
        // Remove excess children
        oldChild?.remove();
      } else if (!oldChild) {
        // Append new children
        oldEl.appendChild(newChild);
      } else if (oldChild.nodeType === Node.TEXT_NODE && newChild.nodeType === Node.TEXT_NODE) {
        // Update text content
        if (oldChild.textContent !== newChild.textContent) {
          oldChild.textContent = newChild.textContent;
        }
      } else {
        // Recursively update child elements
        this.updateElement(oldChild as HTMLElement, newChild as HTMLElement);
      }
    }
  }

  render(): HTMLElement {
    //get the current focus
    let focus = this.getFocus();

    // TODO: Implement a diffing algorithm to update the DOM efficiently
    //render the root element
    //let oldHtml = document.getElementsByTagName('body')[0].firstChild as HTMLElement;
    let newHtml = this.rootWidget.render();
    //this.updateElement(oldHtml, newHtml);
    if (!document.getElementsByTagName('body')[0].children[0]) {
      document.getElementsByTagName('body')[0].appendChild(newHtml);
    } else {
      document.getElementsByTagName('body')[0].children[0].replaceWith(newHtml);
    }

    //restore focus
    this.setFocus(focus);

    //return the root element
    return document.getElementById(this.rootId);
  }
}
