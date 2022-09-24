import { LS_NAMESPACE, LS_SEPARATOR } from '../constants'

type BrowserStorage = typeof localStorage | typeof sessionStorage

type ItemWithExpiry<T> = {
  value: T
  expiry: number
}

const DEFAULT_PREFIX = `${LS_NAMESPACE}${LS_SEPARATOR}`

class Storage {
  private prefix: string
  private storage: BrowserStorage

  constructor(storage: BrowserStorage, prefix = DEFAULT_PREFIX) {
    this.prefix = prefix
    this.storage = storage
  }

  private prefixKey = (key: string): string => {
    return `${this.prefix}${key}`
  }

  public getItem = <T>(key: string): T | undefined | any => {
    const fullKey = this.prefixKey(key)
    let saved: string | null = null
    try {
      saved = this.storage.getItem(fullKey)
    } catch (err) {
      console.error(`Error getting item with key ${key}`, err)
    }

    if (!saved || saved === 'undefined') return

    try {
      return JSON.parse(saved) as T
    } catch (err) {
      console.error(`Error parsing saved data for key ${key}`, err)
    }
  }

  public setItem = <T>(key: string, item: T): void => {
    const fullKey = this.prefixKey(key)
    try {
      this.storage.setItem(fullKey, JSON.stringify(item))
    } catch (err) {
      console.error(`Error saving item with key ${key}`, err)
    }
  }

  public removeItem = (key: string): void => {
    const fullKey = this.prefixKey(key)
    try {
      this.storage.removeItem(fullKey)
    } catch (err) {
      console.error(`Error removing item with key ${key}`, err)
    }
  }

  public removeMatching = (pattern: RegExp): void => {
    Object.keys(this.storage)
      .filter((key) => pattern.test(key))
      .forEach((key) => this.storage.removeItem(key))
  }

  public setWithExpiry = <T>(key: string, item: T, expiry: number): void => {
    this.setItem<ItemWithExpiry<T>>(key, {
      value: item,
      expiry: new Date().getTime() + expiry,
    })
  }

  public getWithExpiry = <T>(key: string): T | undefined => {
    const item = this.getItem<ItemWithExpiry<T>>(key)
    if (!item) {
      return
    }

    if (new Date().getTime() > item.expiry) {
      this.removeItem(key)
      return
    }

    return item.value
  }
}

export default Storage
