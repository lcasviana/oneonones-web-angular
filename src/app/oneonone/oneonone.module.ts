import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRepository } from './repositories/dashboard.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { MeetingRepository } from './repositories/meeting.repository';
import { OneononeRepository } from './repositories/oneonone.repository';
import { OneononeComponent } from './views/oneonone.component';

const routes = [
  {
    path: '',
    component: OneononeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class OneononeRoutingModule { }

@NgModule({
  declarations: [
    OneononeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OneononeRoutingModule,
  ],
  providers: [
    DashboardRepository,
    EmployeeRepository,
    MeetingRepository,
    OneononeRepository,
  ],
})
export class OneononeModule { }