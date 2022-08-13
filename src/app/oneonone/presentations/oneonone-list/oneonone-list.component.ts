import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { EmployeeEntity } from '../../entities/employee.entity';
import { OneononeEntity } from '../../entities/oneonone.entity';
import { EmployeeRepository } from '../../repositories/employee.repository';
import { OneononeRepository } from '../../repositories/oneonone.repository';

@Component({
  selector: 'app-oneonone-list',
  templateUrl: './oneonone-list.component.html',
})
export class OneononeListComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() employee: EmployeeEntity = null!;
  @Input() oneonones: OneononeEntity[] = null!;

  employees: EmployeeEntity[] = [];

  constructor(
    private employeeRepository: EmployeeRepository,
    private oneononeRepository: OneononeRepository,
  ) { }

  ngOnInit(): void {
    this.employeeRepository.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(employees => this.employees = employees);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  insertOneonone(isLeader: boolean, employeeId: string, frequency: number) {
    const leaderId = isLeader ? employeeId : this.employee.id;
    const ledId = isLeader ? this.employee.id : employeeId;
    this.oneononeRepository.insert({ leaderId, ledId, frequency })
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => alert('Ok'));
  }
}