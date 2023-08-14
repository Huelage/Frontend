import { useAppSelector } from "@api/app/appHooks";
import { getTheme } from "@api/slices/globalSlice";
import { colors } from "@utils";

const useAppTheme = () => {
  const theme = useAppSelector(getTheme);
  const color = colors[theme];
  return { color, theme };
};

export default useAppTheme;