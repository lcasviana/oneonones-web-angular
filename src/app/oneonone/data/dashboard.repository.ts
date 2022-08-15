import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardModel } from '../models/dashboard.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardRepository {
  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(`${environment.oneononeApiUrl}/v1/dashboards/${email}`);
  }
}