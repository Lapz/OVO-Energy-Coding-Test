import { number } from "prop-types";

export interface IWeatherResults {
  city: ICity;
  cod: string;
  cnt: number;
  list: IWeatherInfo[];
}

export interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
}

export interface IWeatherInfo {
  // Date in seconds since unix epoch
  dt: number;
  dt_txt: string;
  // Temperature in Farenheit
  main: {
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  weather: IWeather[];
  wind?: {
    speed: number;
    deg: number;
  };
  clouds?: {
    all: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
}

export interface IWeather {
  id: number;
  main: IWeatherGroup;
  description: string;
  icon: string;
}

export enum IWeatherGroup {
  RAIN = "rain",
  SNOW = "snow",
  EXTREME = "extreme",
  CLEAR = "clear"
}
