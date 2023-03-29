export class User {
  id: number;
  userName: string;

  constructor(user: User) {
    this.id = user?.id;
    this.userName = user?.userName;
  }
}
