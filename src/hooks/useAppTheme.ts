import { useAppSelector } from "@api/app/appHooks";
import { getTheme } from "@api/slices/globalSlice";

const useAppTheme = () => {
  const theme = useAppSelector(getTheme);
  const color = colors[theme] || colors.dark;
  return { color, theme };
};

const colors = {
  dark: {
    accentText: "#fff",
    cardBg: "#141414",
    chartBg: "#333333",
    filterBg: "#181818",
    main: "#000",
    mainBg: "#181818",
    mainText: "#fff",
    mainGreen: "#5BCF5F",
    modalBg: "#0D0D0D",
    searchBg: "#4F4F4F",
    searchText: "#fff"
  },
  light: {
    accentText: "#626262",
    cardBg: "#F0FFF0",
    chartBg: "#D9D9D9",
    filterBg: "#F3F3F3",
    main: "#fff",
    mainBg: "#fff",
    mainText: "#000",
    mainGreen: "#4CAF50",
    modalBg: "#fff",
    searchBg: "#F3F3F3",
    searchText: "#626262"
  }
};

export default useAppTheme;