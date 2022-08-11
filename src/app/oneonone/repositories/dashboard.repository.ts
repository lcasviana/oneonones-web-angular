import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardEntity } from '../entities/dashboard.entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardRepository {
  constructor(private http: HttpClient) { }

  getByEmail(email: string): Observable<DashboardEntity> {
    return this.http.get<DashboardEntity>(`${environment.oneononeApiUrl}/v1/dashboards/${email}`);
  }
}