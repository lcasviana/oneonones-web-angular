import { EmployeeEntity } from "./employee.entity";
import { OneononeEntity } from "./oneonone.entity";

export class DashboardEntity {
  employee: EmployeeEntity = null!;
  oneonones: OneononeEntity[] = null!;
}