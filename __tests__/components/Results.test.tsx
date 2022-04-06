import React from "react";
import Results, { IResults } from "@/components/Results/Results";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import fakePeriods from "../../utils/constants/FakePeriods";
import button from "@/components/Button/Button";
import { afterEach } from "@jest/globals";
import results from "@/components/Results/Results";
import TForecastPeriod from "../../types/forecastPeriod";

describe("Results", () => {
  afterEach(() => cleanup());
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
    let props: IResults = {
      results: [],
      numberOfDaysToShow: 7,
    };
    const refreshProps = (
      results: TForecastPeriod[],
      numberOfDaysToShow: number
    ) => {
      props = {
        results: JSON.parse(JSON.stringify(results)),
        numberOfDaysToShow,
      };
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
});
