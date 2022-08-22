import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  readonly theme$: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('activeTheme') || 'theme-light');

  switchTheme(isDarkMode: boolean) {
    const currentTheme = isDarkMode ? 'theme-dark' : 'theme-light';
    this.theme$.next(currentTheme);
    localStorage.setItem('activeTheme', currentTheme);
  }
}