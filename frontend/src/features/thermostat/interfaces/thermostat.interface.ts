export interface Thermostat {
  id: string;
  household_token: string;
  location: string;
}

export interface Reading {
  id: string;
  thermostat_id: string;
  temperature: number;
  humidity: number;
  battery_charge: number;
}
