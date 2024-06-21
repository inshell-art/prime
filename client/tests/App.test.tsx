import { act, render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import React from "react";

describe("App Component", () => {
  let textarea: HTMLTextAreaElement;
  let input: HTMLInputElement;
  let button: HTMLElement;

  beforeEach(() => {
    render(<App />);

    const textboxes = screen.getAllByRole("textbox");
    textarea = textboxes.find(
      (element) => element.tagName === "TEXTAREA",
    ) as HTMLTextAreaElement;
    input = textboxes.find(
      (element) => element.tagName === "INPUT",
    ) as HTMLInputElement;
    button = screen.getByRole("button", { name: "Save" });
  });

  it("should render textarea, input, and button correctly", () => {
    expect(textarea).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should handle input change", () => {
    fireEvent.change(input, { target: { value: "5" } });

    expect(input.value).toBe("5");
  });

  it("should fetch and display data", async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({ primes: "11" }),
      ok: true,
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });

    expect(screen.getByText(/11/)).toBeInTheDocument();
  });

  it("should handle fetch errors for internal server error", async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Internal Server Error" }),
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });

    expect(screen.getByText(/Internal Server Error/)).toBeInTheDocument();
  });

  it("should handle fetch errors for no prime found", async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ primes: "" }),
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });

    expect(screen.getByText(/No prime found/)).toBeInTheDocument();
  });

  it("should not fetch data when input is empty", async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ primes: "" }),
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });

    expect(window.fetch).not.toHaveBeenCalled();
  });

  it("should handle fetch exception", async () => {
    window.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    await act(async () => {
      fireEvent.change(input, { target: { value: "error" } });
    });

    expect(
      screen.getByText(/Failed to fetch data. Error: Network Error/),
    ).toBeInTheDocument();
  });

  it("should save draft when the conditions are met", async () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn();

    //suppress console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();

    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });

    fireEvent.click(button);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    createElementSpy.mockRestore();
    URL.createObjectURL = originalCreateObjectURL;
    console.error = originalConsoleError;
  });

  it("should focus input if both inputValue and response are empty when saving draft", async () => {
    const originalError = console.error;
    console.error = jest.fn();

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });

    fireEvent.click(button);

    expect(input).toHaveFocus();
    console.error = originalError;
  });

  it("should focus input on document click", () => {
    const originalError = console.error;
    console.error = jest.fn();

    fireEvent.click(document);

    expect(input).toHaveFocus();

    console.error = originalError;
  });

  afterEach(() => {
    // Clean up the mock to avoid leakage between tests
    delete (global as any).import;
  });
});
