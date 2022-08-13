import { Component, Input } from '@angular/core';
import { EmployeeEntity } from '../../entities/employee.entity';
import { OneononeEntity } from '../../entities/oneonone.entity';

@Component({
  selector: 'app-oneonone-list',
  templateUrl: './oneonone-list.component.html',
})
export class OneononeListComponent {
  @Input() employee: EmployeeEntity = null!;
  @Input() oneonones: OneononeEntity[] = null!;
}