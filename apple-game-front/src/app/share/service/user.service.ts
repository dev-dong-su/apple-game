import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { LocalStorageService } from './local-storage.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = environment.BASE_URL;

  constructor(
    private router: Router,
    private http: HttpClient,
    private error: HandleErrorService,
    private localStorageService: LocalStorageService
  ) {}

  getHttpOptions() {
    const token = this.localStorageService.getLocalStorageItem('access_token');
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    }
  }

  addUser(username: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.baseURL}/user/add/`,
        { username: username },
        this.getHttpOptions()
      )
      .pipe(
        tap((response: any) => {
          const token = response;
          this.localStorageService.setLocalStorageItem('access_token', token);

          const decodedToken: User = jwtDecode(token);
          this.localStorageService.setLocalStorageItem('user', decodedToken);

          this.router.navigate(['game']);
        }),
        catchError(this.error.handleError<User>('addUsers'))
      );
  }

  updateUser(user: User, new_name: string | null): Observable<User> {
    return this.http
      .put<User>(
        `${this.baseURL}/user/update/`,
        {
          username: user.username,
          best_score: user.best_score,
          new_name: new_name,
        },
        this.getHttpOptions()
      )
      .pipe(
        tap((response: any) => {
          const token = response;
          this.localStorageService.setLocalStorageItem('access_token', token);

          const decodedToken: User = jwtDecode(token);
          this.localStorageService.setLocalStorageItem('user', decodedToken);
        }),
        catchError(this.error.handleError<User>('updateUser'))
      );
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseURL}/user/all/`)
      .pipe(catchError(this.error.handleError<User[]>('getUsers')));
  }

  checkUserToken(): Observable<boolean> {
    return this.http
      .get<void>(`${this.baseURL}/user/user_token/`, this.getHttpOptions())
      .pipe(
        map(() => true),
        catchError(async (err) => {
          alert('토큰이 유효하지 않습니다.');
          return false;
        })
      );
  }
}
