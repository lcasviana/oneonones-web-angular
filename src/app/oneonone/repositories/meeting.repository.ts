import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeetingInsert, MeetingOutput, MeetingUpdate } from '../entities/meeting.entity';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

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