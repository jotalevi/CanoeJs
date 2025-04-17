import EventLinker from "./core/EventLinker";
import Render from "./core/Render";
import Router from "./core/Router";
import Widget from "./core/Widget";

import Alert from "./core/widgets/Alert";
import Badge from "./core/widgets/Badge";
import Button from "./core/widgets/Button";
import Card from "./core/widgets/Card";
import Col from "./core/widgets/Col";
import Container from "./core/widgets/Container";
import GroupedButtons from "./core/widgets/GroupedButtons";
import H from "./core/widgets/H";
import Input from "./core/widgets/Input";
import InputGroup from "./core/widgets/InputGroup";
import InputLabel from "./core/widgets/InputLabel";
import Link from "./core/widgets/Link";
import P from "./core/widgets/P";
import Progress from "./core/widgets/Progress";
import Row from "./core/widgets/Row";
import Spinner from "./core/widgets/Spinner";

import FlexAlignContent from "./core/enum/FlexAlignContent";
import FlexAlignItems from "./core/enum/FlexAlignItems";
import FlexJustify from "./core/enum/FlexJustify";
import FlexWrap from "./core/enum/FlexWrap";
import DefaultStyles from "./core/enum/DefaultStyles";

import hashString from "./core/utils/hashStr";
import addHistoryEventsListener from "./core/utils/historyEvents";
import normalizeUrl from "./core/utils/normalizeUrl";
import randomId from "./core/utils/randomId";

class Canoe {
  public static debug: boolean = false;

  private static rootId = "";
  private static stateHash: string = "";
  private static state: any;
  private static renderer: Render;
  private static render: (state: any) => Widget;

  private static onLoadCallbacks: Function[] = [];
  private static postBuildCallbacks: Function[] = [];
  private static preBuildCallbacks: Function[] = [];

  static setTitle(title: string): void {
    if (title) {
      document.title = title;
    }
  }

  static getState(): any {
    return this.state;
  }

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

    // Binc history events listeners
    addHistoryEventsListener();

    this.rootId = rootId;
    this.render = renderFn;
    this._setState(initialState, false);

    this.renderer = new Render(rootId, renderFn(initialState));
    return this.renderer;
  }

  public static navigate(url: string): void {

    // if url is another site or has http, open in new tab
    if (url.includes("http") || url.includes("www")) {
      window.open(url, "_blank");
      return;
    } else {
      window.history.pushState({}, "", url);
    }
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

export {
  Canoe,
  EventLinker,
  Render,
  Router,
  Widget,
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  GroupedButtons,
  H,
  Input,
  InputGroup,
  InputLabel,
  Link,
  P,
  Progress,
  Row,
  Spinner,
  FlexAlignContent,
  FlexAlignItems,
  FlexJustify,
  FlexWrap,
  DefaultStyles,
  hashString,
  addHistoryEventsListener,
  normalizeUrl,
  randomId,
}