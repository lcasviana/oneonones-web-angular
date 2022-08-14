import { EmployeeModel } from './employee.model';

export class MeetingInsert {
  constructor(
    public leaderId: string,
    public ledId: string,
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}

export class MeetingUpdate {
  constructor(
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}

export class MeetingOutput {
  constructor(
    public id: string,
    public leader: EmployeeModel,
    public led: EmployeeModel,
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}

export class MeetingModel {
  constructor(
    public id: string,
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}