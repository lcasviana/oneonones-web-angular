import { EmployeeModel } from './employee.model';
import { Frequency } from './frequency.enum';
import { MeetingModel } from './meeting.model';
import { StatusModel } from './status.model';

export class OneononeInsert {
  constructor(
    public leaderId: string,
    public ledId: string,
    public frequency: Frequency,
  ) { }
}

export class OneononeUpdate {
  constructor(
    public frequency: Frequency,
  ) { }
}

export class OneononeOutput {
  constructor(
    public id: string,
    public leader: EmployeeModel,
    public led: EmployeeModel,
    public frequency: Frequency,
  ) { }
}

export class OneononeModel {
  constructor(
    public id: string,
    public leader: EmployeeModel,
    public led: EmployeeModel,
    public frequency: number,
    public meetings: MeetingModel[],
    public status: StatusModel,
  ) { }
}