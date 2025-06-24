import { Canoe } from "../../canoe";

// Hook state storage
const hookStates = new Map<string, any[]>();
const hookIndexes = new Map<string, number>();
const effectCallbacks = new Map<string, (() => void)[]>();

let currentComponentId: string | null = null;

export function setCurrentComponent(id: string): void {
  currentComponentId = id;
}

export function getCurrentComponentId(): string | null {
  return currentComponentId;
}

// useState Hook
export function useState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const componentId = getCurrentComponentId();
  if (!componentId) {
    throw new Error("useState must be called within a component");
  }

  if (!hookStates.has(componentId)) {
    hookStates.set(componentId, []);
    hookIndexes.set(componentId, 0);
  }

  const index = hookIndexes.get(componentId)!;
  const states = hookStates.get(componentId)!;

  if (index >= states.length) {
    states.push(initialValue);
  }

  const setState = (value: T | ((prev: T) => T)) => {
    const newValue = typeof value === 'function' ? (value as (prev: T) => T)(states[index]) : value;
    if (states[index] !== newValue) {
      states[index] = newValue;
      // Trigger re-render
      Canoe.setState({});
    }
  };

  hookIndexes.set(componentId, index + 1);
  return [states[index], setState];
}

// useEffect Hook
export function useEffect(callback: () => void | (() => void), dependencies?: any[]): void {
  const componentId = getCurrentComponentId();
  if (!componentId) {
    throw new Error("useEffect must be called within a component");
  }

  if (!effectCallbacks.has(componentId)) {
    effectCallbacks.set(componentId, []);
  }

  const effects = effectCallbacks.get(componentId)!;
  const effectIndex = effects.length;

  // Store effect for later execution
  effects.push(() => {
    const cleanup = callback();
    if (cleanup) {
      // Store cleanup function
      effects[effectIndex] = cleanup;
    }
  });
}

// useMemo Hook
export function useMemo<T>(factory: () => T, dependencies?: any[]): T {
  const componentId = getCurrentComponentId();
  if (!componentId) {
    throw new Error("useMemo must be called within a component");
  }

  const memoKey = `${componentId}_memo_${dependencies?.join('_') || 'no_deps'}`;
  
  if (!hookStates.has(memoKey)) {
    hookStates.set(memoKey, [factory()]);
  }

  return hookStates.get(memoKey)![0];
}

// useCallback Hook
export function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies?: any[]
): T {
  return useMemo(() => callback, dependencies);
}

// useRef Hook
export function useRef<T>(initialValue: T): { current: T } {
  const componentId = getCurrentComponentId();
  if (!componentId) {
    throw new Error("useRef must be called within a component");
  }

  const refKey = `${componentId}_ref`;
  
  if (!hookStates.has(refKey)) {
    hookStates.set(refKey, [{ current: initialValue }]);
  }

  return hookStates.get(refKey)![0];
}

// Cleanup function for component unmount
export function cleanupComponent(componentId: string): void {
  // Cleanup effects
  const effects = effectCallbacks.get(componentId);
  if (effects) {
    effects.forEach(effect => {
      if (typeof effect === 'function') {
        effect();
      }
    });
    effectCallbacks.delete(componentId);
  }

  // Cleanup states
  hookStates.delete(componentId);
  hookIndexes.delete(componentId);
}

// Reset hook index for new render
export function resetHookIndex(componentId: string): void {
  hookIndexes.set(componentId, 0);
} 