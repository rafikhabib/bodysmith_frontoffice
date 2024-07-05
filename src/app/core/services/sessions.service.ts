import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private baseUrl = 'http://127.0.0.1:9090/seance'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getSessions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getSessionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateSession(id: string, session: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, session);
  }

  deleteSession(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createSession(session: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, session);
  }
}
