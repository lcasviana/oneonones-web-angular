import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { EmployeeModel } from 'src/app/oneonone/models/employee.model';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: './oneonone-delete-dialog.component.html',
})
export class OneononeDeleteDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  employee: EmployeeModel;
  oneonone: OneononeModel;

  constructor(
    public dialog: MatDialogRef<OneononeDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: EmployeeModel, oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.employee = this.data.employee;
    this.oneonone = data.oneonone;
    this.dialog.disableClose = true;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  close(): void {
    this.dialog.close();
  }

  deleteOneonone() {
    const oneononeId = this.oneonone.id;

    this.oneononeRepository.delete(oneononeId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('One-on-one deleted.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error deleting one-on-one.', 'OK'),
      });
  }
}