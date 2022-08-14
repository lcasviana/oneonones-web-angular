export class EmployeeInput {
  constructor(
    public email: string,
    public name: string,
  ) { }
}

export class EmployeeModel {
  constructor(
    public id: string,
    public email: string,
    public name: string,
  ) { }
}