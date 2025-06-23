interface MemoCache {
    [key: string]: {
        value: any;
        dependencies: any[];
        timestamp: number;
    };
}

const memoCache: MemoCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export function memo<T>(
    key: string,
    fn: () => T,
    dependencies: any[] = []
): T {
    const cacheKey = `${key}_${JSON.stringify(dependencies)}`;
    const now = Date.now();
    
    // Verificar si existe en cache y no ha expirado
    if (memoCache[cacheKey] && (now - memoCache[cacheKey].timestamp) < CACHE_TTL) {
        return memoCache[cacheKey].value;
    }
    
    // Ejecutar función y cachear resultado
    const result = fn();
    memoCache[cacheKey] = {
        value: result,
        dependencies,
        timestamp: now
    };
    
    return result;
}

export function clearMemo(): void {
    Object.keys(memoCache).forEach(key => delete memoCache[key]);
}

export function clearExpiredMemo(): void {
    const now = Date.now();
    Object.keys(memoCache).forEach(key => {
        if ((now - memoCache[key].timestamp) >= CACHE_TTL) {
            delete memoCache[key];
        }
    });
} 