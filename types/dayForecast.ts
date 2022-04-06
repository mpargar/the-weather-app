import TForecastPeriod from "./forecastPeriod";

type TDayForecast = {
  name: string;
  forecast: TForecastPeriod[];
} | null;

export default TDayForecast;
