import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})

export class ShellComponent {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private currentTheme = 'theme-light';
  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(theme => this.currentTheme = theme);
  }

  switchTheme({ checked }: MatSlideToggleChange) {
    this.themeService.switchTheme(checked);
  }
}