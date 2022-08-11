import { EmployeeEntity } from "./employee.entity";
import { MeetingEntity } from "./meeting.entity";
import { StatusEntity } from "./status.entity";

export class OneononeInsert {
  leaderId: string = null!;
  ledId: string = null!;
  frequency: number = null!;
}

export class OneononeUpdate {
  frequency: number = null!;
}

export class OneononeOutput {
  id: string = null!;
  leader: EmployeeEntity = null!;
  led: EmployeeEntity = null!;
  frequency: number = null!;
}

export class OneononeEntity {
  id: string = null!;
  leader: EmployeeEntity = null!;
  led: EmployeeEntity = null!;
  frequency: number = null!;
  meetings: MeetingEntity[] = null!;
  status: StatusEntity = null!;
}