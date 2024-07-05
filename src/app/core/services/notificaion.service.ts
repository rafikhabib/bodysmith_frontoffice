// notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://127.0.0.1:9090/reclamation/'; // Update with your backend endpoint

  constructor(private http: HttpClient) { }

  getClosedReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
