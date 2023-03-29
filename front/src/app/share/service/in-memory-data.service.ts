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

  // 히어로 객체가 항상 id 프로퍼티를 갖도록 getId 메소드를 오버라이드 합니다.
  // 히어로 목록이 비어있다면 이 메소드는 초기값(11)을 반환합니다.
  // 히어로 목록이 비어있지 않으면 히어로 id의 최대값에 1을 더해서 반환합니다.
  genId(users: User[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
