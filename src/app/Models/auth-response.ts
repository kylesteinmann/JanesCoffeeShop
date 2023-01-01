export class AuthResponse {
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered:boolean

  constructor(kind:string, idToken:string, email:string, refreshToken:string, expiresIn:string, localId:string, registered:boolean) {
    this.kind=kind;
    this.idToken=idToken;
    this.email=email;
    this.refreshToken=refreshToken;
    this.expiresIn = expiresIn;
    this.localId = localId;
    this.registered = registered;
  }

}

