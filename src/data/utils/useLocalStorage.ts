type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
  getItemFromStorage: (key: string, type?: StorageType) => string;
  setItemInStorage: (key: string, value: string, type?: StorageType) => boolean;
  removeItemFromStorage: (key: string, type?: StorageType) => void;
  clearStorage: (type?: StorageType) => void;
};

export const UseStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
    `${type ?? 'session'}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItemFromStorage = (key: string, type?: StorageType): string =>
    isBrowser ? window[storageType(type)][key] : '';

  const setItemInStorage = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItemFromStorage = (key: string, type?: StorageType): void =>
    isBrowser ? window[storageType(type)].removeItem(key) : undefined;

  const clearStorage = (type?: StorageType): void =>
    isBrowser ? window[storageType(type)].clear() : undefined;

  return {
    getItemFromStorage,
    setItemInStorage,
    removeItemFromStorage,
    clearStorage,
  };
};

export default UseStorage;
