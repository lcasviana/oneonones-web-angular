import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MeetingInsert, MeetingOutput, MeetingUpdate } from '../models/meeting.model';

@Injectable()
export class MeetingRepository {
  constructor(private http: HttpClient) { }

  insert(meetingInput: MeetingInsert): Observable<MeetingOutput> {
    return this.http.post<MeetingOutput>(`${environment.oneononeApiUrl}/v1/meetings`, meetingInput);
  }

  update(meetingId: string, meetingInput: MeetingUpdate): Observable<MeetingOutput> {
    return this.http.put<MeetingOutput>(`${environment.oneononeApiUrl}/v1/meetings/${meetingId}`, meetingInput);
  }

  delete(meetingId: string): Observable<void> {
    return this.http.delete<void>(`${environment.oneononeApiUrl}/v1/meetings/${meetingId}`);
  }
}