import { act, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
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
      (element) => element.tagName === "TEXTAREA"
    ) as HTMLTextAreaElement;
    input = textboxes.find(
      (element) => element.tagName === "INPUT"
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

  it("should retain the previous prime number and add a new one in a new line upon deletion", async () => {
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: async () => ({ primes: "11" }), // First response for 2-digit input
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ primes: "3" }), // Second response for 1-digit input
        ok: true,
      });

    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });

    if (!textarea) {
      throw new Error("textarea is not available in DOM");
    }
    expect(textarea.textContent).toMatch(/11/);

    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });

    if (!textarea) {
      throw new Error("textarea is not available in DOM");
    }
    expect(textarea.textContent).toMatch(/11\n3/);
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
});
