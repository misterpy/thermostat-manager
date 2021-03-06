import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reading, Thermostat } from '../interfaces/thermostat.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThermostatService {
  thermostats$: BehaviorSubject<Thermostat[]> = new BehaviorSubject<Thermostat[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {
    this.getList();
  }

  private getList(): void {
    const url = `${environment.backendUrl}/thermostats`;
    this.http.get<Thermostat[]>(url)
      .subscribe(thermostats => this.thermostats$.next(thermostats));
  }

  getMeasurements(id: number, page?: number, pageSize?: number): Observable<{readings: Reading[], pagination: any}> {
    const url = `${environment.backendUrl}/thermostats/${id}/measurements?page=${page}&page_size=${pageSize}`;
    return this.http.get<{readings: Reading[], pagination: any}>(url)
      .pipe(map(({readings, pagination}) => ({readings: readings.sort((a, b) => b.id - a.id), pagination})));
  }

  create(payload: Partial<Thermostat>): Observable<Thermostat> {
    const url = `${environment.backendUrl}/thermostats`;
    return this.http.post<Thermostat>(url, {...payload})
      .pipe(tap(thermostat => {
        const list = this.thermostats$.getValue();
        this.thermostats$.next([{...thermostat}, ...list]);
      }));
  }
}
