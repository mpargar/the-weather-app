import { useEffect, useState } from "react";
import TForecastPeriod from "../types/forecastPeriod";
import TDayForecast from "../types/dayForecast";

const useCards = (results: TForecastPeriod[] = [], numberOfDaysToShow = 7) => {
  const [currentCard, setCurrentCard] = useState<TDayForecast>(null);
  const [forecast, setForecast] = useState<TDayForecast[]>([]);

  useEffect(() => {
    if (!results.length) {
      setForecast([]);
      handleSelectDay(null);
    } else {
      const days = [];
      let numberofDays =
        results.length >= numberOfDaysToShow * 2
          ? numberOfDaysToShow * 2
          : results.length;
      for (let i = 0; i < numberofDays; i += 2) {
        const name = i === 0 ? "Today" : results[i]?.name;
        if (results[i].name === "Tonight") {
          days.push({
            name,
            forecast: [results[i]],
          });
          i--;
          numberofDays--;
        } else if (results[0].name === "Tonight" && i >= results.length - 2) {
          console.log(i);
          days.push({
            name,
            forecast: [results[i]],
          });
        } else {
          days.push({
            name,
            forecast: [results[i], results[i + 1]],
          });
        }
      }
      setForecast(days);
      handleSelectDay(days[0]);
    }
  }, [results]);

  const handleSelectDay = (day: TDayForecast) => {
    setCurrentCard(day);
  };
  return { currentCard, forecast, handleSelectDay };
};
export default useCards;
