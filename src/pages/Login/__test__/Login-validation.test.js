import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

import Login from "../Login";

describe("Tests Login form input validation", () => {
  it("should display error label when leaving username empty", async () => {
    render(<Login />);

    fireEvent.click(screen.getByText(/LOGIN/i));
    const helperText = await screen.findByText("username is a required field");
    expect(helperText).toBeVisible();
  });

  it("should display error label when inputing an username with less than 6 characters", async () => {
    act(() => {
      render(<Login />);
    });

    const usernameInput = screen.getByTestId("username");

    await act(async () => {
      await user.type(usernameInput, "ABCDE");
      expect(usernameInput.value).toBe("ABCDE");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#username-helper-text");
    expect(helperText).toHaveTextContent(
      "Username must be at least 6 characters"
    );
  });

  it("should display error label when leaving email empty", async () => {
    render(<Login />);

    fireEvent.click(screen.getByText(/LOGIN/i));
    const helperText = await screen.findByText("email is a required field");
    expect(helperText).toBeVisible();
  });

  it("should display error label when email is not a valid", async () => {
    act(() => {
      render(<Login />);
    });

    const emailInput = screen.getByTestId("email");

    await act(async () => {
      await user.type(emailInput, "notValidEmail");
      expect(emailInput.value).toBe("notValidEmail");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#email-helper-text");
    expect(helperText).toHaveTextContent("email must be a valid email");
  });

  it("should display error label if password doens't have at least 8 characters", async () => {
    render(<Login />);

    fireEvent.click(screen.getByText(/LOGIN/i));
    const helperText = await screen.findByText(
      "password must be at least 8 characters"
    );
    expect(helperText).toBeVisible();
  });

  it("should display error label if password doens't have at least 1 uppercase character", async () => {
    act(() => {
      render(<Login />);
    });

    const passwordInput = screen.getByTestId("password");

    await act(async () => {
      await user.type(passwordInput, "passwordnouppercase");
      expect(passwordInput.value).toBe("passwordnouppercase");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#password-helper-text");
    expect(helperText).toHaveTextContent(
      "password must contain at least 1 uppercase letter"
    );
  });

  it("should display error label if password doens't have at least 1 lowercase character", async () => {
    act(() => {
      render(<Login />);
    });

    const passwordInput = screen.getByTestId("password");

    await act(async () => {
      await user.type(passwordInput, "PASSWORDNOLOWERCASE");
      expect(passwordInput.value).toBe("PASSWORDNOLOWERCASE");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#password-helper-text");
    expect(helperText).toHaveTextContent(
      "password must contain at least 1 lowercase letter"
    );
  });

  it("should display error label if password doens't have at least 1 number character", async () => {
    act(() => {
      render(<Login />);
    });

    const passwordInput = screen.getByTestId("password");

    await act(async () => {
      await user.type(passwordInput, "passwordWithNoNumber");
      expect(passwordInput.value).toBe("passwordWithNoNumber");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#password-helper-text");
    expect(helperText).toHaveTextContent(
      "password must contain at least 1 number"
    );
  });

  it("should display error label if password doens't have at least 1 symbol character", async () => {
    act(() => {
      render(<Login />);
    });

    const passwordInput = screen.getByTestId("password");

    await act(async () => {
      await user.type(passwordInput, "passwordWithNoSymbols1");
      expect(passwordInput.value).toBe("passwordWithNoSymbols1");
      await user.click(screen.getByText(/LOGIN/i));
    });
    const helperText = document.querySelector("#password-helper-text");
    expect(helperText).toHaveTextContent(
      "password must contain at least 1 symbol"
    );
  });

  it("should update password input to a text input after clicking the 'eye' button", async () => {
    act(() => {
      render(<Login />);
    });

    const passwordInput = screen.getByTestId("password");
    expect(passwordInput.type).toBe("password");

    await act(async () => {
      await user.click(screen.getByTestId("show-password"));
    });

    expect(passwordInput.type).toBe("text");

    await act(async () => {
      await user.click(screen.getByTestId("show-password"));
    });

    expect(passwordInput.type).toBe("password");
  });

  it("should display 'Register here!' text initially", () => {
    render(<Login />);

    const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
    expect(loginRegisterText).toBeVisible();
    expect(loginRegisterText).toHaveTextContent(
      "You don't have an account? Register here!"
    );
  });

  it("should display 'Login here!' text after being clicked", () => {
    render(<Login />);

    const loginRegisterText = screen.getByTestId("loginRegisterSwitch");
    fireEvent.click(loginRegisterText);

    expect(loginRegisterText).toBeVisible();
    expect(loginRegisterText).toHaveTextContent(
      "You already have an account? Login here!"
    );
  });
});