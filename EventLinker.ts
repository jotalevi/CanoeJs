export class EventLinker {
  private static delegatedEvents: Map<string, Function> = new Map();
  private static eventCache: Map<string, Function> = new Map();
  private static isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname.includes('dev') ||
     window.location.hostname.includes('local'));

  static addDelegatedEvent(selector: string, eventType: string, handler: Function): void {
    const key = `${eventType}:${selector}`;
    this.delegatedEvents.set(key, handler);
    
    if (this.isDevelopment) {
      console.log(`🎯 CanoeJS: Delegated event registered - ${eventType} on ${selector}`);
    }
  }

  static removeDelegatedEvent(selector: string, eventType: string): void {
    const key = `${eventType}:${selector}`;
    this.delegatedEvents.delete(key);
    
    if (this.isDevelopment) {
      console.log(`🗑️ CanoeJS: Delegated event removed - ${eventType} on ${selector}`);
    }
  }

  static getDelegatedEvents(): Map<string, Function> {
    return new Map(this.delegatedEvents);
  }

  static clearDelegatedEvents(): void {
    this.delegatedEvents.clear();
    
    if (this.isDevelopment) {
      console.log('🧹 CanoeJS: All delegated events cleared');
    }
  }

  // Development tools
  static getEventStats(): any {
    return {
      delegatedEvents: this.delegatedEvents.size,
      cachedEvents: this.eventCache.size,
      totalEvents: this.delegatedEvents.size + this.eventCache.size
    };
  }

  static logEvents(): void {
    if (!this.isDevelopment) return;
    
    console.log('🎯 CanoeJS Event Stats:', this.getEventStats());
    console.log('📋 Delegated Events:');
    this.delegatedEvents.forEach((handler, key) => {
      console.log(`   ${key} -> ${handler.name || 'anonymous'}`);
    });
  }
} 