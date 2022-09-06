import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { MeetingModel } from 'src/app/oneonone/models/meeting.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: 'oneonone-meeting-update-dialog.component.html'
})

export class OneononeMeetingUpdateDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  form: FormGroup;

  meeting: MeetingModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { meeting: MeetingModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private meetingRepository: MeetingRepository,
  ) {
    this.meeting = this.data.meeting;
    this.dialog.disableClose = true;

    this.form = new FormGroup({
      meetingDate: new FormControl<string | null>(new Date(this.meeting.meetingDate).toISOString(), [Validators.required]),
      annotation: new FormControl<string | null>(this.meeting.annotation),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  close(): void {
    this.dialog.close();
  }

  clear(): void {
    this.form.reset();
  }

  updateMeeting() {
    if (this.form.invalid) return;

    const meetingId = this.meeting.id;
    const meetingDate = new Date(this.form.get('meetingDate')?.value);
    const annotation = this.form.get('annotation')?.value;

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