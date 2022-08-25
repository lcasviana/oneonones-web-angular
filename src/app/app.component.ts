import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private currentTheme = 'theme-light';
  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.theme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.renderer.setAttribute(this.document.body, 'class', theme);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
