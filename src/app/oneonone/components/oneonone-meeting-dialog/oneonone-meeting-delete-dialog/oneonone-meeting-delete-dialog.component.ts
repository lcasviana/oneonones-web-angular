import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { MeetingModel } from 'src/app/oneonone/models/meeting.model';

@Component({
  templateUrl: 'oneonone-meeting-delete-dialog.component.html'
})

export class OneononeMeetingDeleteDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  meeting: MeetingModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { meeting: MeetingModel },
    private snackBar: MatSnackBar,
    private meetingRepository: MeetingRepository,
  ) {
    this.meeting = this.data.meeting;
  }

  deleteMeeting(meetingId: string) {
    this.meetingRepository.delete(meetingId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('Meeting deleted.', 'OK'),
        error: _ => this.snackBar.open('Error deleting meeting.', 'OK'),
      });
  }
}