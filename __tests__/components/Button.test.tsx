import Button, { IButton } from "@/components/Button/Button";
import { render } from "@testing-library/react";

describe("Button", () => {
  const setUp = (props: IButton) => {
    return {
      ...render(<Button {...props} />),
      props,
    };
  };
  it("Should render correctly with the minimum params", async () => {
    const buttonChildren = "Hello world";
    const { findByText } = setUp({
      children: buttonChildren,
      styleType: "primary",
    });
    const button = await findByText(buttonChildren);
    expect(button).toBeInTheDocument();
  });
  it("Should render children when loading prop is falsy and LoadingIcon when its truthy", () => {
    const buttonChildren = "Hello world";
    const { queryByText, queryByTestId, debug, rerender, props } = setUp({
      children: buttonChildren,
      styleType: "primary",
      loading: false,
    });
    let button = queryByText(buttonChildren);
    expect(button).toBeInTheDocument();
    let loadingIcon = queryByTestId("custom-loading-icon");
    expect(loadingIcon).not.toBeInTheDocument();
    props.loading = true;
    rerender(<Button {...props} />);
    button = queryByText(buttonChildren);
    expect(button).not.toBeInTheDocument();
    loadingIcon = queryByTestId("custom-loading-icon");
    expect(loadingIcon).toBeInTheDocument();
    props.loading = false;
    rerender(<Button {...props} />);
    button = queryByText(buttonChildren);
    expect(button).toBeInTheDocument();
    loadingIcon = queryByTestId("custom-loading-icon");
    expect(loadingIcon).not.toBeInTheDocument();
  });
  it("Should get disabled when disabled prop is true or when loading prop is true", async () => {
    const buttonChildren = "Hello world";
    const { findByTestId, rerender, props, debug } = setUp({
      children: buttonChildren,
      styleType: "primary",
      loading: false,
      disabled: false,
    });
    const rerenderBtn = async (loading: boolean, disabled: boolean) => {
      props.disabled = disabled;
      props.loading = loading;
      rerender(<Button {...props} />);
      return findByTestId("custom-button");
    };
    let button = (await findByTestId("custom-button")) as HTMLButtonElement;

    expect(button.disabled).toBeFalsy();
    button = (await rerenderBtn(true, false)) as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
    button = (await rerenderBtn(false, true)) as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
    button = (await rerenderBtn(true, true)) as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
    button = (await rerenderBtn(false, false)) as HTMLButtonElement;
    expect(button.disabled).toBeFalsy();
  });
});
