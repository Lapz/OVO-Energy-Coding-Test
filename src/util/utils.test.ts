import { toCelsius, transformWeatherInfo } from "./utils";
import { IWeatherInfo } from "../interfaces/Weather";
const testData1 = require("./testdata1.json");
const testData2 = require("./testdata2.json");

describe("toCelsius(fahrenheit)", () => {
  it("converts from Fahrenheit to expected Celsius", () => {
    expect(toCelsius(32)).toEqual(0);
    expect(toCelsius(122.72)).toEqual(50);
  });
});

describe("transformWeatherInfo(weather)", () => {
  it("returns nothing with an empty array", () => {
    expect(transformWeatherInfo([]).length).toEqual(0);
  });
  it("should return the forecast for only one day", () => {
    const weather = transformWeatherInfo(testData1);
    expect(weather.length).toEqual(1);
    expect(weather[0]).toBeTruthy();
    expect(weather[0].date).toEqual(new Date("2019-10-16T23:00:00.000Z"));
    expect(weather[0].avgHumidity).toBe(67);
    expect(weather[0].maxTemp).toBe(toCelsius(58.79));
  });
  it("should return the forecast for the next  6 days", () => {
    const weather = transformWeatherInfo(testData2);
    expect(weather.length).toEqual(6);
  });
});
