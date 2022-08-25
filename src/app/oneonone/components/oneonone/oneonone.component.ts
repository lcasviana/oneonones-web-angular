import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { DashboardModel } from '../../models/dashboard.model';
import { DashboardState } from '../../services/dashboard-state.service';

@Component({
  templateUrl: './oneonone.component.html',
})
export class OneononeComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  dashboard: DashboardModel | null = null;

  constructor(private dashboardState: DashboardState) { }

  ngOnInit(): void {
    this.dashboardState.update();
    this.dashboardState.dashboard$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dashboard => this.dashboard = dashboard);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}