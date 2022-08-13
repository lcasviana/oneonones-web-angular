import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRepository } from './repositories/dashboard.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { MeetingRepository } from './repositories/meeting.repository';
import { OneononeRepository } from './repositories/oneonone.repository';
import { OneononeComponent } from './presentations/oneonone.component';
import { OneononeListComponent } from './presentations/oneonone-list/oneonone-list.component';
import { OneononeListItemComponent } from './presentations/oneonone-list-item/oneonone-list-item.component';
import { MaterialModule } from '../material.module';
import { OneononeFrequencyPipe } from './pipes/oneonone-frequency.pipe';

const routes = [
  { path: '', component: OneononeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class OneononeRoutingModule { }

@NgModule({
  declarations: [
    OneononeFrequencyPipe,
    OneononeComponent,
    OneononeListComponent,
    OneononeListItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OneononeRoutingModule,
    MaterialModule,
  ],
  providers: [
    DashboardRepository,
    EmployeeRepository,
    MeetingRepository,
    OneononeRepository,
  ],
})
export class OneononeModule { }