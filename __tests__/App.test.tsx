import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getAuthStatus, getCart, getTheme, getVendorStatus } from "@api/slices/globalSlice";
import { render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "./testhelpers";

describe("Testing App", () => {
  it("should be 1", () => {
    expect(1).toBe(1);
  });
  it("Should render correctly", async () => {
    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === getAuthStatus) return true;
      if (selector === getTheme) return "dark";
      if (selector === getVendorStatus) return true;
      if (selector === getCart) return [];
    });
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
  });
});