import React, { useState, ChangeEvent } from "react";
import Head from "next/head";
import Nav from "../components/website/Nav";
import SearchBar from "../components/SearchBar";
import {
  Container,
  Card,
  Typography,
  Grid,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import { NextPage } from "next";
import { IWeatherResults, IWeatherInfo } from "../interfaces/Weather";
import WeatherForecast from "../components/WeatherForcast";
import { transformWeatherInfo } from "../util/utils";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  cityName: {
    display: "flex",
    margin: theme.spacing(2)
  },
  errorCard: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

const Home: NextPage<{}> = () => {
  const classes = useStyles({});
  const [city, setCity] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [weather, setWeather] = useState<IWeatherInfo[]>([]);
  const [error, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setError(true);
  };

  const handleSubmit = async () => {
    const searchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=ae274f9fa95742d9eb8ba702e2259052&units=imperial`;
    let results: IWeatherResults;
    setLoading(true);

    try {
      results = await (await fetch(searchUrl)).json();
    } catch {
      // TODO: Add better handling
      handleError("There was an unexpected error");
    }

    setLoading(false);
    if (results.cod !== "200") {
      handleError("The city you searched for wasn't found");
      return;
    } else {
      setError(false);
      setCity(results.city.name);
      setWeather(results.list);
    }
  };

  return (
    <div>
      <Head>
        <title>OVO Energy Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Grid container justify="center">
        <SearchBar onChange={handleSearchQuery} onSubmit={handleSubmit} />

        {loading ? <CircularProgress /> : null}
        <br />

        {weather.length > 0 && !error ? (
          <Grid container justify="center">
            <Typography
              className={classes.cityName}
              component="h1"
              align="center"
            >
              {city}
            </Typography>
          </Grid>
        ) : null}

        {error ? (
          <Card className={classes.errorCard}>
            <Typography component="h2">{errorMessage}</Typography>
          </Card>
        ) : null}

        {weather.length > 0 && !error ? (
          <WeatherForecast forecasts={transformWeatherInfo(weather)} />
        ) : null}
      </Grid>
    </div>
  );
};

export default Home;
