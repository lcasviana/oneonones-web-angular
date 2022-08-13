import { Component, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { EmployeeEntity } from '../../entities/employee.entity';
import { OneononeEntity } from '../../entities/oneonone.entity';
import { MeetingRepository } from '../../repositories/meeting.repository';
import { OneononeRepository } from '../../repositories/oneonone.repository';

@Component({
  selector: 'app-oneonone-list-item',
  templateUrl: './oneonone-list-item.component.html',
})
export class OneononeListItemComponent implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() employee: EmployeeEntity = null!;
  @Input() oneonone: OneononeEntity = null!;

  constructor(
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
      .subscribe(_ => alert('Ok'));
  }

  deleteOneonone(oneononeId: string) {
    this.oneononeRepository.delete(oneononeId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => alert('Ok'));
  }

  insertMeeting(dateString: string, annotation: string) {
    this.meetingRepository.insert({ leaderId: this.oneonone.leader.id, ledId: this.oneonone.led.id, meetingDate: new Date(dateString), annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => alert('Ok'));
  }

  updateMeeting(meetingId: string, dateString: string, annotation: string) {
    this.meetingRepository.update(meetingId, { meetingDate: new Date(dateString), annotation })
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => alert('Ok'));
  }

  deleteMeeting(meetingId: string) {
    this.meetingRepository.delete(meetingId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => alert('Ok'));
  }
}