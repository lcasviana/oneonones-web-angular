import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { MeetingModel } from 'src/app/oneonone/models/meeting.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: 'oneonone-meeting-update-dialog.component.html'
})

export class OneononeMeetingUpdateDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  meeting: MeetingModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { meeting: MeetingModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private meetingRepository: MeetingRepository,
  ) {
    this.meeting = this.data.meeting;
  }

  close(): void {
    this.dialog.close();
  }

  updateMeeting(meetingId: string, dateString: string, annotation: string) {
    const meetingDate = new Date(dateString);
    this.meetingRepository.update(meetingId, { meetingDate, annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('Meeting updated.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error updating meeting.', 'OK'),
      });
  }
}