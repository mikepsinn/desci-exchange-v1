
import Storage from './Storage'


export const storage = new Storage(window.localStorage, '')

export const getStoragePrefix = (): string => {

  return `_desci_`
}

export const loadFromStorage = <T = unknown>(key: string, prefix = getStoragePrefix()): T | undefined => {
  return storage.getItem(`${prefix}${key}`)
}

export const saveToStorage = <T = unknown>(key: string, value: T): void => {
  storage.setItem<T>(`${getStoragePrefix()}${key}`, value)
}

export const removeFromStorage = (key: string): void => {
  storage.removeItem(`${getStoragePrefix()}${key}`)
}

export const saveToStorageWithExpiry = <T = unknown>(key: string, value: T, expiry: number): void => {
  storage.setWithExpiry<T>(key, value, expiry)
}

export const loadFromStorageWithExpiry = <T = unknown>(key: string): T | undefined => {
  return storage.getWithExpiry<T>(key)
}

export const removeFromStorageWithExpiry = (key: string): void => {
  return storage.removeItem(key)
}
