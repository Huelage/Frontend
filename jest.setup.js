import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

require("react-native-reanimated/src/reanimated2/jestUtils").setUpTests();
jest.useFakeTimers();
jest.mock("react-native/Libraries/Image/Image", () => ({
  ...jest.requireActual("react-native/Libraries/Image/Image"),
  resolveAssetSource: () => ({ uri: "image" }),
}));
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: jest.fn()
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("@expo-google-fonts/dev", () => ({
  ...jest.requireActual("@expo-google-fonts/dev"),
  useFonts: jest.fn(() => [true]),
}));
jest.mock("@api/app/appHooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));
jest.mock("@utils", () => ({
  ...jest.requireActual("@utils"),
  getBiometrics: jest.fn(() => Promise.resolve({ hasBiometrics: true, biometricType: [1], isEnrolled: false })),
  loginWithBiometrics: jest.fn(() => Promise.resolve("123")),
  enableBiometrics: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(),
  setItem: jest.fn(),
  showError: jest.fn(),
  showSuccess: jest.fn()
}));
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
  })),
  useRoute: jest.fn()
}));
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(() => Promise.resolve()),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve())
}));
jest.mock("expo-local-authentication", () => ({
  ...jest.requireActual("expo-local-authentication"),
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  isEnrolledAsync: jest.fn(() => Promise.resolve(true)),
  supportedAuthenticationTypesAsync: jest.fn(() => Promise.resolve([1])),
}));
jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));
jest.mock("react-native-flash-message", () => ({
  ...jest.requireActual("react-native-flash-message"),
  showMessage: jest.fn()
}));