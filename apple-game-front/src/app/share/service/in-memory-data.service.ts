import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, uesrName: 'Dr. Nice' },
      { id: 2, uesrName: 'Bombasto' },
      { id: 3, uesrName: 'Celeritas' },
      { id: 4, uesrName: 'Magneta' },
      { id: 5, uesrName: 'RubberMan' },
      { id: 6, uesrName: 'Dynama' },
      { id: 7, uesrName: 'Dr. IQ' },
      { id: 8, uesrName: 'Magma' },
      { id: 9, uesrName: 'Tornado' },
    ];
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
