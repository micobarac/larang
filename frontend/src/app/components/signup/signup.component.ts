import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserAccount } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  errors = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signup(this.form)
    .subscribe(
      (response: HttpResponse<UserAccount>) => this.handleResult(response.body),
      (error: HttpErrorResponse) => this.handleError(error)
    );
  }

  handleResult(result: UserAccount) {
    this.authService.authenticate(result.token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error: HttpErrorResponse) {
    this.errors = error.error.errors;

    of(null)
    .pipe(
      delay(5000)
    )
    .subscribe(() => this.errors = []);
  }

}
