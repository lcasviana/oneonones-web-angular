import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardRepository } from './data/dashboard.repository';
import { EmployeeRepository } from './data/employee.repository';
import { MeetingRepository } from './data/meeting.repository';
import { OneononeRepository } from './data/oneonone.repository';
import { OneononeComponent } from './components/oneonone.component';
import { OneononeListComponent } from './components/oneonone-list/oneonone-list.component';
import { OneononeListItemComponent } from './components/oneonone-list-item/oneonone-list-item.component';
import { MaterialModule } from '../material.module';
import { OneononeFrequencyPipe } from './pipes/oneonone-frequency.pipe';
import { DashboardState } from './services/dashboard-state.service';
import { EmployeeState } from './services/employee-state.service';
import { OneononeInsertDialog } from './components/oneonone-dialog/oneonone-insert-dialog/oneonone-insert-dialog.component';
import { OneononeDeleteDialog } from './components/oneonone-dialog/oneonone-delete-dialog/oneonone-delete-dialog.component';
import { OneononeUpdateDialog } from './components/oneonone-dialog/oneonone-update-dialog/oneonone-update-dialog.component';

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
    OneononeDeleteDialog,
    OneononeInsertDialog,
    OneononeUpdateDialog,
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
    DashboardState,
    EmployeeState,
  ],
})
export class OneononeModule { }