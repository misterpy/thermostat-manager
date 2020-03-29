import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ThermostatService } from '../../services/thermostat.service';
import { Reading } from '../../interfaces/thermostat.interface';
import { ActivatedRoute } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-thermostat-details',
  templateUrl: './thermostat-details.component.html',
  styleUrls: ['./thermostat-details.component.scss'],
})
export class ThermostatDetailsComponent implements OnDestroy {
  paginator = {
    pageIndex: 0,
    pageSize: 1,
  };
  thermostatId: number;
  readings: Reading[] = [];
  isLowBattery = false;
  displayedColumns = ['humidity', 'temperature', 'battery_charge', 'location'];
  private readonly componentDestroyed$: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly thermostatService: ThermostatService,
  ) {
    this.route.paramMap
      .pipe(
        takeUntil(this.componentDestroyed$),
        map(paramMap => paramMap.get('id')),
      )
      .subscribe(thermostatId => {
        this.thermostatId = Number(thermostatId);
        this.getMeasurements();
      });
  }

  paginate(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;

    this.getMeasurements();
  }

  getMeasurements() {
    const {pageIndex, pageSize} = this.paginator;
    this.thermostatService.getMeasurements(this.thermostatId, pageIndex, pageSize)
      .pipe(
        takeUntil(this.componentDestroyed$),
        take(1),
      )
      .subscribe(readings => {
        this.readings = readings;

        if (pageIndex === 0 && !!this.readings[0]) {
          this.isLowBattery = this.readings[0].battery_charge < 30;
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.emit(null);
  }
}
