import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  onSubmitAuth(authData: any) {
    console.log(authData);
    authData.reset();
  }
}
