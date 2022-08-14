import { Component, Input } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { MatDialog } from '@angular/material/dialog';
import { OneononeUpdateDialog } from '../oneonone-dialog/oneonone-update-dialog/oneonone-update-dialog.component';
import { OneononeDeleteDialog } from '../oneonone-dialog/oneonone-delete-dialog/oneonone-delete-dialog.component';

@Component({
  selector: 'app-oneonone-list-item',
  templateUrl: './oneonone-list-item.component.html',
})
export class OneononeListItemComponent {
  @Input() employee: EmployeeModel = null!;
  @Input() oneonone: OneononeModel = null!;

  constructor(public dialog: MatDialog) { }

  updateOneonone(): void {
    this.dialog.open(OneononeUpdateDialog, { data: { oneonone: this.oneonone } });
  }

  deleteOneonone(): void {
    this.dialog.open(OneononeDeleteDialog, { data: { oneonone: this.oneonone } });
  }

  // insertMeeting(): void {
  //   this.dialog.open(OneononeMeetingInsertDialog);
  // }

  

  // insertMeeting(dateString: string, annotation: string) {
  //   const leaderId = this.oneonone.leader.id;
  //   const ledId = this.oneonone.led.id;
  //   const meetingDate = new Date(dateString);
  //   this.meetingRepository.insert({ leaderId, ledId, meetingDate, annotation })
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe({
  //       next: _ => this.snackBar.open('Meeting inserted.', 'OK'),
  //       error: _ => this.snackBar.open('Error inserting meeting.', 'OK'),
  //     });
  // }
}