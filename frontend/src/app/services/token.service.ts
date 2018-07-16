import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Settings } from '../app.settings';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  readonly tokenName = Settings.Prefix + 'token';
  readonly jwtService = new JwtHelperService();

  set token(token: Token) {
    token ? localStorage.setItem(this.tokenName, JSON.stringify(token)) : localStorage.removeItem(this.tokenName);
  }

  get token(): Token {
    return <Token>JSON.parse(localStorage.getItem(this.tokenName));
  }

  get isValid(): boolean {
    return !!this.token && !this.jwtService.isTokenExpired(this.token.access_token);
  }

  constructor() { }
}
