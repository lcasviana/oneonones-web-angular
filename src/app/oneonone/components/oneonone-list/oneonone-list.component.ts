import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { EmployeeRepository } from '../../data/employee.repository';
import { OneononeRepository } from '../../data/oneonone.repository';

@Component({
  selector: 'app-oneonone-list',
  templateUrl: './oneonone-list.component.html',
})
export class OneononeListComponent implements OnInit, OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() employee: EmployeeModel = null!;
  @Input() oneonones: OneononeModel[] = null!;

  employees: EmployeeModel[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private employeeRepository: EmployeeRepository,
    private oneononeRepository: OneononeRepository,
  ) { }

  ngOnInit(): void {
    this.employeeRepository.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(employees => this.employees = employees.filter(employee => employee.id !== this.employee.id));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  insertOneonone(isLeader: boolean, coworkerId: string, frequency: number) {
    const leaderId = isLeader ? coworkerId : this.employee.id;
    const ledId = isLeader ? this.employee.id : coworkerId;
    this.oneononeRepository.insert({ leaderId, ledId, frequency })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => this.snackBar.open('One-on-one inserted.', 'OK'),
        error: _ => this.snackBar.open('Error inserting one-on-one.', 'OK'),
      });
  }
}