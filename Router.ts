export class Router {
  private routes: Map<string, any> = new Map();
  private currentRoute: string = '/';
  private routeCache: Map<string, any> = new Map();
  private isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname.includes('dev') ||
     window.location.hostname.includes('local'));

  addRoute(path: string, component: any, title?: string): void {
    this.routes.set(path, { component, title });
    
    if (this.isDevelopment) {
      console.log(`🗺️ CanoeJS: Route registered - ${path}${title ? ` (${title})` : ''}`);
    }
  }

  navigate(path: string): void {
    const previousRoute = this.currentRoute;
    this.currentRoute = path;
    
    if (this.isDevelopment) {
      console.log(`🧭 CanoeJS: Navigation - ${previousRoute} → ${path}`);
    }

    // Update browser history
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }

    // Trigger route change
    this.handleRouteChange();
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }

  getRoutes(): Map<string, any> {
    return new Map(this.routes);
  }

  // Development tools
  getRouteStats(): any {
    return {
      totalRoutes: this.routes.size,
      currentRoute: this.currentRoute,
      cachedRoutes: this.routeCache.size
    };
  }

  logRoutes(): void {
    if (!this.isDevelopment) return;
    
    console.log('🗺️ CanoeJS Route Stats:', this.getRouteStats());
    console.log('📋 Registered Routes:');
    this.routes.forEach((route, path) => {
      console.log(`   ${path} -> ${route.component.name || 'anonymous'}${route.title ? ` (${route.title})` : ''}`);
    });
  }

  clearRouteCache(): void {
    this.routeCache.clear();
    
    if (this.isDevelopment) {
      console.log('🧹 CanoeJS: Route cache cleared');
    }
  }

  private handleRouteChange(): void {
    // This method would handle the actual route change logic
    // For now, it's a placeholder that can be implemented based on the app's needs
    if (this.isDevelopment) {
      console.log(`🔄 CanoeJS: Route change handled for ${this.currentRoute}`);
    }
  }
} 