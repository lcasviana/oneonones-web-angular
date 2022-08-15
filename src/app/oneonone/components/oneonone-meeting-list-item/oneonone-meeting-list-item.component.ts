import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingModel } from '../../models/meeting.model';
import { OneononeMeetingDeleteDialog } from '../oneonone-meeting-dialog/oneonone-meeting-delete-dialog/oneonone-meeting-delete-dialog.component';
import { OneononeMeetingUpdateDialog } from '../oneonone-meeting-dialog/oneonone-meeting-update-dialog/oneonone-meeting-update-dialog.component';

@Component({
  selector: 'app-oneonone-meeting-list-item',
  templateUrl: 'oneonone-meeting-list-item.component.html'
})

export class OneononeMeetingListItemComponent {
  @Input() meeting: MeetingModel = null!;

  constructor(private dialog: MatDialog) { }

  updateMeeting(): void {
    this.dialog.open(OneononeMeetingUpdateDialog, { data: { meeting: this.meeting } });
  }

  deleteMeeting(): void {
    this.dialog.open(OneononeMeetingDeleteDialog, { data: { meeting: this.meeting } });
  }
}