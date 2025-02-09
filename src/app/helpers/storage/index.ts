export function saveItem(key: string, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function getItem(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function removeItem(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
