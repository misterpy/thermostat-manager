import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../authentication/guards/authenticated.guard';
import { ThermostatManagerComponent } from './components/thermostat-manager/thermostat-manager.component';
import { ThermostatListComponent } from './components/thermostat-list/thermostat-list.component';
import { ThermostatDetailsComponent } from './components/thermostat-details/thermostat-details.component';
import { ThermostatLayoutComponent } from './components/thermostat-layout/thermostat-layout.component';

const routes: Routes = [
  {
    path: 'thermostat',
    component: ThermostatLayoutComponent,
    canActivate: [
      AuthenticatedGuard,
    ],
    children: [
      {
        pathMatch: 'prefix',
        redirectTo: 'management',
      },
      {
        path: 'management',
        component: ThermostatManagerComponent,
      },
      {
        path: 'list',
        component: ThermostatListComponent,
      },
      {
        path: 'details/:id',
        component: ThermostatDetailsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThermostatRoutingModule { }
