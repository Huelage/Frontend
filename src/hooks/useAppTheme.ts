import { useAppSelector } from "@api/app/appHooks";
import { getTheme } from "@api/slices/globalSlice";

const useAppTheme = () => {
  const theme = useAppSelector(getTheme);
  const color = colors[theme] || colors.dark;
  return { color, theme };
};

const colors = {
  dark: {
    accentText: "#FFF",
    cardBg: "#141414",
    cardShadow: "rgba(0, 0, 0, 0.61)",
    chartBg: "#333333",
    filterBg: "#181818",
    main: "#000",
    defaultBg: "#000",
    mainBg: "#181818",
    mainText: "#FFF",
    mainGreen: "#5BCF5F",
    mainGreenOpaque: "rgba(91, 207, 95, .3)",
    modalBg: "#0D0D0D",
    searchBg: "#4F4F4F",
    searchText: "#FFF",
    tabBg: "#000",
  },
  light: {
    accentText: "#626262",
    cardBg: "#F0FFF0",
    cardShadow: "rgba(76, 175, 80, 0.61)",
    chartBg: "#D9D9D9",
    filterBg: "#F3F3F3",
    main: "#FFF",
    defaultBg: "#F2F2F2",
    mainBg: "#FFF",
    mainText: "#000",
    mainGreen: "#4CAF50",
    mainGreenOpaque: "rgba(76, 175, 80, .3)",
    modalBg: "#FFF",
    searchBg: "#F3F3F3",
    searchText: "#626262",
    tabBg: "#F5F5F5"
  }
};

export default useAppTheme;