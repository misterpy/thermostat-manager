export interface Thermostat {
  id: number;
  location: string;
  household_token: string;
  humidity?: number;
  temperature?: number;
  battery_charge?: number;
}

export interface Reading {
  id: number;
  humidity: number;
  temperature: number;
  thermostat_id: number;
  battery_charge: number;
}

export interface Apartment {
  id: string;
  thermostats?: Thermostat[];
}
