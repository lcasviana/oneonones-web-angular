import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OneononeDeleteDialog } from './components/oneonone-dialog/oneonone-delete-dialog/oneonone-delete-dialog.component';
import { OneononeInsertDialog } from './components/oneonone-dialog/oneonone-insert-dialog/oneonone-insert-dialog.component';
import { OneononeUpdateDialog } from './components/oneonone-dialog/oneonone-update-dialog/oneonone-update-dialog.component';
import { OneononeListItemComponent } from './components/oneonone-list-item/oneonone-list-item.component';
import { OneononeListComponent } from './components/oneonone-list/oneonone-list.component';
import { OneononeMeetingDeleteDialog } from './components/oneonone-meeting-dialog/oneonone-meeting-delete-dialog/oneonone-meeting-delete-dialog.component';
import { OneononeMeetingInsertDialog } from './components/oneonone-meeting-dialog/oneonone-meeting-insert-dialog/oneonone-meeting-insert-dialog.component';
import { OneononeMeetingUpdateDialog } from './components/oneonone-meeting-dialog/oneonone-meeting-update-dialog/oneonone-meeting-update-dialog.component';
import { OneononeMeetingListItemComponent } from './components/oneonone-meeting-list-item/oneonone-meeting-list-item.component';
import { OneononeMeetingListComponent } from './components/oneonone-meeting-list/oneonone-meeting-list.component';
import { OneononeMeetingComponent } from './components/oneonone-meeting/oneonone-meeting.component';
import { OneononeComponent } from './components/oneonone/oneonone.component';
import { DashboardRepository } from './data/dashboard.repository';
import { EmployeeRepository } from './data/employee.repository';
import { MeetingRepository } from './data/meeting.repository';
import { OneononeRepository } from './data/oneonone.repository';
import { OneononeRoutingModule } from './oneonone-routing.module';
import { OneononeFrequencyPipe } from './pipes/oneonone-frequency.pipe';
import { DashboardState } from './services/dashboard-state.service';
import { EmployeeState } from './services/employee-state.service';

@NgModule({
  declarations: [
    OneononeFrequencyPipe,
    OneononeComponent,
    OneononeListComponent,
    OneononeListItemComponent,
    OneononeDeleteDialog,
    OneononeInsertDialog,
    OneononeUpdateDialog,
    OneononeMeetingComponent,
    OneononeMeetingListComponent,
    OneononeMeetingListItemComponent,
    OneononeMeetingDeleteDialog,
    OneononeMeetingInsertDialog,
    OneononeMeetingUpdateDialog,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OneononeRoutingModule,
    SharedModule,
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