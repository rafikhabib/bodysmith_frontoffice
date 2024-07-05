import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private baseUrl ='http://localhost:9090/reservation/reserver'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createReservation(reservationData: any): Observable<any> {
    console.log(this.baseUrl);
    console.log(reservationData);
    return this.http.post<any>(this.baseUrl, reservationData);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
  // createReservation(formData: any): Observable<any> {
  //   console.log(formData);
  //   return this.http.post<any>(`${this.baseUrl}/reserver`, formData);
  // }
  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, reservation);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
 

}
