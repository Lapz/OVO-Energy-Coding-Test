import { IWeatherInfo } from "../interfaces/Weather";

export const toCelsius = (fahrenheit: number) => {
  return Math.round((fahrenheit - 32) * (5 / 9));
};

export const transformWeatherInfo = (weather: IWeatherInfo[]) => {
  const temperatures = {};

  for (const forecast of weather) {
    const date = new Date(forecast.dt_txt).toDateString();
    if (temperatures[date]) {
      temperatures[date].humidity.push(forecast.main.humidity);
      const currentMaxTemp = temperatures[date].maxTemp;
      if (forecast.main.temp > currentMaxTemp) {
        temperatures[date].maxTemp = forecast.main.temp_max;
      }
    } else {
      temperatures[date] = {
        humidity: [forecast.main.humidity],
        maxTemp: forecast.main.temp_max,
        date: forecast.dt_txt
      };
    }
  }

  const forecasts: {
    date: Date;
    avgHumidity: number;
    maxTemp: number;
  }[] = [];

  for (const key of Object.keys(temperatures)) {
    const avgHumidity =
      temperatures[key].humidity.reduce((a: number, b: number) => a + b, 0) /
      temperatures[key].humidity.length;
    forecasts.push({
      date: new Date(temperatures[key].date),
      avgHumidity: Math.round(avgHumidity),
      maxTemp: temperatures[key].maxTemp
    });
  }

  return forecasts;
};
