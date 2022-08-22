import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardModel } from '../models/dashboard.model';

@Injectable()
export class DashboardRepository {
  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(`${environment.oneononeApiUrl}/v1/dashboards/${email}`);
  }
}