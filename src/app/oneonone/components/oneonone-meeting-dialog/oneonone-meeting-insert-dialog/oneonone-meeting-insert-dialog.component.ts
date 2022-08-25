import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: 'oneonone-meeting-insert-dialog.component.html'
})

export class OneononeMeetingInsertDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  oneonone: OneononeModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private meetingRepository: MeetingRepository,
  ) {
    this.oneonone = this.data.oneonone;
    this.dialog.disableClose = true;
  }

  close(): void {
    this.dialog.close();
  }

  insertMeeting(dateString: string, annotation: string) {
    const leaderId = this.oneonone.leader.id;
    const ledId = this.oneonone.led.id;
    const meetingDate = new Date(dateString);
    this.meetingRepository.insert({ leaderId, ledId, meetingDate, annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('Meeting inserted.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error inserting meeting.', 'OK'),
      });
  }
}