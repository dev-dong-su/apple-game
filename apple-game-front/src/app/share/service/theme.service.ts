import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

interface Theme {
  name: string;
  logo: string;
  image: string;
  text_color: string;
  info_text_color: string;
  button_color: string;
  background_color: string;
  input_color: string;
  main_color: string;
  gameTextColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private localStorageService: LocalStorageService) {}

  private availableThemes: Theme[] = [
    {
      name: '사과',
      logo: 'assets/images/logo.png',
      image: 'assets/images/apple.png',
      text_color: 'text-red-500',
      info_text_color: 'text-slate-600',
      button_color: 'bg-red-400 text-white',
      background_color: 'bg-amber-100',
      main_color: 'bg-amber-50',
      gameTextColor: 'white',
      input_color: 'border-red-400 focus:border-rose-600',
    },
    {
      name: '포도',
      logo: 'assets/images/logo2.png',
      image: 'assets/images/grape.png',
      text_color: 'text-violet-400',
      info_text_color: 'text-violet-950',
      button_color: 'bg-violet-400 text-violet-50',
      background_color: 'bg-purple-200',
      main_color: 'bg-purple-50',
      gameTextColor: 'text-violet-950',
      input_color: 'border-purple-400 focus-purple-600',
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

  isMobileDevice(): boolean {
    const userAgent = window.navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(userAgent);
  }
}
