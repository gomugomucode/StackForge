interface RateLimitStore {
  tokens: number;
  lastRefill: number;
}

const stores = new Map<string, RateLimitStore>();

/**
 * In-memory Token Bucket Rate Limiter
 * @param key Unique key (IP, User ID, or route token)
 * @param limit Max allowed requests within window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(key: string, limit = 60, windowMs = 60000): { success: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  let record = stores.get(key);

  if (!record) {
    record = { tokens: limit, lastRefill: now };
    stores.set(key, record);
  }

  // Calculate elapsed time and refill tokens proportionally
  const elapsed = now - record.lastRefill;
  if (elapsed > windowMs) {
    record.tokens = limit;
    record.lastRefill = now;
  } else {
    const refillTokens = (elapsed / windowMs) * limit;
    record.tokens = Math.min(limit, record.tokens + refillTokens);
    record.lastRefill = now;
  }

  if (record.tokens >= 1) {
    record.tokens -= 1;
    return {
      success: true,
      remaining: Math.floor(record.tokens),
      resetMs: Math.max(0, windowMs - (now - record.lastRefill)),
    };
  }

  return {
    success: false,
    remaining: 0,
    resetMs: Math.max(0, windowMs - (now - record.lastRefill)),
  };
}
