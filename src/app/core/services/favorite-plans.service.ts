import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:9090/favorites'; // Adjust the URL as needed

  constructor(private http: HttpClient, private auth: AuthService) {}
  addFavorite(plats: string[], totalCalories: number): Observable<any> {
    const userId = this.auth.currentUserValue._id;
    const platsString = JSON.stringify(plats); // Stringify the plats array
    return this.http.post(this.apiUrl, {
      userId,
      plats: platsString,
      totalCalories,
    });
  }

  getFavorites(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  removeFavorite(favoriteId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${favoriteId}`);
  }
}
