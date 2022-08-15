import { Injectable } from "@angular/core";
import { mergeMap, Observable, tap } from "rxjs";
import { EmployeeRepository } from "../data/employee.repository";
import { EmployeeModel } from "../models/employee.model";

@Injectable()
export class EmployeeState {
  employee: EmployeeModel | null = null;
  employees: EmployeeModel[] | null = null;

  constructor(private employeeRepository: EmployeeRepository) { }

  initialize(): Observable<EmployeeModel[]> {
    return this.employeeRepository.obtainById('8b46e0bb-c1ce-45d9-a624-27426b51d7ee').pipe(
      tap(employee => this.employee = employee),
      mergeMap(_ => this.employeeRepository.obtainAll()
        .pipe(tap(employees => this.employees = employees.filter(employee => this.employee!.id !== employee.id)))),
    );
  }
}