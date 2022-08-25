import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { EmployeeModel } from 'src/app/oneonone/models/employee.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';
import { EmployeeState } from 'src/app/oneonone/services/employee-state.service';

@Component({
  templateUrl: './oneonone-insert-dialog.component.html',
})
export class OneononeInsertDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  employee: EmployeeModel;
  employees: EmployeeModel[];
  options = [true, false];
  frequencies = [7, 15, 30, 60, 90, 180, 365, 999];

  constructor(
    public dialog: MatDialogRef<OneononeInsertDialog>,
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    public employeeState: EmployeeState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.employee = this.employeeState.employee!;
    this.employees = this.employeeState.employees!;
    this.dialog.disableClose = true;
  }

  close(): void {
    this.dialog.close();
  }

  insertOneonone(isLeader: boolean, coworkerId: string, frequency: number): void {
    const leaderId = isLeader ? coworkerId : this.employee.id;
    const ledId = isLeader ? this.employee.id : coworkerId;
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