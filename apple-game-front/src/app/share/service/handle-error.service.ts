import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      alert(`${error.error.message}`);

      return of(result as T);
    };
  }
}
