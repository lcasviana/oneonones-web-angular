import { EmployeeEntity } from './employee.entity';
import { OneononeEntity } from './oneonone.entity';

export class DashboardEntity {
  constructor(
    public employee: EmployeeEntity,
    public oneonones: OneononeEntity[],
  ) { }
}