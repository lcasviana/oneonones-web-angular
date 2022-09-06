import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from 'src/app/oneonone/data/meeting.repository';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: 'oneonone-meeting-insert-dialog.component.html'
})

export class OneononeMeetingInsertDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  form: FormGroup;

  oneonone: OneononeModel;

  constructor(
    public dialog: MatDialogRef<OneononeMeetingInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private meetingRepository: MeetingRepository,
  ) {
    this.form = new FormGroup({
      meetingDate: new FormControl<string | null>(null, [Validators.required]),
      annotation: new FormControl<string | null>(null),
    });

    this.oneonone = this.data.oneonone;
    this.dialog.disableClose = true;
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

  insertMeeting() {
    if (this.form.invalid) return;

    const leaderId = this.oneonone.leader.id;
    const ledId = this.oneonone.led.id;
    const meetingDate = new Date(this.form.get('meetingDate')?.value);
    const annotation = this.form.get('annotation')?.value;

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