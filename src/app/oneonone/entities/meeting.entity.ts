import { EmployeeEntity } from "./employee.entity";

export class MeetingInsert {
  leaderId: string = null!;
  ledId: string = null!;
  meetingDate: Date = null!;
  annotation: string | null = null;
}

export class MeetingUpdate {
  meetingDate: Date = null!;
  annotation: string | null = null;
}

export class MeetingOutput {
  id: string = null!;
  leader: EmployeeEntity = null!;
  led: EmployeeEntity = null!;
  meetingDate: Date = null!;
  annotation: string | null = null;
}

export class MeetingEntity {
  id: string = null!;
  meetingDate: Date = null!;
  annotation: string | null = null;
}