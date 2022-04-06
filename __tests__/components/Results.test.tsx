import React from "react";
import Results, { IResults } from "@/components/Results/Results";
import { fireEvent, render, screen } from "@testing-library/react";
import fakePeriods from "../../utils/constants/FakePeriods";
import button from "@/components/Button/Button";
import TForecastPeriod from "../../types/forecastPeriod";

describe("Results", () => {
  const setUp = (props: IResults) => {
    return render(<Results {...props} />);
  };
  it("Shouldn't render forecast day buttons and card if results are falsy or if its an empty array", () => {
    const props: IResults = {
      results: [],
      numberOfDaysToShow: 7,
    };
    setUp(props);
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
    const card = screen.queryByTestId("forecast-card");
    expect(card).not.toBeInTheDocument();
  });

  it("Should render the same number of days than numberOfDaysToShow", async () => {
    const props: IResults = {
      results: [],
      numberOfDaysToShow: 7,
    };
    const refreshProps = (
      results: TForecastPeriod[],
      numberOfDaysToShow: number
    ) => {
      props.results = JSON.parse(JSON.stringify(results));
      props.numberOfDaysToShow = numberOfDaysToShow;
    };
    const { rerender } = setUp(props);
    expect(screen.queryAllByRole("button").length).toBe(0);
    refreshProps(fakePeriods, 7);
    await rerender(<Results {...props} />);
    expect(screen.queryAllByRole("button").length).toBe(7);
    refreshProps(fakePeriods, 13);
    await rerender(<Results {...props} />);
    expect(screen.queryAllByRole("button").length).toBe(7);
    refreshProps(fakePeriods, 3);
    await rerender(<Results {...props} />);
    expect(screen.queryAllByRole("button").length).toBe(3);
  });

  it("Should load the selected forecast", () => {
    const props: IResults = {
      results: fakePeriods,
      numberOfDaysToShow: 7,
    };
    setUp(props);
    let foreCastButtons = screen.queryAllByRole("button");
    let card = screen.queryByTestId("forecast-card");
    let cardItem = screen.queryAllByTestId("forecast-card-item");
    let images = screen.queryAllByTestId("forecast-card-item-image");
    let names = screen.queryAllByTestId("forecast-card-item-name");
    let temperatures = screen.queryAllByTestId(
      "forecast-card-item-temperature"
    );
    let forecastsDetails = screen.queryAllByTestId(
      "forecast-card-item-detailed-forecast"
    );
    // Test content
    expect(card).toBeInTheDocument();
    expect(cardItem.length).toBe(2);
    expect(images.length).toBe(2);
    expect(names.length).toBe(2);
    expect(temperatures.length).toBe(2);
    expect(forecastsDetails.length).toBe(2);
    const testCardContent = (cardItemIndex: 0 | 1, periodNumber: number) => {
      expect((images[cardItemIndex] as HTMLImageElement).src).toBe(
        fakePeriods[periodNumber].icon
      );
      expect(names[cardItemIndex].innerHTML).toBe(
        fakePeriods[periodNumber].name
      );
      expect(temperatures[cardItemIndex].innerHTML).toBe(
        `${fakePeriods[periodNumber].temperature}°${fakePeriods[periodNumber].temperatureUnit}`
      );
      expect(forecastsDetails[cardItemIndex].innerHTML).toBe(
        fakePeriods[periodNumber].detailedForecast
      );
    };
    testCardContent(0, 0);
    testCardContent(1, 1);
    // Load new data
    fireEvent.click(foreCastButtons[1]);
    // Refresh variables
    images = screen.queryAllByTestId("forecast-card-item-image");
    names = screen.queryAllByTestId("forecast-card-item-name");
    temperatures = screen.queryAllByTestId("forecast-card-item-temperature");
    forecastsDetails = screen.queryAllByTestId(
      "forecast-card-item-detailed-forecast"
    );
    testCardContent(0, 2);
    testCardContent(1, 3);
  });
});
