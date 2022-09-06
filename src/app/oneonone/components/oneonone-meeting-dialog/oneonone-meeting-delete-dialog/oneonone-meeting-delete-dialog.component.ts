import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { MeetingModel } from 'src/app/oneonone/models/meeting.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: 'oneonone-meeting-delete-dialog.component.html'
})

export class OneononeMeetingDeleteDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  meeting: MeetingModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { meeting: MeetingModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private meetingRepository: MeetingRepository,
  ) {
    this.meeting = this.data.meeting;
    this.dialog.disableClose = true;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  close(): void {
    this.dialog.close();
  }

  deleteMeeting() {
    const meetingId = this.meeting.id;

    this.meetingRepository.delete(meetingId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('Meeting deleted.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error deleting meeting.', 'OK'),
      });
  }
}