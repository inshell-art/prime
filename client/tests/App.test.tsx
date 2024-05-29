import { act, render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import React from "react";

//TODO: improve branch coverage

jest.mock("../src/config", () => ({
  server_api: "http://localhost:3000",
}));

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

  it("should save draft when the conditions are met", async () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn();

    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });

    fireEvent.click(button);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    createElementSpy.mockRestore();
    URL.createObjectURL = originalCreateObjectURL;
  });

  // Enhanced: Added test to focus input on document click
  it("should focus input on document click", () => {
    fireEvent.click(document);

    expect(input).toHaveFocus();
  });

  afterEach(() => {
    // Clean up the mock to avoid leakage between tests
    delete (global as any).import;
  });
});
