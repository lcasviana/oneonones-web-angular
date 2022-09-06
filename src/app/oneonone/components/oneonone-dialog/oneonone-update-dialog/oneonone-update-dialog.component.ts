import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { EmployeeModel } from 'src/app/oneonone/models/employee.model';
import { Frequency } from 'src/app/oneonone/models/frequency.enum';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: './oneonone-update-dialog.component.html',
})
export class OneononeUpdateDialog implements OnDestroy {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  form: FormGroup;

  employee: EmployeeModel;
  oneonone: OneononeModel;
  frequencies: number[];

  constructor(
    public dialog: MatDialogRef<OneononeUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: EmployeeModel, oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.employee = this.data.employee;
    this.oneonone = this.data.oneonone;
    this.frequencies = Frequency.values;
    this.dialog.disableClose = true;

    this.form = new FormGroup({
      frequency: new FormControl<Frequency | null>(this.oneonone.frequency, [Validators.required]),
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

  updateOneonone() {
    if (this.form.invalid) return;

    const oneononeId = this.oneonone.id;
    const frequency = this.form.get('frequency')?.value;

    this.oneononeRepository.update(oneononeId, { frequency })
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: _ => {
          this.dashboardState.update();
          this.snackBar.open('One-on-one updated.', 'OK');
          this.close();
        },
        error: _ => this.snackBar.open('Error updating one-on-one.', 'OK'),
      });
  }
}