import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { ThermostatService } from '../../services/thermostat.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';
import { Thermostat } from '../../interfaces/thermostat.interface';
import { zip } from 'rxjs';

@Component({
  selector: 'app-thermostat-list',
  templateUrl: './thermostat-list.component.html',
  styleUrls: ['./thermostat-list.component.scss'],
})
export class ThermostatListComponent implements OnDestroy {
  displayedColumns = ['id', 'humidity', 'temperature', 'battery_charge', 'location', 'household_token'];
  thermostats: Thermostat[];
  private readonly componentDestroyed$: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly thermostatService: ThermostatService,
  ) {
    this.thermostatService.thermostats$
      .pipe(
        takeUntil(this.componentDestroyed$),
        map(thermostats =>
          thermostats.filter(thermostat => {
            const currentUser = this.authService.currentUser;
            /**
             * Show all thermostats for management user
             */
            if (currentUser === 'management') {
              return true;
            }

            /**
             * Only show thermostats that belongs to the user
             */
            return !!thermostat ? (thermostat.household_token === currentUser) : false;
          }))
      )
      .subscribe(thermostats => {
        this.thermostats = thermostats;

        if (this.thermostats.length > 0) {
          const requests = this.thermostats.map(({id}) => this.thermostatService.getMeasurements(id)
            .pipe(map(({readings}) => readings[0])));

          zip(...requests)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(thermostatReadings => {
              thermostatReadings.forEach(reading => {
                const thermostat = this.thermostats.find(({id}) => reading.thermostat_id === id);

                thermostat.temperature = reading.temperature;
                thermostat.humidity = reading.humidity;
                thermostat.battery_charge = reading.battery_charge;
              });
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.emit(null);
  }
}
