import { useAppTheme } from "@hooks";
import { renderHook } from "@testing-library/react-native";
import { store } from "../testhelpers";
import { Provider } from "react-redux";
import { useAppSelector } from "@api/app/appHooks";

describe("When Testing useAppTheme Custom Hook", () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue("light");
  });
  it("should return the correct theme", () => {
    const { result } = renderHook(() => useAppTheme(), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          {children}
        </Provider>
      )
    });
    expect(result.current.theme).toEqual("light");
  });
  it("should return the correct theme colors", () => {
    const { result } = renderHook(() => useAppTheme(), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          {children}
        </Provider>
      )
    });
    expect(result.current.color).toEqual({
      accentText: "#626262",
      cardBg: "#F0FFF0",
      chartBg: "#D9D9D9",
      filterBg: "#F3F3F3",
      main: "#fff",
      defaultBg: "#f2f2f2",
      mainBg: "#fff",
      mainText: "#000",
      mainGreen: "#4CAF50",
      modalBg: "#fff",
      searchBg: "#F3F3F3",
      searchText: "#626262"
    });
  });
});
