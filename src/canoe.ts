import Widget from "./core/Widget";
import Render from "./core/Render";

import H from "./core/HtmlWidgets/H";
import Div from "./core/HtmlWidgets/Div";
import TextInput from "./core/HtmlWidgets/TextInput";

import Row from "./core/CustomWidgets/Row";
import Col from "./core/CustomWidgets/Col";
import Card from "./core/CustomWidgets/Card";
import Button from "./core/CustomWidgets/Button";

import { hashString } from "./core/utils/hashStr";

class Canoe {
  private static rootId = "";
  private static stateHash: string = "";
  private static state: any;
  private static renderer: Render;
  private static render: (state: any) => Widget;

  static buildApp(rootId: string, initialState: any, renderFn: (state: any) => Widget): Render {
    this.rootId = rootId;
    this.render = renderFn;
    this._setState(initialState, false);

    this.renderer = new Render(rootId, renderFn(initialState));
    return this.renderer;
  }

  public static setState(newState: any): void {
    let start = performance.now();
    this._setState(newState, true);
    console.log("Execution time: " + (performance.now() - start) + "ms");
  }

  static _setState(newState: any, rebuild = true): Promise<void> {
    //if there is no state, create one
    if (!this.state) {
      this.state = {};
    }

    //update the state
    Object.assign(this.state, newState);

    //generate hash of state
    let newHash = hashString(JSON.stringify(this.state, (_, value) =>
      typeof value === "function" ? value.toString() : value
    ));

    //if the hash is the same, do nothing
    if (newHash === this.stateHash) {
      return;
    }

    //update the hash
    this.stateHash = newHash;

    //re-render the app
    if (rebuild) {
      new Render(this.rootId, this.render(this.state)).render();
    }
  }
}

export { Widget, Render, Canoe, H, Div, Row, Col, TextInput, hashString, Card, Button };