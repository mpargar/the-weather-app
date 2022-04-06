import React from "react";
import useCards from "../../hooks/useCards";
import styles from "./Results.module.scss";
import TForecastPeriod from "../../types/forecastPeriod";
import Button from "@/components/Button/Button";
export interface IResults {
  results: TForecastPeriod[];
  numberOfDaysToShow: number;
}
const Results = ({ results, numberOfDaysToShow = 7 }: IResults) => {
  const { currentCard, forecast, handleSelectDay } = useCards(
    results,
    numberOfDaysToShow
  );
  return (
    <>
      <div className={styles.daysWrapper}>
        {forecast.map((day, index) => (
          <Button
            key={index}
            styleType="accent"
            onClick={() => handleSelectDay(day)}
          >
            {day?.name}
          </Button>
        ))}
      </div>
      {currentCard && (
        <div className={styles.card} data-testid="forecast-card">
          {currentCard?.forecast?.map((f) => (
            <div key={f.name} data-testid="forecast-card-item">
              <div className={styles.image}>
                <img
                  alt={f.shortForecast}
                  src={f.icon}
                  data-testid="forecast-card-item-image"
                />
              </div>
              <span
                className={styles.dayName}
                data-testid="forecast-card-item-name"
              >
                {f.name}
              </span>
              <span
                className={styles.temperature}
                data-testid="forecast-card-item-temperature"
              >
                {f.temperature}°{f.temperatureUnit}
              </span>
              <span
                className={styles.forecast}
                data-testid="forecast-card-item-detailed-forecast"
              >
                {f.detailedForecast}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Results;
