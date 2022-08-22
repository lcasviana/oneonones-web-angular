import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EmployeeInput, EmployeeModel } from '../models/employee.model';

@Injectable()
export class EmployeeRepository {
  constructor(private http: HttpClient) { }

  obtainAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${environment.oneononeApiUrl}/v1/employees`);
  }

  obtainById(employeeId: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${environment.oneononeApiUrl}/v1/employees/${employeeId}`);
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