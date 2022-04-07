import { setupServer } from "msw/node";
import { rest } from "msw";
import fakePeriods from "../../utils/constants/FakePeriods";
import { renderHook } from "@testing-library/react-hooks";
import { createEvent } from "@testing-library/react";
import useSearch from "../../hooks/useSearch";
import { act } from "react-dom/test-utils";

const server200 = setupServer(
  rest.get("/api/forecast", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ periods: fakePeriods }));
  })
);

describe("useSearch hook", () => {
  it("should save results on 200", async () => {
    server200.listen();
    const preventDefault = jest.fn();
    const event = createEvent.submit(document.createElement("form"));
    event.preventDefault = preventDefault;
    const { result } = renderHook(() => useSearch(""));
    await act(async () => {
      await result.current.handleSearch(event);
    });
    expect(result.current.results).toMatchObject(fakePeriods);
    server200.close();
  });
});
