import { Canoe } from "../canoe";

export interface WidgetLifecycle {
  onMount?: () => void;
  onUnmount?: () => void;
  onUpdate?: (prevState: any, newState: any) => void;
  shouldUpdate?: (prevState: any, newState: any) => boolean;
}

export default abstract class Widget {
  id: string;
  protected props: any;
  protected state: any = {};
  protected lifecycle: WidgetLifecycle;
  protected mounted: boolean = false;
  protected element: HTMLElement | null = null;
  protected root: HTMLElement | null = null;
  private stateSubscriptions: (() => void)[] = [];
  private stateDependencies: Set<string> = new Set();

  constructor(props: any = {}, lifecycle: WidgetLifecycle = {}) {
    this.props = props;
    this.lifecycle = lifecycle;
    this.id = this.generateId();
    
    // Registrar el widget en el sistema de gestión
    Canoe.registerWidget(this.id, this);
  }

  protected update = () => {
    if (this.root) {
      const nuevo = this.renderWithDependencyTracking();
      (this.root as Element).replaceWith(nuevo as Element);
      this.root = nuevo as HTMLElement;
    }
  };

  protected generateId(): string {
    return `widget_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Suscribirse a cambios del estado global
  protected subscribeToGlobalState(stateKey: string, callback: () => void): void {
    const unsubscribe = Canoe.subscribeToState(stateKey, callback);
    this.stateSubscriptions.push(unsubscribe);
  }

  // Limpiar todas las suscripciones
  protected clearSubscriptions(): void {
    this.stateSubscriptions.forEach(unsubscribe => unsubscribe());
    this.stateSubscriptions = [];
  }

  protected setState(newState: any): void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    
    if (this.lifecycle.shouldUpdate) {
      if (!this.lifecycle.shouldUpdate(prevState, this.state)) {
        return;
      }
    }

    if (this.lifecycle.onUpdate) {
      this.lifecycle.onUpdate(prevState, this.state);
    }

    this.forceUpdate();
  }

  protected forceUpdate(): void {
    // Marcar el widget para actualización en el sistema global
    Canoe.markWidgetForUpdate(this.id);
    
    // Si el widget está montado, actualizar inmediatamente
    if (this.mounted && this.element) {
      const newElement = this.renderWithDependencyTracking();
      if (newElement && this.element.parentNode) {
        this.element.parentNode.replaceChild(newElement, this.element);
        this.element = newElement;
      }
    }
  }

  mount(): void {
    if (!this.mounted) {
      this.mounted = true;
      if (this.lifecycle.onMount) {
        this.lifecycle.onMount();
      }
    }
  }

  unmount(): void {
    if (this.mounted) {
      this.mounted = false;
      this.clearSubscriptions();
      if (this.lifecycle.onUnmount) {
        this.lifecycle.onUnmount();
      }
    }
    
    // Desregistrar el widget del sistema de gestión
    Canoe.unregisterWidget(this.id);
  }

  // Método abstracto que debe ser implementado por los widgets
  protected abstract renderInternal(): HTMLElement;

  // Método render público que siempre usa tracking de dependencias
  render(): HTMLElement {
    return this.renderWithDependencyTracking();
  }

  // Método que combina render con tracking de dependencias
  protected renderWithDependencyTracking(): HTMLElement {
    // Limpiar dependencias anteriores
    this.stateDependencies.clear();
    
    // Crear un proxy para detectar accesos al estado global
    const originalGetState = Canoe.getState;
    const accessedKeys: string[] = [];
    
    Canoe.getState = function() {
      const state = originalGetState.call(this);
      
      // Crear un proxy para detectar qué propiedades se acceden
      return new Proxy(state, {
        get(target, prop) {
          if (typeof prop === 'string') {
            accessedKeys.push(prop);
          }
          return target[prop];
        }
      });
    };
    
    // Llamar al método render original
    const result = this.renderInternal();
    
    // Restaurar getState original
    Canoe.getState = originalGetState;
    
    // Guardar las dependencias detectadas
    accessedKeys.forEach(key => this.stateDependencies.add(key));
    
    // Suscribirse a las dependencias detectadas
    this.subscribeToDetectedDependencies();
    
    return result;
  }

  // Obtener las dependencias detectadas
  protected getStateDependencies(): string[] {
    return Array.from(this.stateDependencies);
  }

  // Suscribirse automáticamente a las dependencias detectadas
  protected subscribeToDetectedDependencies(): void {
    this.stateDependencies.forEach(dependency => {
      this.subscribeToGlobalState(dependency, () => {
        this.update();
      });
    });
  }
}
