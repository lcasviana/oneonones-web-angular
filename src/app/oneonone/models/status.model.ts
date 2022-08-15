export class StatusModel {
  constructor(
    public lastMeeting: Date | null = null,
    public nextMeeting: Date | null = null,
    public isLate: boolean | null = null,
  ) { }
}