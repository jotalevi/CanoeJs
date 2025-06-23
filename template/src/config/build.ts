// Build configuration for template projects only
// This is NOT used in the main CanoeJS framework
export interface BuildConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  enableDebug: boolean;
  enableLogging: boolean;
  enableSourceMaps: boolean;
  enableMinification: boolean;
  enableHotReload: boolean;
  enablePerformanceMonitoring: boolean;
  enableErrorBoundaries: boolean;
  enableAnalytics: boolean;
}

// Get build configuration based on environment
export function getBuildConfig(): BuildConfig {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    isDevelopment,
    isProduction,
    enableDebug: isDevelopment,
    enableLogging: isDevelopment,
    enableSourceMaps: isDevelopment,
    enableMinification: isProduction,
    enableHotReload: isDevelopment,
    enablePerformanceMonitoring: isDevelopment,
    enableErrorBoundaries: isProduction,
    enableAnalytics: isProduction
  };
}

// Development configuration
export const devConfig: BuildConfig = {
  isDevelopment: true,
  isProduction: false,
  enableDebug: true,
  enableLogging: true,
  enableSourceMaps: true,
  enableMinification: false,
  enableHotReload: true,
  enablePerformanceMonitoring: true,
  enableErrorBoundaries: false,
  enableAnalytics: false
};

// Production configuration
export const prodConfig: BuildConfig = {
  isDevelopment: false,
  isProduction: true,
  enableDebug: false,
  enableLogging: false,
  enableSourceMaps: false,
  enableMinification: true,
  enableHotReload: false,
  enablePerformanceMonitoring: false,
  enableErrorBoundaries: true,
  enableAnalytics: true
};

// Logger utility for template projects
export class Logger {
  private config: BuildConfig;

  constructor(config: BuildConfig) {
    this.config = config;
  }

  log(message: string, ...args: any[]): void {
    if (this.config.enableLogging) {
      console.log(`[CanoeJS Template] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.config.enableDebug) {
      console.debug(`[CanoeJS Template Debug] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.config.enableLogging) {
      console.warn(`[CanoeJS Template Warning] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    console.error(`[CanoeJS Template Error] ${message}`, ...args);
  }

  performance(name: string, fn: () => any): any {
    if (this.config.enablePerformanceMonitoring) {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      this.debug(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
      return result;
    }
    return fn();
  }
}

// Global logger instance for template
export const logger = new Logger(getBuildConfig());

// Environment utilities for template
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isProduction = () => process.env.NODE_ENV === 'production';
export const isTest = () => process.env.NODE_ENV === 'test';

// Feature flags for template
export const features = {
  debug: isDevelopment(),
  logging: isDevelopment(),
  sourceMaps: isDevelopment(),
  minification: isProduction(),
  hotReload: isDevelopment(),
  performanceMonitoring: isDevelopment(),
  errorBoundaries: isProduction(),
  analytics: isProduction()
}; 