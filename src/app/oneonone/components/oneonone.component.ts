import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil, tap } from 'rxjs';
import { DashboardModel } from '../models/dashboard.model';
import { DashboardRepository } from '../data/dashboard.repository';

@Component({
  templateUrl: './oneonone.component.html',
})
export class OneononeComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  dashboard: DashboardModel | null = null;

  constructor(
    private dashboardRepository: DashboardRepository,
  ) { }

  ngOnInit(): void {
    this.dashboardRepository.getByEmail('lucas@viana.br')
      .pipe(
        takeUntil(this.destroyed$),
        tap((dashboard) => console.log(dashboard)),
      ).subscribe((dashboard) => this.dashboard = dashboard);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}