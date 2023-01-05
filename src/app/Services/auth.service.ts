import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../Models/auth-response';
import { User } from '../Models/user';
import { Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User | null>();
  isLoading = false;
  error = null
  constructor(private http: HttpClient, private router: Router) {}

  onSubmitAuth(authData: any) {

    authData.reset();
  }

  login(email: string, password: string) {
    this.isLoading = true;
    this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaPvHJ_ni0-7oVrP_BbRsKjlvP6AfafHs',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.user.next(user);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/portal']);
        this.isLoading = false
      });
  }


}
