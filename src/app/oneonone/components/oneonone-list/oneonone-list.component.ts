import { Component, Input } from '@angular/core';
import { OneononeModel } from '../../models/oneonone.model';
import { MatDialog } from '@angular/material/dialog';
import { OneononeInsertDialog } from '../oneonone-dialog/oneonone-insert-dialog/oneonone-insert-dialog.component';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-oneonone-list',
  templateUrl: './oneonone-list.component.html',
})
export class OneononeListComponent {
  @Input() employee: EmployeeModel = null!;
  @Input() oneonones: OneononeModel[] = null!;

  constructor(public dialog: MatDialog) { }

  insertOneonone(): void {
    this.dialog.open(OneononeInsertDialog);
  }
}