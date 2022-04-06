import Input, { IInputProps } from "@/components/Input/Input";
import styles from "@/components/Input/Input.module.scss";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

describe("Input", () => {
  const setUp = (props: IInputProps) => {
    return render(<Input {...props} />);
  };
  it("Should render label and input", () => {
    setUp({
      id: "",
      value: "",
      placeholder: "",
    });
    const label = screen.queryByRole("label");
    expect(label).toBeInTheDocument();
    const input = screen.queryByRole("input");
    expect(input).toBeInTheDocument();
  });

  it("id should exists on label and input", () => {
    const id = "testId";
    setUp({
      id,
      value: "",
      placeholder: "",
    });
    const input = screen.queryByRole("input") as HTMLInputElement;
    expect(input.id).toBe(id);
    const label = screen.queryByRole("label") as HTMLLabelElement;
    expect(label.htmlFor).toBe(id);
  });

  it("Label should be a fake placeholder", () => {
    const props: IInputProps = {
      id: "TestId",
      value: "",
      placeholder: "Placeholder test",
    };
    const { rerender } = setUp(props);
    let input = screen.queryByRole("input") as HTMLInputElement;
    expect(input.placeholder).toBe(props.placeholder);
    expect(input.value).toBe(props.value);
    let label = screen.queryByRole("label") as HTMLInputElement;
    expect(label.innerHTML).toBe(props.placeholder);
    expect(label.className).toBe("");
    props.value = "New input value";
    rerender(<Input {...props} />);
    input = screen.queryByRole("input") as HTMLInputElement;
    expect(input.value).toBe(props.value);
    label = screen.queryByRole("label") as HTMLInputElement;
    expect(label.innerHTML).toBe(props.placeholder);
    expect(label.className).toBe(styles.active);
  });

  it("Should display postponecomponent if prop exists", () => {
    const testId = "postponeComponent";
    const props: IInputProps = {
      id: "",
      value: "",
      placeholder: "",
      postponeComponent: undefined,
    };
    const { rerender } = setUp(props);
    let postponeComponent = screen.queryByTestId(testId);
    expect(postponeComponent).not.toBeInTheDocument();
    props.postponeComponent = <div>Hola</div>;
    rerender(<Input {...props} />);
    postponeComponent = screen.queryByTestId(testId);
    expect(postponeComponent).toBeInTheDocument();
  });

  it("Should display message if prop exists", () => {
    const props: IInputProps = {
      id: "",
      value: "",
      placeholder: "",
      message: undefined,
    };
    const { rerender } = setUp(props);
    let errorMessage = screen.queryByTestId("message");
    expect(errorMessage).not.toBeInTheDocument();
    props.message = "Mensaje haha";
    rerender(<Input {...props} />);
    errorMessage = screen.queryByTestId("message");
    expect(errorMessage).toBeInTheDocument();
    props.message = "";
    rerender(<Input {...props} />);
    errorMessage = screen.queryByTestId("message");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("Should exec onChange callback on input change event is fired", () => {
    const fakeEvent = { target: { value: "TEST VALUE" } };
    const onChangeMock = jest.fn();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeMock(e.target.value);
    const props: IInputProps = {
      id: "",
      value: "",
      placeholder: "",
      onChange,
    };
    setUp(props);
    const input = screen.getByRole("input");
    fireEvent.change(input, fakeEvent);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(fakeEvent.target.value);
  });
});
