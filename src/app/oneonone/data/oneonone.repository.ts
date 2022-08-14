import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OneononeInsert, OneononeOutput, OneononeUpdate } from '../models/oneonone.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable()
export class OneononeRepository {
  constructor(private http: HttpClient) { }

  insert(oneononeInput: OneononeInsert): Observable<OneononeOutput> {
    return this.http.post<OneononeOutput>(`${environment.oneononeApiUrl}/v1/oneonones`, oneononeInput);
  }

  update(oneononeId: string, oneononeInput: OneononeUpdate): Observable<OneononeOutput> {
    return this.http.put<OneononeOutput>(`${environment.oneononeApiUrl}/v1/oneonones/${oneononeId}`, oneononeInput);
  }

  delete(oneononeId: string): Observable<void> {
    return this.http.delete<void>(`${environment.oneononeApiUrl}/v1/oneonones/${oneononeId}`);
  }
}