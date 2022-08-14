import { EmployeeModel } from './employee.model';
import { OneononeModel } from './oneonone.model';

export class DashboardModel {
  constructor(
    public employee: EmployeeModel,
    public oneonones: OneononeModel[],
  ) { }
}