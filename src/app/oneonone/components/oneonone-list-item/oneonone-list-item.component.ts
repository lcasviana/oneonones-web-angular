import { Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { MeetingRepository } from '../../data/meeting.repository';
import { OneononeRepository } from '../../data/oneonone.repository';

@Component({
  selector: 'app-oneonone-list-item',
  templateUrl: './oneonone-list-item.component.html',
})
export class OneononeListItemComponent implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() employee: EmployeeModel = null!;
  @Input() oneonone: OneononeModel = null!;

  constructor(
    private snackBar: MatSnackBar,
    private oneononeRepository: OneononeRepository,
    private meetingRepository: MeetingRepository,
  ) { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  updateOneonone(oneononeId: string, frequency: number) {
    this.oneononeRepository.update(oneononeId, { frequency })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('One-on-one updated.', 'OK'),
        error: _ => this.snackBar.open('Error updating one-on-one.', 'OK'),
      });
  }

  deleteOneonone(oneononeId: string) {
    this.oneononeRepository.delete(oneononeId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('One-on-one deleted.', 'OK'),
        error: _ => this.snackBar.open('Error deleting one-on-one.', 'OK'),
      });
  }

  insertMeeting(dateString: string, annotation: string) {
    const leaderId = this.oneonone.leader.id;
    const ledId = this.oneonone.led.id;
    const meetingDate = new Date(dateString);
    this.meetingRepository.insert({ leaderId, ledId, meetingDate, annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('Meeting inserted.', 'OK'),
        error: _ => this.snackBar.open('Error inserting meeting.', 'OK'),
      });
  }
}