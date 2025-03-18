import Widget from "./core/Widget";
import Render from "./core/Render";

import H from "./core/widgets/H";
import Div from "./core/widgets/Div";
import TextInput from "./core/widgets/TextInput";
import Row from "./core/widgets/Row";
import Col from "./core/widgets/Col";
import Card from "./core/widgets/Card";
import Button from "./core/widgets/Button";
import Router from "./core/widgets/Router";
import Link from "./core/widgets/Link";
import FlexAlignContent from "./core/enum/FlexAlignContent";
import FlexAlignItems from "./core/enum/FlexAlignItems";
import FlexJustify from "./core/enum/FlexJustify";
import FlexWrap from "./core/enum/FlexWrap";
import randomId from "./core/utils/randomId";

import { hashString } from "./core/utils/hashStr";

class Canoe {
  private static rootId = "";
  private static stateHash: string = "";
  private static state: any;
  private static renderer: Render;
  private static render: (state: any) => Widget;

  private static onLoadCallbacks: Function[] = [];
  private static postBuildCallbacks: Function[] = [];
  private static preBuildCallbacks: Function[] = [];

  static onLoad(callback: Function): void {
    this.onLoadCallbacks.push(callback);
  }

  static postBuild(callback: Function): void {
    this.postBuildCallbacks.push(callback);
  }

  static preBuild(callback: Function): void {
    this.preBuildCallbacks.push(callback);
  }

  static buildApp(rootId: string, initialState: any, renderFn: (state: any) => Widget): Render {
    this.onLoadCallbacks.forEach((callback) => {
      callback();
    });

    this.rootId = rootId;
    this.render = renderFn;
    this._setState(initialState, false);

    this.renderer = new Render(rootId, renderFn(initialState));
    return this.renderer;
  }

  public static setState(newState: any): void {
    this._setState(newState, true);
  }

  static _setState(newState: any, rebuild = true): Promise<void> {
    //if there is no state, create one
    if (!this.state) {
      this.state = {};
    }

    this.preBuildCallbacks.forEach((callback) => {
      callback();
    });

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

    this.postBuildCallbacks.forEach((callback) => {
      callback();
    });
  }
}

export { Widget, Render, Canoe, H, Div, Row, Col, TextInput, hashString, Card, Button, Router, Link, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap, randomId };