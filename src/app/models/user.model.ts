export class User {
  constructor(
    public localId: string,
    public email: string,
    public emailVerified: boolean,
    public providerUserInfo: any[],
    public validSince: string,
    public disabled: boolean,
    public lastLoginAt: string,
    public createdAt: string,
    public customAuth: boolean,
    private _displayName: string,
    private _photoUrl: string
  ) {}

  get displayName() {
    return this._displayName ?? 'Anonymous';
  }

  get photoUrl() {
    return (
      this._photoUrl ??
      'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
    );
  }
}
