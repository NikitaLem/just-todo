export const setValueToStorage = <T>(key: string, value: T) => {
  try {
    const correctValue = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key, correctValue);
  } catch {
    // noop
  }
};

export const getValueFromStorage = <T>(key: string) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      throw new Error();
    }

    return JSON.parse(value) as T;
  } catch {
    // noop
  }
};
