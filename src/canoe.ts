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
import LazyWidget from "./core/widgets/LazyWidget";
import Link from "./core/widgets/Link";
import P from "./core/widgets/P";
import Progress from "./core/widgets/Progress";
import Row from "./core/widgets/Row";
import Spinner from "./core/widgets/Spinner";
import VirtualList from "./core/widgets/VirtualList";

import FlexAlignContent from "./core/enum/FlexAlignContent";
import FlexAlignItems from "./core/enum/FlexAlignItems";
import FlexJustify from "./core/enum/FlexJustify";
import FlexWrap from "./core/enum/FlexWrap";
import DefaultStyles from "./core/enum/DefaultStyles";

import hashString from "./core/utils/hashStr";
import addHistoryEventsListener from "./core/utils/historyEvents";
import normalizeUrl from "./core/utils/normalizeUrl";
import randomId from "./core/utils/randomId";
import { memo, clearMemo, clearExpiredMemo } from "./core/utils/memo";
import { PerformanceManager } from "./core/config/Performance";

class Canoe {
  public static debug: boolean = false;

  private static rootId = "";
  private static stateHash: string = "";
  private static state: any = {};
  private static renderer: Render;
  private static render: (state: any) => Widget;
  private static batchUpdates: boolean = false;
  private static pendingUpdates: any[] = [];
  private static renderScheduled: boolean = false;

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

    // Bind history events listeners
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
    if (this.batchUpdates) {
      this.pendingUpdates.push(newState);
      this.scheduleRender();
      return;
    }
    
    this._setState(newState, true);
  }

  public static batchUpdate(updates: (() => void)[]): void {
    this.batchUpdates = true;
    
    updates.forEach(update => update());
    
    this.batchUpdates = false;
    
    if (this.pendingUpdates.length > 0) {
      const mergedState = this.pendingUpdates.reduce((acc, update) => ({ ...acc, ...update }), {});
      this.pendingUpdates = [];
      this._setState(mergedState, true);
    }
  }

  private static scheduleRender(): void {
    if (!this.renderScheduled) {
      this.renderScheduled = true;
      requestAnimationFrame(() => {
        this.renderScheduled = false;
        if (this.pendingUpdates.length > 0) {
          const mergedState = this.pendingUpdates.reduce((acc, update) => ({ ...acc, ...update }), {});
          this.pendingUpdates = [];
          this._setState(mergedState, true);
        }
      });
    }
  }

  static _setState(newState: any, rebuild = true): Promise<void> {
    this.preBuildCallbacks.forEach((callback) => {
      callback();
    });

    // Update the state
    Object.assign(this.state, newState);

    // Generate hash of state (optimized)
    let newHash = hashString(JSON.stringify(this.state, (_, value) =>
      typeof value === "function" ? value.toString() : value
    ));

    // If the hash is the same, do nothing
    if (newHash === this.stateHash) {
      return Promise.resolve();
    }

    // Update the hash
    this.stateHash = newHash;

    // Re-render the app
    if (rebuild) {
      new Render(this.rootId, this.render(this.state)).render();
    }

    this.postBuildCallbacks.forEach((callback) => {
      callback();
    });

    return Promise.resolve();
  }

  static clearCache(): void {
    Render.clearCache();
    Router.clearCache();
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
  LazyWidget,
  Link,
  P,
  Progress,
  Row,
  Spinner,
  VirtualList,
  FlexAlignContent,
  FlexAlignItems,
  FlexJustify,
  FlexWrap,
  DefaultStyles,
  hashString,
  addHistoryEventsListener,
  normalizeUrl,
  randomId,
  memo,
  clearMemo,
  clearExpiredMemo,
  PerformanceManager,
}