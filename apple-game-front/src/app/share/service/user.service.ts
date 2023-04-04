import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { LocalStorageService } from './local-storage.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private error: HandleErrorService,
    private localStorageService: LocalStorageService
  ) {}

  getUser(): Observable<User> {
    return this.http
      .get<User>(this.userUrl)
      .pipe(catchError(this.error.handleError<User>('getUser')));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userUrl)
      .pipe(catchError(this.error.handleError<User[]>('getUsers', [])));
  }

  addUser(username: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.userUrl}/user/add/`,
        { username: username },
        this.httpOptions
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

  updateUser(user: User) {
    return this.http
      .post<User>(
        `${this.userUrl}/user/add/`,
        { username: user.username },
        this.httpOptions
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
}
