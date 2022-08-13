import { Component, Input } from '@angular/core';
import { EmployeeEntity } from '../../entities/employee.entity';
import { OneononeEntity } from '../../entities/oneonone.entity';

@Component({
  selector: 'app-oneonone-list-item',
  templateUrl: './oneonone-list-item.component.html',
})
export class OneononeListItemComponent {
  @Input() employee: EmployeeEntity = null!;
  @Input() oneonone: OneononeEntity = null!;
}