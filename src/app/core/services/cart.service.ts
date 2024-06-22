import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrlCart: string = 'http://localhost:3000/cart';
  private cart: Product[] = [];
  cart$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.fetchCart();
  }

  private fetchCart(): void {
    this.http.get<Product[]>(this.apiUrlCart).subscribe(cart => {
      this.cart = cart;
      this.cart$.next(this.cart);
    });
  }

  addToCart(product: Product): Observable<any> {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cart$.next(this.cart);
    return this.http.post<any>(this.apiUrlCart, this.cart);
  }

  removeFromCart(productId: number): Observable<any> {
    const index = this.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cart$.next(this.cart);
      return this.http.delete<any>(`${this.apiUrlCart}/${productId}`);
    }
    return new Observable(observer => observer.complete());
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    const index = this.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.cart[index].quantity = quantity;
      this.cart$.next(this.cart);
      return this.http.put<any>(`${this.apiUrlCart}/${productId}`, this.cart[index]);
    }
    return new Observable(observer => observer.complete());
  }

  getCart(): Observable<Product[]> {
    return this.cart$;
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(this.apiUrlCart).pipe(
      tap(() => {
        this.cart = [];
        this.cart$.next(this.cart);
      })
    );
  }
}
