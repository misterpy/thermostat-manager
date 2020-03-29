import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thermostat-layout',
  templateUrl: './thermostat-layout.component.html',
  styleUrls: ['./thermostat-layout.component.scss'],
})
export class ThermostatLayoutComponent {
  currentUser: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).finally();
  }
}
