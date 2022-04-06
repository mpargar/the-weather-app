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
            <div key={f.name}>
              <div className={styles.image}>
                <img alt={f.shortForecast} src={f.icon} />
              </div>
              <span className={styles.dayName}>{f.name}</span>
              <span className={styles.temperature}>
                {f.temperature}°{f.temperatureUnit}
              </span>
              <span className={styles.forecast}>{f.detailedForecast}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Results;
