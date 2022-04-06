import distilleryLogo from "../../public/img/distillery.svg";
import { render, screen } from "@testing-library/react";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import styles from "@/components/LoadingIcon/LoadingIcon.module.scss";

describe("LoadingIcon", () => {
  it("Should render loading icon correctly", () => {
    render(<LoadingIcon />);
    const img = screen.queryByTestId("custom-loading-icon") as HTMLImageElement;
    expect(img.className).toBe(styles.rotate);
    expect(img.alt).toBe("Sun loading icon");
    expect(img.src).toContain("/img/white-balance-sunny.svg");
  });
});
