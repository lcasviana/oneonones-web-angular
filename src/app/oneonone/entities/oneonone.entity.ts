import { EmployeeEntity } from './employee.entity';
import { MeetingEntity } from './meeting.entity';
import { StatusEntity } from './status.entity';

export class OneononeInsert {
  constructor(
    public leaderId: string,
    public ledId: string,
    public frequency: number,
  ) { }
}

export class OneononeUpdate {
  constructor(
    public frequency: number,
  ) { }
}

export class OneononeOutput {
  constructor(
    public id: string,
    public leader: EmployeeEntity,
    public led: EmployeeEntity,
    public frequency: number,
  ) { }
}

export class OneononeEntity {
  constructor(
    public id: string,
    public leader: EmployeeEntity,
    public led: EmployeeEntity,
    public frequency: number,
    public meetings: MeetingEntity[],
    public status: StatusEntity,
  ) { }
}