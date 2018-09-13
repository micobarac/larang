import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Settings } from '../app.settings';
import { Token } from '../models/token.model';
import { User, UserAccount } from '../models/user.model';
import { HttpResponseUtil } from '../shared/helpers/http-response.util';
import { TokenService } from './token.service';

export type EntityResponseType = HttpResponse<UserAccount>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly Api: string = Settings.Api + 'auth';
  private loggedInStatus: BehaviorSubject<boolean> = new BehaviorSubject(this.tokenService.isValid);

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(user: User): Observable<EntityResponseType> {
    const copy = HttpResponseUtil.convert(user);
    return this.http.post<UserAccount>(`${this.Api}/login`, copy, { observe: 'response' })
    .pipe(
      map((res: EntityResponseType) => HttpResponseUtil.convertResponse(res))
    );
  }

  signup(user: User): Observable<EntityResponseType> {
    const copy = HttpResponseUtil.convert(user);
    return this.http.post<UserAccount>(`${this.Api}/signup`, copy, { observe: 'response' })
    .pipe(
      map((res: EntityResponseType) => HttpResponseUtil.convertResponse(res))
    );
  }

  reset(user: User): Observable<EntityResponseType> {
    const copy = HttpResponseUtil.convert(user);
    return this.http.post<UserAccount>(`${this.Api}/reset`, copy, { observe: 'response' })
    .pipe(
      map((res: EntityResponseType) => HttpResponseUtil.convertResponse(res))
    );
  }

  authenticate(token: Token) {
    this.tokenService.token = token;
    this.loggedInStatus.next(!!token);
  }
}
