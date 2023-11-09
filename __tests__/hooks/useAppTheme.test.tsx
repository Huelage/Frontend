import { useAppSelector } from "@api/app/appHooks";
import { useAppTheme } from "@hooks";
import { renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../testhelpers";

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
      cardBg2: "#F5F5F5",
      cardShadow: "rgba(76, 175, 80, 0.61)",
      chartBg: "#D9D9D9",
      danger: "#E93525",
      dangerDim: "rgba(233, 53, 37, .61)",
      filterBg: "#F3F3F3",
      main: "#FFF",
      defaultBg: "#F2F2F2",
      mainBg: "#FFF",
      mainText: "#000",
      mainTextDim: "rgba(0, 0, 0, .61)",
      mainGreen: "#4CAF50",
      mainGreenOpaque: "rgba(76, 175, 80, .3)",
      modalBg: "#FFF",
      searchBg: "#F3F3F3",
      searchText: "#626262",
      tabBg: "#F5F5F5"
    });
  });
});
