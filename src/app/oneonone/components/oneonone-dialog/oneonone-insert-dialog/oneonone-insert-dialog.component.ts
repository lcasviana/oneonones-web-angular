import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { EmployeeModel } from 'src/app/oneonone/models/employee.model';
import { Frequency } from 'src/app/oneonone/models/frequency.enum';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';
import { EmployeeState } from 'src/app/oneonone/services/employee-state.service';

@Component({
  templateUrl: './oneonone-insert-dialog.component.html',
})
export class OneononeInsertDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  form: FormGroup;

  employee: EmployeeModel;
  employees: EmployeeModel[];
  frequencies: number[];

  constructor(
    private dialog: MatDialogRef<OneononeInsertDialog>,
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private employeeState: EmployeeState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.form = new FormGroup({
      isLeader: new FormControl<boolean | null>(null, [Validators.required]),
      coworker: new FormControl<EmployeeModel | null>(null, [Validators.required]),
      frequency: new FormControl<Frequency | null>(null, [Validators.required]),
    });

    this.employee = this.employeeState.employee!;
    this.employees = this.employeeState.employees!;
    this.frequencies = Frequency.values;
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

  insertOneonone(): void {
    if (this.form.invalid) return;

    const leaderId = this.form.get('isLeader')?.value ? this.form.get('coworker')?.value.id : this.employee.id;
    const ledId = this.form.get('isLeader')?.value ? this.employee.id : this.form.get('coworker')?.value.id;
    const frequency = this.form.get('frequency')?.value;

    this.oneononeRepository.insert({ leaderId, ledId, frequency })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('One-on-one inserted.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error inserting one-on-one.', 'OK'),
      });
  }
}