import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OneononeModel } from '../../models/oneonone.model';
import { OneononeMeetingInsertDialog } from '../oneonone-meeting-dialog/oneonone-meeting-insert-dialog/oneonone-meeting-insert-dialog.component';

@Component({
  selector: 'app-oneonone-meeting-list',
  templateUrl: './oneonone-meeting-list.component.html',
})
export class OneononeMeetingListComponent {
  @Input() oneonone: OneononeModel = null!;

  constructor(public dialog: MatDialog) { }

  insertMeeting(): void {
    this.dialog.open(OneononeMeetingInsertDialog);
  }
}