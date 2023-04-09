import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

interface Theme {
  name: string;
  image: string;
  text_color: string;
  info_text_color: string;
  button_color: string;
  input_color: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private localStorageService: LocalStorageService) {}

  private availableThemes: Theme[] = [
    {
      name: '사과',
      image: 'assets/images/apple.png',
      text_color: 'text-red-500',
      info_text_color: 'text-slate-600',
      button_color: 'bg-red-400 text-white',
      input_color: 'border-red-400 focus:border-rose-600',
    },
  ];

  getTheme(): Theme {
    let theme: number = this.localStorageService.getLocalStorageItem(
      'theme'
    ) as number;

    if (!theme) {
      this.localStorageService.setLocalStorageItem('theme', 0);
      theme = 0;
    }

    return this.availableThemes[theme];
  }
}
