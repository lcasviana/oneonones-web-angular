import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, ReplaySubject, takeUntil, tap } from 'rxjs';
import { DashboardModel } from '../../models/dashboard.model';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { DashboardState } from '../../services/dashboard-state.service';

@Component({
  templateUrl: './oneonone-meeting.component.html',
})
export class OneononeMeetingComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private dashboard: DashboardModel | null = null;

  employee: EmployeeModel | null = null;
  oneonone: OneononeModel | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dashboardState: DashboardState,
  ) { }

  ngOnInit(): void {
    this.dashboardState.update();
    this.dashboardState.dashboard$
      .pipe(
        takeUntil(this.destroyed$),
        tap((dashboard) => this.dashboard = dashboard),
        mergeMap(_ => this.activatedRoute.params),
      ).subscribe(params => {
        const id = params['id'];
        this.employee = this.dashboard?.employee ?? null;
        this.oneonone = this.dashboard?.oneonones.find(ononone => ononone.id === id) ?? null;
        if (!this.employee || !this.oneonone) this.router.navigateByUrl(`/`);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}