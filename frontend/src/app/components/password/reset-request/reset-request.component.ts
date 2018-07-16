import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss']
})
export class ResetRequestComponent implements OnInit {

  form = {
    email: null
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
    this.authService.reset(this.form)
    .subscribe(
      (response: HttpResponse<any>) => this.handleResult(response.body),
      (error: HttpErrorResponse) => this.handleError(error.error)
    );
  }

  handleResult(result: any) {
    this.snotifyService.success(result.data, 'Reset password');
    this.router.navigateByUrl('/password/reset/response');
  }

  handleError(error: any) {
    this.error = error.error;
    this.snotifyService.error(this.error, 'Reset password');

    of(null)
    .pipe(
      delay(5000)
    )
    .subscribe(() => this.error = null);
  }

}
