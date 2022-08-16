import { Component, Input } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { MatDialog } from '@angular/material/dialog';
import { OneononeUpdateDialog } from '../oneonone-dialog/oneonone-update-dialog/oneonone-update-dialog.component';
import { OneononeDeleteDialog } from '../oneonone-dialog/oneonone-delete-dialog/oneonone-delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oneonone-list-item',
  templateUrl: './oneonone-list-item.component.html',
})
export class OneononeListItemComponent {
  @Input() employee: EmployeeModel = null!;
  @Input() oneonone: OneononeModel = null!;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }

  updateOneonone(): void {
    this.dialog.open(OneononeUpdateDialog, { data: { oneonone: this.oneonone } });
  }

  deleteOneonone(): void {
    this.dialog.open(OneononeDeleteDialog, { data: { oneonone: this.oneonone } });
  }

  meetings(): void {
    this.router.navigateByUrl(`/${this.oneonone.id}`);
  }
}