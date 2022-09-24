type BrowserStorage = typeof localStorage | typeof sessionStorage;

type ItemWithExpiry<T> = {
  value: T;
  expiry: number;
};

const DEFAULT_PREFIX = `_connect_`;

class Storage {
  private readonly prefix: string;
  private storage: BrowserStorage;

  constructor(storage: BrowserStorage, prefix = DEFAULT_PREFIX) {
    this.prefix = prefix;
    this.storage = storage;
  }

  public getItem = <T>(key: string): any => {
    const fullKey = this.prefixKey(key);
    let saved: string | null = null;
    try {
      saved = this.storage.getItem(fullKey);
    } catch (err) {
      console.error(`key ${key}`, err);
    }

    if (!saved || saved === 'undefined') return;

    try {
      return JSON.parse(saved) as T;
    } catch (err) {
      console.error(`key ${key}`, err);
    }
  };

  public setItem = <T>(key: string, item: T): void => {
    const fullKey = this.prefixKey(key);
    try {
      this.storage.setItem(fullKey, JSON.stringify(item));
    } catch (err) {
      console.error(`key ${key}`, err);
    }
  };

  public removeItem = (key: string): void => {
    const fullKey = this.prefixKey(key);
    try {
      this.storage.removeItem(fullKey);
    } catch (err) {
      console.error(`key ${key}`, err);
    }
  };

  public removeMatching = (pattern: RegExp): void => {
    Object.keys(this.storage)
      .filter((key) => pattern.test(key))
      .forEach((key) => this.storage.removeItem(key));
  };

  public setWithExpiry = <T>(key: string, item: T, expiry: number): void => {
    this.setItem<ItemWithExpiry<T>>(key, {
      value: item,
      expiry: new Date().getTime() + expiry,
    });
  };

  public getWithExpiry = <T>(key: string): T | undefined => {
    const item = this.getItem<ItemWithExpiry<T>>(key);
    if (!item) {
      return;
    }

    if (new Date().getTime() > item.expiry) {
      this.removeItem(key);
      return;
    }

    return item.value;
  };

  private prefixKey = (key: string): string => {
    return `${this.prefix}${key}`;
  };
}

export default Storage;
