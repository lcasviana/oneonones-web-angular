import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { DashboardRepository } from '../data/dashboard.repository';
import { DashboardModel } from '../models/dashboard.model';
import { EmployeeState } from './employee-state.service';

@Injectable()
export class DashboardState {
  private readonly _dashboard: BehaviorSubject<DashboardModel | null> = new BehaviorSubject<DashboardModel | null>(null);
  readonly dashboard$: Observable<DashboardModel | null> = this._dashboard.asObservable();

  constructor(
    private dashboardRepository: DashboardRepository,
    private employeeState: EmployeeState,
  ) { }

  private get dashboard(): DashboardModel | null {
    return this._dashboard.getValue();
  }

  private set dashboard(dashboard: DashboardModel | null) {
    this._dashboard.next(dashboard);
  }

  update(): void {
    this.employeeState.initialize().pipe(
      mergeMap(_ => this.dashboardRepository.getByEmail(this.employeeState.employee!.email)),
      tap(dashboard => console.log(dashboard)),
    ).subscribe(dashboard => this.dashboard = dashboard);
  }
}