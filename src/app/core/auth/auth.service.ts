import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<any>(`http://127.0.0.1:9090/auth/login/`, { email, password })
      .pipe(
        map((response) => {
          const user: User = response.user;
          const token: string = response.tokens.access.token;
          console.log('Token received:', token);

          if (
            user &&
            (user.role === 'USER' || user.role === 'NUTRITIONNISTE') &&
            user.active
          ) {
            // if (user.isApproved === false) {
            //   // this._router.navigate(['/confirmation-required']);
            //   return throwError('Account not approved');
            // }
            if (!token) {
              console.error('No token found in the response');
              throw new Error('No token found in the response');
            }
            if (!user.isApproved) {
              window.open(
                'http://localhost:4200/confirmation-required',
                '_blank'
              );
              throw new Error('Account not approved.');
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', token);
            console.log(
              'Token stored in local storage:',
              localStorage.getItem('token')
            );

            this.currentUserSubject.next(user);
            return user;
          } else {
            console.log(
              Error('Access denied. Invalid role or inactive account.')
            );
            throw new Error('Access denied. Invalid role or inactive account.');
          }
        }),
        catchError((error) => {
          const errorMessage =
            error.error?.message ||
            error.message ||
            'An unknown error occurred';
          console.log('Error during login:', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout(): void {
    // Remove user and token from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
