import { EmployeeEntity } from './employee.entity';

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
    public leader: EmployeeEntity,
    public led: EmployeeEntity,
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}

export class MeetingEntity {
  constructor(
    public id: string,
    public meetingDate: Date,
    public annotation: string | null = null,
  ) { }
}