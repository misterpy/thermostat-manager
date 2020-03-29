import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thermostat } from '../../interfaces/thermostat.interface';

@Component({
  selector: 'app-create-thermostat-form',
  templateUrl: './create-thermostat-form.component.html',
  styleUrls: ['./create-thermostat-form.component.scss'],
})
export class CreateThermostatFormComponent {
  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<CreateThermostatFormComponent>,
  ) {
    this.form = this.formBuilder.group({
      household_token: [null, Validators.required],
      location: [null, Validators.required],
    });
  }

  create(payload: Partial<Thermostat>) {
    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
