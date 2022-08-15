import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { DashboardRepository } from 'src/app/oneonone/data/dashboard.repository';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: './oneonone-update-dialog.component.html',
})
export class OneononeUpdateDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  oneonone: OneononeModel;
  frequencies = [7, 15, 30, 60, 90, 180, 365, 999];

  constructor(
    public dialog: MatDialogRef<OneononeUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.oneonone = data.oneonone;
  }

  close(): void {
    this.dialog.close();
  }

  updateOneonone(oneononeId: string, frequency: number) {
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