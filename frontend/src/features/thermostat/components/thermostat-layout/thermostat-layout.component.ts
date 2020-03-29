import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-thermostat-layout',
  templateUrl: './thermostat-layout.component.html',
  styleUrls: ['./thermostat-layout.component.scss'],
})
export class ThermostatLayoutComponent {
  currentUser: string;

  constructor(
    private readonly authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUser;
  }
}
