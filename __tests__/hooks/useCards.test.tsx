import React, { useState } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useCards from "../../hooks/useCards";
import TForecastPeriod from "types/forecastPeriod";
import fakePeriods from "../../utils/constants/FakePeriods";

describe("useCards hook", () => {
  const fakeEnvironment = () => {
    const [results, setResults] = useState<TForecastPeriod[]>([]);
    const [numberOfDaysToShow, setNumberOfDaysToShow] = useState<number>(7);
    const { currentCard, forecast, handleSelectDay } = useCards(
      results,
      numberOfDaysToShow
    );
    return {
      results,
      numberOfDaysToShow,
      setResults,
      setNumberOfDaysToShow,
      currentCard,
      forecast,
      handleSelectDay,
    };
  };

  it("Should return the right amount of forecast options", () => {
    const { result } = renderHook(() => fakeEnvironment());
    expect(result.current.forecast.length).toBe(0);
    act(() => {
      result.current.setResults(fakePeriods);
    });
    expect(result.current.forecast.length).toBe(7);
    act(() => {
      result.current.setNumberOfDaysToShow(12);
      result.current.setResults(JSON.parse(JSON.stringify(fakePeriods)));
    });
    expect(result.current.forecast.length).toBe(7);
    act(() => {
      result.current.setNumberOfDaysToShow(3);
      result.current.setResults(JSON.parse(JSON.stringify(fakePeriods)));
    });
    expect(result.current.forecast.length).toBe(3);
  });

  it("Should return the correct selected forecast data", () => {
    const { result } = renderHook(() => fakeEnvironment());
    expect(result.current.currentCard).toBe(null);
    act(() => {
      result.current.setResults(fakePeriods);
    });
    // Should render "Today by default"
    expect(result.current.currentCard?.name).toBe("Today");
    expect(result.current.currentCard?.forecast[0]).toBe(fakePeriods[0]);
    expect(result.current.currentCard?.forecast[1]).toBe(fakePeriods[1]);
    // Should return the selected forecast
    result.current.forecast.forEach((f, fIndex) => {
      act(() => {
        result.current.handleSelectDay(result.current.forecast[fIndex]);
      });
      expect(result.current.currentCard?.name).toBe(
        result.current.forecast[fIndex]?.name
      );
      expect(result.current.currentCard?.forecast[0]).toBe(
        fakePeriods[fIndex * 2]
      );
      expect(result.current.currentCard?.forecast[1]).toBe(
        fakePeriods[fIndex * 2 + 1]
      );
    });
  });
});
