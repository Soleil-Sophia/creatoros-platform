// ─── StorageProvider interface ────────────────────────────────────────────────
// Abstraktion über Storage-Backends. Heute: LocalStorage + Memory.
// Später: Supabase, Postgres — selber Contract, anderer Provider.

export interface StorageProvider<T> {
  get(key: string): T | null;
  /** Returns true if the write completed, false if it could not be completed. */
  set(key: string, value: T): boolean;
  delete(key: string): void;
  list(): T[];
  clear(): void;
  readonly providerName: string;
}

// ─── LocalStorageProvider ────────────────────────────────────────────────────
// Stores a Map<key, T> as a JSON object under a single localStorage key.

export class LocalStorageProvider<T> implements StorageProvider<T> {
  readonly providerName = 'LocalStorageProvider';

  constructor(
    private readonly storageKey: string,
    private readonly guard?: (v: unknown) => v is T,
  ) {}

  private readAll(): Map<string, T> {
    if (typeof window === 'undefined') return new Map();
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return new Map();
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (typeof parsed !== 'object' || !parsed || Array.isArray(parsed)) return new Map();
      const map = new Map<string, T>();
      for (const [k, v] of Object.entries(parsed)) {
        if (!this.guard || this.guard(v)) map.set(k, v as T);
      }
      return map;
    } catch {
      return new Map();
    }
  }

  private writeAll(map: Map<string, T>): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const obj: Record<string, T> = {};
      for (const [k, v] of map) obj[k] = v;
      window.localStorage.setItem(this.storageKey, JSON.stringify(obj));
      return true;
    } catch {
      // quota / serialization error — reported to the caller, not swallowed
      return false;
    }
  }

  get(key: string): T | null {
    return this.readAll().get(key) ?? null;
  }

  set(key: string, value: T): boolean {
    const map = this.readAll();
    map.set(key, value);
    return this.writeAll(map);
  }

  delete(key: string): void {
    const map = this.readAll();
    map.delete(key);
    this.writeAll(map);
  }

  list(): T[] {
    return Array.from(this.readAll().values());
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    try { window.localStorage.removeItem(this.storageKey); } catch { /* ignore */ }
  }
}

// ─── MemoryProvider ───────────────────────────────────────────────────────────
// In-process Map — ephemeral, deterministic, zero I/O. Use in tests & bootstrap.

export class MemoryProvider<T> implements StorageProvider<T> {
  readonly providerName = 'MemoryProvider';
  private readonly store = new Map<string, T>();

  get(key: string): T | null   { return this.store.get(key) ?? null; }
  set(key: string, value: T)   { this.store.set(key, value); return true; }
  delete(key: string)          { this.store.delete(key); }
  list(): T[]                  { return Array.from(this.store.values()); }
  clear()                      { this.store.clear(); }
}
