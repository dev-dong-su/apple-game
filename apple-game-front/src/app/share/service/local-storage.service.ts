import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorageItem<T>(key: string, value: T): void {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );
  }

  getLocalStorageItem(key: string) {
    const userData = localStorage.getItem(key);

    if (userData == null) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(userData);
      return parsedValue;
    } catch (error) {
      return userData;
    }
  }

  deleteLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
}
