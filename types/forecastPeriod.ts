type TForecastPeriod = {
  detailedForecast: string;
  endTime: string;
  icon: string;
  isDaytime: boolean;
  name: string;
  number: number;
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureUnit: "F" | "C" | "K";
  windDirection: string;
  windSpeed: string;
  temperatureTrend: any;
};
export default TForecastPeriod;
