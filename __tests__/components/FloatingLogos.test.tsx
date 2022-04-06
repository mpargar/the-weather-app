import { render, screen } from "@testing-library/react";
import FloatingLogos from "@/components/FloatingLogos/FloatingLogos";
import {
  DISTILLERY_LOGO_ALT,
  INSIGHT2PROFIT_LOGO_ALT,
} from "../../utils/constants/FloatingLogos";

describe("FloatingLogos", () => {
  const setUp = () => {
    return render(<FloatingLogos />);
  };
  it("Should display container and its children", () => {
    setUp();
    const wrapper = screen.queryByTestId("floating-logos-container");
    expect(wrapper).toBeInTheDocument();
    const images = screen.queryAllByRole("img");
    expect(images.length).toBe(2);
  });

  it("Should render distillery logo", () => {
    setUp();
    const image = screen.queryByAltText(
      DISTILLERY_LOGO_ALT
    ) as HTMLImageElement;
    expect(image.src).toContain("/img/distillery.svg");
  });

  it("Should render insight2profit logo", () => {
    setUp();
    const image = screen.queryByAltText(
      INSIGHT2PROFIT_LOGO_ALT
    ) as HTMLImageElement;
    expect(image.src).toContain("/img/insight2profit.svg");
  });
});
