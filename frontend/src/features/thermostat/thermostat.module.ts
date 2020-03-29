import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThermostatManagerComponent } from './components/thermostat-manager/thermostat-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThermostatListComponent } from './components/thermostat-list/thermostat-list.component';
import { ThermostatRoutingModule } from './thermostat-routing.module';
import { ThermostatLayoutComponent } from './components/thermostat-layout/thermostat-layout.component';
import { ThermostatDetailsComponent } from './components/thermostat-details/thermostat-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateThermostatFormComponent } from './components/create-thermostat-form/create-thermostat-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ThermostatListComponent,
    ThermostatLayoutComponent,
    ThermostatDetailsComponent,
    ThermostatManagerComponent,
    CreateThermostatFormComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ThermostatRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ThermostatModule { }
