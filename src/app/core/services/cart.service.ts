import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlCart: string = 'http://localhost:9090/panier';

  constructor(private http: HttpClient) {}

  fetchCart(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrlCart}/consulter/${userId}`);
  }

  addToCart(produitId: any, userId: any, quantity: any): Observable<any> {
    const body = (() => {
      return {
        produitId: produitId,
        userId: userId,
        quantity: quantity
      };
    })();

    return this.http.post<any>(`${this.apiUrlCart}/ajouter`, body);
  }

  removeFromCart(produitId: any, userId: any, quantity: any): Observable<any> {
    const body = (() => {
      return {
        produitId: produitId,
        userId: userId,
        quantity: quantity
      };
    })();

    return this.http.post<any>(`${this.apiUrlCart}/retirer`, body);
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlCart}/ajouter`, { productId, quantity });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCart}/supprimer/${userId}`);
  }

  validateCart(): Observable<any> {
    return this.http.post<any>(`${this.apiUrlCart}/valider`, {});
  }
}
