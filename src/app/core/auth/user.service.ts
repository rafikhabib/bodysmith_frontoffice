import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from './user.types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private apiUrl = 'http://127.0.0.1:9090';
  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>('http://127.0.0.1:9090/admin/').pipe(
      tap((user) => {
        console.log(user);
        this._user.next(user);
      })
    );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient
      .patch<User>('http://127.0.0.1:9090/admin/', { user })
      .pipe(
        map((response) => {
          this._user.next(response);
        })
      );
  }
  getUserInfo() {
    console.log(this.authService.currentUserValue);
    const userId = this.authService.currentUserValue?._id;
    console.log(userId);
    if (!userId) {
      throw new Error('User ID is not available');
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (this.authService.currentUserValue?.role === 'USER') {
      return this._httpClient.get<User>(`${this.apiUrl}/user/${userId}`, {
        headers,
      });
    }
    if (this.authService.currentUserValue?.role === 'COACH') {
      return this._httpClient.get<User>(`${this.apiUrl}/coach/${userId}`, {
        headers,
      });
    }
    if (this.authService.currentUserValue?.role === 'NUTRITIONNISTE') {
      return this._httpClient.get(`${this.apiUrl}/nutritionniste/${userId}`, {
        headers,
      });
    }
    return this._httpClient.get<User>(`${this.apiUrl}/user/${userId}`);
  }
  updateUserInfo(user: User) {
    const userId = this.authService.currentUserValue?._id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (this.authService.currentUserValue?.role === 'USER') {
      return this._httpClient.put<User>(`${this.apiUrl}/user/${userId}`, user, {
        headers,
      });
    }
    if (this.authService.currentUserValue?.role === 'COACH') {
      return this._httpClient.put<User>(
        `${this.apiUrl}/coach/${userId}`,
        user,
        {
          headers,
        }
      );
    }
    if (this.authService.currentUserValue?.role === 'NUTRITIONNISTE') {
      return this._httpClient.put<User>(
        `${this.apiUrl}/nutritionniste/${userId}`,
        user,
        {
          headers,
        }
      );
    }

    return this._httpClient.put<User>(
      `${this.apiUrl}/nutritionniste/${userId}`,
      user
    );
  }

  changePassword(
    currentpassword: string,
    password: string,
    passwordconfirm: string
  ): Observable<User> {
    const userId = this.authService.currentUserValue?._id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (this.authService.currentUserValue?.role === 'USER') {
      return this._httpClient.put<any>(
        `${this.apiUrl}/user/changepassword/${userId}`,
        {
          currentpassword,
          password,
          passwordconfirm,
        },
        {
          headers,
        }
      );
    }
    if (this.authService.currentUserValue?.role === 'COACH') {
      return this._httpClient.put<any>(
        `${this.apiUrl}/coach/changepassword/${userId}`,
        {
          currentpassword,
          password,
          passwordconfirm,
        },
        {
          headers,
        }
      );
    }
    if (this.authService.currentUserValue?.role === 'NUTRITIONNISTE') {
      return this._httpClient.put<any>(
        `${this.apiUrl}/nutritionniste/changepassword/${userId}`,
        {
          currentpassword,
          password,
          passwordconfirm,
        },
        {
          headers,
        }
      );
    }
    return this._httpClient.put<any>(
      `${this.apiUrl}/user/changepassword/${userId}`,
      {
        currentpassword,
        password,
        passwordconfirm,
      },
      {
        headers,
      }
    );
  }
}
