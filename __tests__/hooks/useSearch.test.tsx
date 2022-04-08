import { setupServer } from "msw/node";
import { rest } from "msw";
import fakePeriods from "../../utils/constants/FakePeriods";
import { renderHook } from "@testing-library/react-hooks";
import { createEvent } from "@testing-library/react";
import useSearch from "../../hooks/useSearch";
import { act } from "react-dom/test-utils";
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

const server500 = setupServer(
  rest.get("/api/forecast", (_, res, ctx) => {
    return res(ctx.status(400), ctx.json({}));
  })
);

describe("useSearch hook", () => {
  const createMockEvent = () => {
    const event = createEvent.submit(document.createElement("form"));
    event.preventDefault = jest.fn();
    return event;
  };

  it("should send an address and save results on 200", async () => {
    server200.listen();
    const event = createMockEvent();
    const { result } = renderHook(() => useSearch("New address"));
    await act(async () => {
      await result.current.handleSearch(event);
    });
    expect(event.preventDefault).toBeCalledTimes(1);
    expect(result.current.results).toMatchObject(fakePeriods);
    expect(result.current.message).toBe("");
    server200.close();
  });

  it("should save the error message on 300+", async () => {
    server400.listen();
    const event = createMockEvent();
    const { result } = renderHook(() => useSearch(""));
    await act(async () => {
      await result.current.handleSearch(event);
    });
    expect(result.current.results).toMatchObject([]);
    expect(result.current.message).toBe(TEST_ERROR_MESSAGE);
    server400.close();
  });

  it("should save default error message when server response with a 300+ and data.message is falsy", async () => {
    server500.listen();
    const event = createMockEvent();
    const { result } = renderHook(() => useSearch(""));
    await act(async () => {
      await result.current.handleSearch(event);
    });
    expect(result.current.results).toMatchObject([]);
    expect(result.current.message).toBe("An unexpected problem has occurred");
    server500.close();
  });
});
