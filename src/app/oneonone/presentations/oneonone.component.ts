import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardEntity } from '../entities/dashboard.entity';
import { DashboardRepository } from '../repositories/dashboard.repository';

@Component({
  templateUrl: './oneonone.component.html',
})
export class OneononeComponent implements OnInit, OnDestroy {
  private dashboardGetByEmailSubscription: Subscription | undefined;

  dashboard: DashboardEntity | null = null;

  constructor(private dashboardRepository: DashboardRepository) { }

  ngOnInit(): void {
    this.dashboardGetByEmailSubscription =
      this.dashboardRepository.getByEmail('lucas@viana.br')
        .subscribe((dashboard) => {
          console.log(dashboard);
          this.dashboard = dashboard;
        });
  }

  ngOnDestroy(): void {
    this.dashboardGetByEmailSubscription?.unsubscribe();
  }
}