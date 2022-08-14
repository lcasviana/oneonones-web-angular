import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel, EmployeeInput } from '../models/employee.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeRepository {
  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${environment.oneononeApiUrl}/v1/employees`);
  }

  insert(employeeInput: EmployeeInput): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.oneononeApiUrl}/v1/employees`, employeeInput);
  }

  update(employeeId: string, employeeInput: EmployeeInput): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(`${environment.oneononeApiUrl}/v1/employees/${employeeId}`, employeeInput);
  }

  delete(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${environment.oneononeApiUrl}/v1/employees/${employeeId}`);
  }
}