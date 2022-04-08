import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "@/pages/index";
import { setupServer } from "msw/node";
import { rest } from "msw";
import fakePeriods from "../../utils/constants/FakePeriods";

const TEST_ADDRESS = "301 Arizona Ave #250, Santa Monica";
const TEST_ERROR_MESSAGE = "Test error message";

const server200 = setupServer(
  rest.get("/api/forecast", (req, res, ctx) => {
    const periods = req.url.searchParams.get("address") ? fakePeriods : [];
    return res(ctx.status(200), ctx.json({ periods }));
  })
);

const server400 = setupServer(
  rest.get("/api/forecast", (_, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: TEST_ERROR_MESSAGE }));
  })
);

describe("The forecast app", () => {
  const setUp = () => {
    return render(<Home />);
  };
  it("should add anddress on input change", () => {
    setUp();
    let input = screen.queryByPlaceholderText(
      "Insert an address..."
    ) as HTMLInputElement;
    expect(input.value).toBeFalsy();
    fireEvent.change(input, { target: { value: TEST_ADDRESS } });
    input = screen.queryByPlaceholderText(
      "Insert an address..."
    ) as HTMLInputElement;
    expect(input.value).toBe(TEST_ADDRESS);
  });

  it("should display forecast days and card on search", async () => {
    server200.listen();
    act(() => {
      setUp();
    });
    let input = screen.queryByPlaceholderText(
      "Insert an address..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: TEST_ADDRESS } });
    let form = screen.queryByTestId("search-form") as HTMLFormElement;
    fireEvent.submit(form);
    await waitFor(() => {
      screen.getByTestId("forecast-card");
    });
    expect(screen.getByTestId("forecast-card")).toBeInTheDocument();
    expect(
      screen.getByTestId("forecast-buttons-wrapper")?.children?.length
    ).toBe(7);
    server200.close();
  });
});
