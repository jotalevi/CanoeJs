export interface PerformanceConfig {
    enableVirtualScrolling: boolean;
    enableLazyLoading: boolean;
    enableMemoization: boolean;
    enableEventDelegation: boolean;
    enableBatchUpdates: boolean;
    enableRenderCaching: boolean;
    maxCacheSize: number;
    cacheTTL: number;
    debounceDelay: number;
    throttleDelay: number;
}

export const defaultPerformanceConfig: PerformanceConfig = {
    enableVirtualScrolling: true,
    enableLazyLoading: true,
    enableMemoization: true,
    enableEventDelegation: true,
    enableBatchUpdates: true,
    enableRenderCaching: true,
    maxCacheSize: 1000,
    cacheTTL: 5 * 60 * 1000, // 5 minutos
    debounceDelay: 16, // ~60fps
    throttleDelay: 100
};

export class PerformanceManager {
    private static config: PerformanceConfig = defaultPerformanceConfig;
    private static metrics: Map<string, number[]> = new Map();

    static setConfig(config: Partial<PerformanceConfig>): void {
        this.config = { ...this.config, ...config };
    }

    static getConfig(): PerformanceConfig {
        return this.config;
    }

    static measureTime<T>(name: string, fn: () => T): T {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name)!.push(end - start);
        
        return result;
    }

    static getMetrics(name: string): number[] {
        return this.metrics.get(name) || [];
    }

    static getAverageTime(name: string): number {
        const times = this.getMetrics(name);
        if (times.length === 0) return 0;
        return times.reduce((a, b) => a + b, 0) / times.length;
    }

    static clearMetrics(): void {
        this.metrics.clear();
    }

    static debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number = this.config.debounceDelay
    ): (...args: Parameters<T>) => void {
        let timeoutId: number;
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }

    static throttle<T extends (...args: any[]) => any>(
        func: T,
        delay: number = this.config.throttleDelay
    ): (...args: Parameters<T>) => void {
        let lastCall = 0;
        return (...args: Parameters<T>) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    }
} 