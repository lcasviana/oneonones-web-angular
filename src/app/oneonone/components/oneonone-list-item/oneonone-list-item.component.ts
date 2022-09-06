import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../models/employee.model';
import { OneononeModel } from '../../models/oneonone.model';
import { OneononeDeleteDialog } from '../oneonone-dialog/oneonone-delete-dialog/oneonone-delete-dialog.component';
import { OneononeUpdateDialog } from '../oneonone-dialog/oneonone-update-dialog/oneonone-update-dialog.component';

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
    this.dialog.open(OneononeUpdateDialog, { data: { employee: this.employee, oneonone: this.oneonone } });
  }

  deleteOneonone(): void {
    this.dialog.open(OneononeDeleteDialog, { data: { employee: this.employee, oneonone: this.oneonone } });
  }

  meetings(): void {
    this.router.navigateByUrl(`/${this.oneonone.id}`);
  }
}