import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserAccount } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = {
    email: null,
    password: null
  };

  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.form)
    .subscribe(
      (response: HttpResponse<UserAccount>) => this.handleResult(response.body),
      (error: HttpErrorResponse) => this.handleError(error.error)
    );
  }

  handleResult(result: UserAccount) {
    this.snotifyService.success(`${result.user.name} logged in`, 'Login');
    this.authService.authenticate(result.token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error: any) {
    this.error = error.error;
    this.snotifyService.error(this.error, 'Login error');

    of(null)
    .pipe(
      delay(5000)
    )
    .subscribe(() => this.error = null);
  }

}
