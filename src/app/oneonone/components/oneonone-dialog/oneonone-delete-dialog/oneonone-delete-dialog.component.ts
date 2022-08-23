import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneononeRepository } from 'src/app/oneonone/data/oneonone.repository';
import { OneononeModel } from 'src/app/oneonone/models/oneonone.model';
import { DashboardState } from 'src/app/oneonone/services/dashboard-state.service';

@Component({
  templateUrl: './oneonone-delete-dialog.component.html',
})
export class OneononeDeleteDialog {
  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  oneonone: OneononeModel;

  constructor(
    public dialog: MatDialogRef<OneononeDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { oneonone: OneononeModel },
    private snackBar: MatSnackBar,
    private dashboardState: DashboardState,
    private oneononeRepository: OneononeRepository,
  ) {
    this.oneonone = data.oneonone;
    this.dialog.disableClose = true;
  }

  close(): void {
    this.dialog.close();
  }

  deleteOneonone(oneononeId: string) {
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