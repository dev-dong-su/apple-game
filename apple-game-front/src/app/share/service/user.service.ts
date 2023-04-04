import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private error: HandleErrorService) {}

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

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl, user, this.httpOptions)
      .pipe(catchError(this.error.handleError<User>('addUsers')));
  }

  updateUser() {}
}
