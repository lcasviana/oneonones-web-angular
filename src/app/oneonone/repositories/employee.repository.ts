import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeEntity, EmployeeInput } from '../entities/employee.entity';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeRepository {
  constructor(private http: HttpClient) { }

  insert(employeeInput: EmployeeInput): Observable<EmployeeEntity> {
    return this.http.post<EmployeeEntity>(`${environment.oneononeApiUrl}/v1/employees`, employeeInput);
  }

  update(employeeId: string, employeeInput: EmployeeInput): Observable<EmployeeEntity> {
    return this.http.put<EmployeeEntity>(`${environment.oneononeApiUrl}/v1/employees/${employeeId}`, employeeInput);
  }

  delete(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${environment.oneononeApiUrl}/v1/employees/${employeeId}`);
  }
}