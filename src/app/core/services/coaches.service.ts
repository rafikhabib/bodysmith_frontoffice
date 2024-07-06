import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private baseUrl = 'http://127.0.0.1:9090/admin/coaches/'; 

  constructor(private http: HttpClient) { }

  getCoaches(): Observable<any[]> {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
        console.error('No auth token found in localStorage');

        return new Observable(observer => {
          observer.error('No auth token found');
          observer.complete();
        });
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    console.log(token);

    console.log('Token:', token);
    console.log('Headers:', headers);

    return this.http.get<any>(this.baseUrl, { headers }).pipe(
      map(response => response.coaches)
    );
  }


  getCoachById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateCoach(id: string, coach: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, coach);
  }

  deleteCoach(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  createCoach(coach: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, coach);
  }
  
  getCoachName(id: string): Observable<string> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('No auth token found'); // Utiliser throwError pour retourner une erreur observable
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>(`${this.baseUrl}${id}`, { headers }).pipe(
      map(response => response.firstName + ' ' + response.lastName) // Combine le prénom et le nom
    );
  }
}
