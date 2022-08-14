import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeetingRepository } from '../../data/meeting.repository';

@Component({

})
export class OneononeMeetingListComponent {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private snackBar: MatSnackBar,
    private meetingRepository: MeetingRepository,
  ) { }

  updateMeeting(meetingId: string, dateString: string, annotation: string) {
    const meetingDate = new Date(dateString);
    this.meetingRepository.update(meetingId, { meetingDate, annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('Meeting updated.', 'OK'),
        error: _ => this.snackBar.open('Error updating meeting.', 'OK'),
      });
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