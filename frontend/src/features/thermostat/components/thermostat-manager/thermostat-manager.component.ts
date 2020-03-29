import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ThermostatService } from '../../services/thermostat.service';
import { Apartment, Thermostat } from '../../interfaces/thermostat.interface';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateThermostatFormComponent } from '../create-thermostat-form/create-thermostat-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-thermostat-manager',
  templateUrl: './thermostat-manager.component.html',
  styleUrls: ['./thermostat-manager.component.scss'],
})
export class ThermostatManagerComponent implements OnInit, OnDestroy {
  thermostats: Thermostat[] = [];
  apartmentMap: { [key: string]: Apartment } = {};
  apartmentCount = 0;
  thermostatCount = 0;
  private readonly componentDestroyed$: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly thermostatService: ThermostatService,
  ) {
  }

  ngOnInit(): void {
    this.thermostatService.thermostats$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(thermostats => {
        this.thermostats = thermostats;

        this.thermostatCount = this.thermostats.length;

        /**
         * Normalize the thermostats into a list of apartments.
         */
        this.apartmentMap = {};
        this.thermostats.forEach(thermostat => {
          this.apartmentMap[thermostat.household_token] = this.apartmentMap[thermostat.household_token]
            || {
              id: thermostat.household_token,
              thermostats: [],
            };

          this.apartmentMap[thermostat.household_token].thermostats.push(thermostat);
        });

        this.apartmentCount = Object.keys(this.apartmentMap).length;
      });
  }

  onCreate() {
    this.dialog.open(CreateThermostatFormComponent, {
      width: '500',
    })
      .afterClosed()
      .pipe(
        takeUntil(this.componentDestroyed$),
        filter(payload => payload !== null),
        switchMap(payload => this.thermostatService.create(payload)),
      )
      .subscribe(() => this.snackbar.open('Thermostat crated successfully!', 'ok', {duration: 3500}));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
  }
}
