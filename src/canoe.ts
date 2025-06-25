// Core
import Widget from "./core/Widget";
import Render from "./core/Render";
import Router from "./core/Router";
import EventLinker from "./core/EventLinker";

// Utils
import hashString from "./core/utils/hashStr";
import addHistoryEventsListener from "./core/utils/historyEvents";
import normalizeUrl from "./core/utils/normalizeUrl";
import randomId from "./core/utils/randomId";
import { memo, clearMemo, clearExpiredMemo } from "./core/utils/memo";

// Performance
import { PerformanceManager } from "./core/config/Performance";

// Widgets
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
import Modal from "./core/widgets/Modal";
import Tooltip from "./core/widgets/Tooltip";
import Toast, { ToastManager } from "./core/widgets/Toast";

// Enums
import FlexAlignContent from "./core/enum/FlexAlignContent";
import FlexAlignItems from "./core/enum/FlexAlignItems";
import FlexJustify from "./core/enum/FlexJustify";
import FlexWrap from "./core/enum/Flexwrap";
import DefaultStyles from "./core/enum/defaultStyles";

// Theme
import { ThemeProvider, defaultTheme, darkTheme } from "./core/theme/ThemeProvider";

// Animation
import { AnimationManager } from "./core/animation/AnimationManager";

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
  
  // Sistema de suscripción al estado
  private static stateSubscribers: Map<string, Set<() => void>> = new Map();
  
  // Sistema de gestión de widgets
  private static widgetInstances: Map<string, any> = new Map();
  private static widgetUpdateQueue: Set<string> = new Set();

  static setTitle(title: string): void {
    if (title) {
      document.title = title;
    }
  }

  static getState(): any {
    return this.state;
  }

  // Suscribirse a cambios de estado específicos
  static subscribeToState(stateKey: string, callback: () => void): () => void {
    if (!this.stateSubscribers.has(stateKey)) {
      this.stateSubscribers.set(stateKey, new Set());
    }
    
    this.stateSubscribers.get(stateKey)!.add(callback);
    
    // Retornar función para desuscribirse
    return () => {
      this.stateSubscribers.get(stateKey)?.delete(callback);
    };
  }

  // Registrar una instancia de widget
  static registerWidget(widgetId: string, widget: any): void {
    this.widgetInstances.set(widgetId, widget);
  }

  // Desregistrar una instancia de widget
  static unregisterWidget(widgetId: string): void {
    this.widgetInstances.delete(widgetId);
  }

  // Marcar un widget para actualización
  static markWidgetForUpdate(widgetId: string): void {
    this.widgetUpdateQueue.add(widgetId);
  }

  // Actualizar todos los widgets marcados
  private static updateMarkedWidgets(): void {
    this.widgetUpdateQueue.forEach(widgetId => {
      const widget = this.widgetInstances.get(widgetId);
      if (widget && typeof widget.forceUpdate === 'function') {
        try {
          widget.forceUpdate();
        } catch (error) {
          console.error(`Error updating widget ${widgetId}:`, error);
        }
      }
    });
    this.widgetUpdateQueue.clear();
  }

  // Notificar a los suscriptores de cambios específicos
  private static notifySubscribers(changedKeys: string[]): void {
    changedKeys.forEach(key => {
      const subscribers = this.stateSubscribers.get(key);
      if (subscribers) {
        subscribers.forEach(callback => {
          try {
            callback();
          } catch (error) {
            console.error('Error in state subscriber:', error);
          }
        });
      }
    });
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

  // Forzar re-renderizado incluso si el hash no cambió
  public static forceRender(): void {
    if (this.renderer) {
      this.renderer.rootWidget = this.render(this.state);
      this.renderer.render();
    }
  }

  // Comparar valores de estado de manera más robusta
  private static hasStateChanged(oldValue: any, newValue: any): boolean {
    // Si son el mismo objeto, no han cambiado
    if (oldValue === newValue) return false;
    
    // Si uno es null/undefined y el otro no, han cambiado
    if ((oldValue == null) !== (newValue == null)) return true;
    
    // Si ambos son null/undefined, no han cambiado
    if (oldValue == null && newValue == null) return false;
    
    // Si son de tipos diferentes, han cambiado
    if (typeof oldValue !== typeof newValue) return true;
    
    // Para objetos y arrays, usar JSON.stringify para comparación profunda
    if (typeof oldValue === 'object') {
      try {
        return JSON.stringify(oldValue) !== JSON.stringify(newValue);
      } catch (error) {
        // Si hay error en la serialización, asumir que cambiaron
        return true;
      }
    }
    
    // Para valores primitivos, comparación directa
    return oldValue !== newValue;
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

    // Detectar qué claves cambiaron
    const changedKeys: string[] = [];
    Object.keys(newState).forEach(key => {
      const oldValue = this.state[key];
      const newValue = newState[key];
      
      // Comparación más robusta que maneja objetos anidados
      const hasChanged = this.hasStateChanged(oldValue, newValue);
      if (hasChanged) {
        changedKeys.push(key);
      }
    });

    // Update the state
    Object.assign(this.state, newState);

    // Notificar a los suscriptores de las claves que cambiaron
    if (changedKeys.length > 0) {
      this.notifySubscribers(changedKeys);
    }

    // Actualizar widgets marcados
    this.updateMarkedWidgets();

    // Generate hash of state (optimized) - pero solo si hay cambios reales
    let newHash = "";
    if (changedKeys.length > 0) {
      newHash = hashString(JSON.stringify(this.state, (_, value) =>
        typeof value === "function" ? value.toString() : value
      ));
    } else {
      newHash = this.stateHash; // Mantener el hash anterior si no hay cambios
    }

    // Si no hay cambios reales, no hacer nada
    if (newHash === this.stateHash && changedKeys.length === 0) {
      return Promise.resolve();
    }

    // Update the hash
    this.stateHash = newHash;

    // Re-render the app using existing renderer
    if (rebuild && this.renderer) {
      // Update the root widget with new state
      this.renderer.rootWidget = this.render(this.state);
      this.renderer.render();
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

  static help() {
    console.log("CanoeJS API disponible:");
    console.log(Object.getOwnPropertyNames(Canoe).filter(k => typeof (Canoe as any)[k] === 'function'));
    console.log("Ejemplo: Canoe.getState(), Canoe.setState({...}), Canoe.navigate('/docs'), etc.");
  }

  // Método de debug para diagnosticar problemas de re-renderizado
  static debugRender(newState: any): void {
    console.log("🔍 Debug Render:");
    console.log("Estado actual:", this.state);
    console.log("Nuevo estado:", newState);
    
    const changedKeys: string[] = [];
    Object.keys(newState).forEach(key => {
      const oldValue = this.state[key];
      const newValue = newState[key];
      const hasChanged = this.hasStateChanged(oldValue, newValue);
      if (hasChanged) {
        changedKeys.push(key);
        console.log(`  ✅ Cambio detectado en '${key}':`, { old: oldValue, new: newValue });
      } else {
        console.log(`  ❌ Sin cambios en '${key}':`, { old: oldValue, new: newValue });
      }
    });
    
    console.log("Claves que cambiaron:", changedKeys);
    console.log("Hash actual:", this.stateHash);
  }

  // Método de debug para verificar el estado de los eventos
  static debugEvents(): void {
    console.log("🎯 Debug Eventos:");
    const stats = EventLinker.getEventStats();
    console.log("Estadísticas de eventos:", stats);
    
    const duplicateCheck = EventLinker.checkForDuplicates();
    if (duplicateCheck.hasDuplicates) {
      console.warn("⚠️ Eventos duplicados detectados:", duplicateCheck.duplicates);
    } else {
      console.log("✅ No se detectaron eventos duplicados");
    }
    
    // Verificar si hay elementos con múltiples event listeners
    const elementsWithEvents = new Map<string, number>();
    EventLinker.events.forEach(event => {
      const count = elementsWithEvents.get(event.elementAtId) || 0;
      elementsWithEvents.set(event.elementAtId, count + 1);
    });
    
    const elementsWithMultipleEvents = Array.from(elementsWithEvents.entries())
      .filter(([_, count]) => count > 1);
    
    if (elementsWithMultipleEvents.length > 0) {
      console.log("📊 Elementos con múltiples eventos:", elementsWithMultipleEvents);
    }
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
  Modal,
  Tooltip,
  Toast,
  ToastManager,
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
  // Theme
  ThemeProvider,
  defaultTheme,
  darkTheme,
  // Animation
  AnimationManager
};