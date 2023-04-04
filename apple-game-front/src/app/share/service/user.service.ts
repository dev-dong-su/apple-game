import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { LocalStorageService } from './local-storage.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
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

  addUser(name: string): Observable<User> {
    return this.http.post<User>(this.userUrl, name, this.httpOptions).pipe(
      tap((response: any) => {
        const token = response.token;
        const decodedToken: User = jwtDecode(token);
        this.localStorageService.setLocalStorageItem(
          'access_token',
          decodedToken
        );
      }),
      catchError(this.error.handleError<User>('addUsers'))
    );
  }

  updateUser() {}
}
