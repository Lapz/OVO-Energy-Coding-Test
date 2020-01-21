import {
  Container,
  TableHead,
  TableRow,
  Table,
  Paper,
  TableBody,
  TableCell
} from "@material-ui/core";

interface IWeatherForecastProps {
  forecasts: {
    date: Date;
    avgHumidity: number;
    maxTemp: number;
  }[];
}

const WeatherForecast: React.FC<IWeatherForecastProps> = ({ forecasts }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Humidity</TableCell>
            <TableCell>Average Max Temp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecasts.map(({ date, avgHumidity, maxTemp }, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{date.toDateString()}</TableCell>
                <TableCell>{avgHumidity}%</TableCell>
                <TableCell>{maxTemp}&#8451;</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WeatherForecast;
