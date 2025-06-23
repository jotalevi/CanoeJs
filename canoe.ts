import { Render } from "./Render";
import { Router } from "./Router";
import { PerformanceManager } from "./PerformanceManager";
import { EventLinker } from "./EventLinker";

// Development mode detection
const isDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname.includes('dev') ||
   window.location.hostname.includes('local'));

// Development tools
class DevTools {
  private static instance: DevTools;
  private buildTimes: number[] = [];
  private eventLog: Array<{type: string, target: any, data?: any, timestamp: number}> = [];
  private stateHistory: Array<{state: any, timestamp: number}> = [];
  private maxHistorySize = 50;

  static getInstance(): DevTools {
    if (!DevTools.instance) {
      DevTools.instance = new DevTools();
    }
    return DevTools.instance;
  }

  logBuildTime(time: number): void {
    this.buildTimes.push(time);
    if (this.buildTimes.length > 10) {
      this.buildTimes.shift();
    }
    
    const avgTime = this.buildTimes.reduce((a, b) => a + b, 0) / this.buildTimes.length;
    console.log(`🏗️ CanoeJS Build #${this.buildTimes.length} completed in ${time.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms)`);
  }

  logEvent(type: string, target: any, data?: any): void {
    const event = {
      type,
      target,
      data,
      timestamp: performance.now()
    };
    
    this.eventLog.push(event);
    if (this.eventLog.length > this.maxHistorySize) {
      this.eventLog.shift();
    }
    
    console.log(`🎯 CanoeJS Event: ${type}`, { target, data, timestamp: new Date().toISOString() });
  }

  logStateChange(newState: any): void {
    this.stateHistory.push({
      state: JSON.parse(JSON.stringify(newState)), // Deep clone
      timestamp: performance.now()
    });
    
    if (this.stateHistory.length > this.maxHistorySize) {
      this.stateHistory.shift();
    }
  }

  getBuildStats(): {current: number, average: number, history: number[]} {
    const current = this.buildTimes[this.buildTimes.length - 1] || 0;
    const average = this.buildTimes.length > 0 
      ? this.buildTimes.reduce((a, b) => a + b, 0) / this.buildTimes.length 
      : 0;
    
    return {
      current,
      average,
      history: [...this.buildTimes]
    };
  }

  getEventLog(): Array<{type: string, target: any, data?: any, timestamp: number}> {
    return [...this.eventLog];
  }

  getStateHistory(): Array<{state: any, timestamp: number}> {
    return this.stateHistory.map(item => ({
      state: JSON.parse(JSON.stringify(item.state)),
      timestamp: item.timestamp
    }));
  }

  clearLogs(): void {
    this.eventLog = [];
    this.stateHistory = [];
    console.log('🧹 CanoeJS logs cleared');
  }

  getPerformanceStats(): any {
    return {
      buildTimes: this.getBuildStats(),
      eventCount: this.eventLog.length,
      stateChanges: this.stateHistory.length,
      memoryUsage: (performance as any).memory ? {
        used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)
      } : null
    };
  }
}

export class Canoe {
  private static state: any = {};
  private static renderInstance: Render | null = null;
  private static routerInstance: Router | null = null;
  private static devTools = DevTools.getInstance();
  private static onLoadCallbacks: (() => void)[] = [];
  private static preBuildCallbacks: (() => void)[] = [];
  private static postBuildCallbacks: (() => void)[] = [];
  private static debug = isDevelopment;

  static setState(newState: any): void {
    const startTime = performance.now();
    
    // Log state change in dev mode
    if (isDevelopment) {
      this.devTools.logStateChange(newState);
      console.log('🔄 CanoeJS State Change:', newState);
    }

    // Merge state
    this.state = { ...this.state, ...newState };

    // Trigger pre-build callbacks
    this.preBuildCallbacks.forEach(callback => callback());

    // Render with performance measurement
    if (this.renderInstance) {
      this.renderInstance.render(this.state);
    }

    // Calculate build time
    const buildTime = performance.now() - startTime;
    
    // Log build time in dev mode
    if (isDevelopment) {
      this.devTools.logBuildTime(buildTime);
    }

    // Trigger post-build callbacks
    this.postBuildCallbacks.forEach(callback => callback());
  }

  static getState(): any {
    return { ...this.state };
  }

  static buildApp(rootId: string, initialState: any, renderFunction: (state: any) => any): Canoe {
    this.state = initialState;
    this.renderInstance = new Render(rootId, renderFunction);
    this.routerInstance = new Router();
    
    // Initialize dev tools in development mode
    if (isDevelopment) {
      this.initializeDevTools();
    }

    return this;
  }

  static render(): void {
    if (this.renderInstance) {
      const startTime = performance.now();
      this.renderInstance.render(this.state);
      const buildTime = performance.now() - startTime;
      
      if (isDevelopment) {
        this.devTools.logBuildTime(buildTime);
      }
    }
  }

  static onLoad(callback: () => void): void {
    this.onLoadCallbacks.push(callback);
  }

  static preBuild(callback: () => void): void {
    this.preBuildCallbacks.push(callback);
  }

  static postBuild(callback: () => void): void {
    this.postBuildCallbacks.push(callback);
  }

  // Development tools methods
  private static initializeDevTools(): void {
    if (typeof window !== 'undefined') {
      // Expose Canoe to window for console access
      (window as any).Canoe = {
        // State management
        state: () => this.getState(),
        setState: (newState: any) => this.setState(newState),
        getState: () => this.getState(),
        
        // Rendering
        render: () => this.render(),
        forceRender: () => {
          console.log('🔄 Force rendering...');
          this.render();
        },
        
        // Router
        router: () => this.routerInstance,
        navigate: (path: string) => {
          if (this.routerInstance) {
            this.routerInstance.navigate(path);
          }
        },
        getCurrentRoute: () => this.routerInstance?.getCurrentRoute(),
        getRoutes: () => this.routerInstance?.getRoutes(),
        
        // Performance
        performance: () => this.devTools.getPerformanceStats(),
        getBuildStats: () => this.devTools.getBuildStats(),
        
        // Events
        events: () => this.devTools.getEventLog(),
        clearEvents: () => {
          this.devTools.clearLogs();
        },
        
        // State history
        stateHistory: () => this.devTools.getStateHistory(),
        resetState: (newState?: any) => {
          if (newState) {
            this.setState(newState);
          } else {
            this.setState({});
          }
          console.log('🔄 State reset');
        },
        
        // Debug
        debug: {
          enabled: this.debug,
          toggle: () => {
            this.debug = !this.debug;
            console.log(`🐛 Debug mode: ${this.debug ? 'ON' : 'OFF'}`);
          },
          logState: () => {
            console.log('📊 Current State:', this.getState());
          },
          logPerformance: () => {
            console.log('⚡ Performance Stats:', this.devTools.getPerformanceStats());
          },
          logEvents: () => {
            console.log('🎯 Event Log:', this.devTools.getEventLog());
          },
          logRoutes: () => {
            console.log('🗺️ Routes:', this.routerInstance?.getRoutes());
          }
        },
        
        // Utilities
        utils: {
          measureTime: (name: string, fn: () => any) => {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`);
            return result;
          },
          benchmark: (name: string, iterations: number, fn: () => any) => {
            const times: number[] = [];
            for (let i = 0; i < iterations; i++) {
              const start = performance.now();
              fn();
              times.push(performance.now() - start);
            }
            const avg = times.reduce((a, b) => a + b, 0) / times.length;
            const min = Math.min(...times);
            const max = Math.max(...times);
            console.log(`🏁 ${name} Benchmark (${iterations} iterations):`);
            console.log(`   Average: ${avg.toFixed(2)}ms`);
            console.log(`   Min: ${min.toFixed(2)}ms`);
            console.log(`   Max: ${max.toFixed(2)}ms`);
          }
        },
        
        // Help
        help: () => {
          console.log(`
🚀 CanoeJS Development Tools

📊 State Management:
  Canoe.state()           - Get current state
  Canoe.setState(obj)     - Update state
  Canoe.getState()        - Get state copy
  Canoe.resetState()      - Reset to empty state
  Canoe.stateHistory()    - View state change history

🎯 Rendering:
  Canoe.render()          - Force re-render
  Canoe.forceRender()     - Force re-render (alias)

🗺️ Routing:
  Canoe.navigate(path)    - Navigate to route
  Canoe.getCurrentRoute() - Get current route
  Canoe.getRoutes()       - List all routes

⚡ Performance:
  Canoe.performance()     - Get performance stats
  Canoe.getBuildStats()   - Get build time stats

🎯 Events:
  Canoe.events()          - View event log
  Canoe.clearEvents()     - Clear event log

🐛 Debug:
  Canoe.debug.logState()      - Log current state
  Canoe.debug.logPerformance()- Log performance stats
  Canoe.debug.logEvents()     - Log events
  Canoe.debug.logRoutes()     - Log routes
  Canoe.debug.toggle()        - Toggle debug mode

⏱️ Utilities:
  Canoe.utils.measureTime(name, fn)     - Measure function execution time
  Canoe.utils.benchmark(name, n, fn)    - Benchmark function n times

💡 Examples:
  Canoe.setState({counter: 42})         - Update counter
  Canoe.navigate('/docs')               - Navigate to docs
  Canoe.utils.measureTime('test', () => {/* your code */})
          `);
        }
      };

      // Log initialization
      console.log('🛠️ CanoeJS Development Tools initialized');
      console.log('💡 Type "Canoe.help()" for available commands');
      
      // Trigger onLoad callbacks
      this.onLoadCallbacks.forEach(callback => callback());
    }
  }

  // Batch update functionality
  static batchUpdate(updates: (() => void)[]): void {
    const startTime = performance.now();
    
    if (isDevelopment) {
      console.log(`🔄 Batch Update: ${updates.length} operations`);
    }

    // Execute all updates
    updates.forEach(update => update());

    // Single render after all updates
    if (this.renderInstance) {
      this.renderInstance.render(this.state);
    }

    const buildTime = performance.now() - startTime;
    
    if (isDevelopment) {
      this.devTools.logBuildTime(buildTime);
      console.log(`✅ Batch Update completed in ${buildTime.toFixed(2)}ms`);
    }
  }

  // Get router instance
  static getRouter(): Router | null {
    return this.routerInstance;
  }

  // Get render instance
  static getRender(): Render | null {
    return this.renderInstance;
  }

  // Check if in development mode
  static isDevelopment(): boolean {
    return isDevelopment;
  }
} 