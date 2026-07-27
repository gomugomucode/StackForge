export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogPayload {
  message: string;
  level?: LogLevel;
  userId?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  error?: unknown;
}

function redactSensitiveData(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(redactSensitiveData);

  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (/password|secret|token|authorization|cookie|key/i.test(key)) {
      redacted[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactSensitiveData(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

export const logger = {
  log(payload: LogPayload) {
    const level = payload.level || 'info';
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message: payload.message,
      userId: payload.userId || null,
      action: payload.action || null,
      entityType: payload.entityType || null,
      entityId: payload.entityId || null,
      metadata: payload.metadata ? redactSensitiveData(payload.metadata) : undefined,
      error: payload.error instanceof Error ? { name: payload.error.name, message: payload.error.message, stack: payload.error.stack } : payload.error,
    };

    const formatted = JSON.stringify(entry);

    switch (level) {
      case 'error':
        console.error(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'debug':
        console.debug(formatted);
        break;
      default:
        console.log(formatted);
        break;
    }
  },

  info(message: string, metadata?: Record<string, unknown>) {
    this.log({ message, level: 'info', metadata });
  },

  warn(message: string, metadata?: Record<string, unknown>) {
    this.log({ message, level: 'warn', metadata });
  },

  error(message: string, error?: unknown, metadata?: Record<string, unknown>) {
    this.log({ message, level: 'error', error, metadata });
  },

  audit(userId: string, action: string, entityType: string, entityId?: string, metadata?: Record<string, unknown>) {
    this.log({
      message: `[AUDIT] User ${userId} performed ${action} on ${entityType}${entityId ? `:${entityId}` : ''}`,
      level: 'info',
      userId,
      action,
      entityType,
      entityId,
      metadata,
    });
  },
};
