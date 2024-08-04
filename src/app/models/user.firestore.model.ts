export class UserFirestore {
  constructor(
    public localId: string,
    public email: string,
    public isAdmin?: boolean,
    public displayName?: string,
    public adress?: string,
    public phoneNumber?: number,
    public photoUrl?: string
  ) {}
}
