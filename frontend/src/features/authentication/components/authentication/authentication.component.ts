import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;

  public constructor(
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      user: [null, [Validators.required]],
    });
  }

  public ngOnInit(): void {
    if (!!this.authService.currentUser) {
      this.redirectUser();
    }
  }

  login({user}) {
    this.authService.login(user);
    this.redirectUser();
  }

  private redirectUser() {
    const redirectPath = this.authService.currentUser === 'management'
      ? ['/thermostat', 'management'] : ['/thermostat', 'list'];

    this.router.navigate(redirectPath).finally();
  }
}
