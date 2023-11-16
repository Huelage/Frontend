import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getAccessToken, getTheme, getVendorStatus } from "@api/slices/globalSlice";
import { AuthStackNavigator, MainNavigator, StackNavigator, UserOrdersTabStack, UserProfileTabStack, UserStackNavigator, UserTabNavigator, UserVendorsTabStack, VendorAccountTabStack, VendorMenuTabStack, VendorOrdersTabStack, VendorStackNavigator, VendorTabNavigator } from "@navigators";
import { render, screen } from "@testing-library/react-native";
import { useColorScheme } from "react-native";
import { renderApollo, renderApolloNavigator, renderNavigator } from "./testhelpers";

describe("When Testing the Navigators: ", () => {
  describe("<AuthStackNavigator />: ", () => {
    beforeEach(() => {
      renderNavigator(<AuthStackNavigator />);
    });
    it("should render the initialScreen (OnBoardScreen)", () => {
      expect(screen.getByTestId("onboard screen")).toBeOnTheScreen();
    });
  });

  describe("<MainNavigator />: ", () => {
    describe("When user is not signed in: ", () => {
      it("should render the OnBoardScreen", () => {
        const dispatch = jest.fn();
        (useAppSelector as jest.Mock).mockReturnValue(false);
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("onboard screen")).toBeOnTheScreen();
      });
    });
    describe("When user is signed in: ", () => {
      it("should render the vendor flow HomeScreen if user is a vendor", () => {
        const dispatch = jest.fn();
        (useAppSelector as jest.Mock).mockImplementation(selector => {
          if (selector === getAccessToken) return "123";
          if (selector === getVendorStatus) return true;
          if (selector === getTheme) return "dark";
        });
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
      });
      it("should render the user flow HomeScreen if user is not a vendor", () => {
        const dispatch = jest.fn();
        (useAppSelector as jest.Mock).mockImplementation(selector => {
          if (selector === getAccessToken) return "123";
          if (selector === getVendorStatus) return false;
        });
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
      });
    });
    // Testing auto theme switch
    it("should switch to system theme if the theme type is system", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue("system");
      (useColorScheme as jest.Mock).mockReturnValue("dark");
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<MainNavigator />);
      expect(dispatch).toBeCalledWith({ payload: "dark", type: "global/switchTheme" });
    });
    it("should not switch to system theme if the theme type is not system", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue("manual");
      (useColorScheme as jest.Mock).mockReturnValue("dark");
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<MainNavigator />);
      expect(dispatch).not.toBeCalledWith({ payload: "dark", type: "global/switchTheme" });
    });
    it("should default to dark theme if the nativeTheme is not available", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue("system");
      (useColorScheme as jest.Mock).mockReturnValue(undefined);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<MainNavigator />);
      expect(dispatch).toBeCalledWith({ payload: "dark", type: "global/switchTheme" });
    });
  });

  describe("<StackNavigator />", () => {
    it("should render the vendor flow HomeScreen if user is a vendor", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNavigator(<StackNavigator />);
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
    it("should render the user flow HomeScreen if user is not a vendor", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNavigator(<StackNavigator />);
      expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
    });
    it("should dispatch setShowOnboard(false) if showOnboard is true", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNavigator(<StackNavigator />);
      expect(dispatch).toBeCalledWith({ payload: false, type: "global/setShowOnboard" });
    });
    it("should not dispatch setShowOnboard(false) if showOnboard is false", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNavigator(<StackNavigator />);
      expect(dispatch).not.toBeCalledWith({ payload: false, type: "global/setShowOnboard" });
    });
  });

  describe("<UserStackNavigator />", () => {
    it("should render the user flow HomeScreen", () => {
      renderNavigator(<UserStackNavigator />);
      expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
    });
  });

  describe("<UserTabNavigator />", () => {
    it("should render the user flow HomeScreen", () => {
      renderNavigator(<UserTabNavigator />);
      expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
    });
  });

  describe("<VendorStackNavigator />", () => {
    it("should render the vendor flow HomeScreen", () => {
      renderNavigator(<VendorStackNavigator />);
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
  });

  describe("<VendorTabNavigator />", () => {
    it("should render the vendor flow HomeScreen", () => {
      renderNavigator(<VendorTabNavigator />);
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
  });

  describe("When Testing User Tab Stack Navigators: ", () => {
    describe("<UserOrdersTabStack />: ", () => {
      it("should render the MyOrdersScreen", () => {
        renderNavigator(<UserOrdersTabStack />);
        expect(screen.getByTestId("order screen")).toBeOnTheScreen();
      });
    });
    describe("<UserProfileTabStack />: ", () => {
      it("should render the ProfileScreen", () => {
        renderApolloNavigator(<UserProfileTabStack />, []);
        expect(screen.getByTestId("profile screen")).toBeOnTheScreen();
      });
    });
    describe("<UserVendorsTabStack />: ", () => {
      it("should render the VendorScreen", () => {
        renderNavigator(<UserVendorsTabStack />);
        expect(screen.getByTestId("vendor list screen")).toBeOnTheScreen();
      });
    });
  });

  describe("When Testing Vendor Tab Stack Navigators: ", () => {
    describe("<VendorAccountTabStack />: ", () => {
      it("should render the AccountScreen", () => {
        renderNavigator(<VendorAccountTabStack />);
        expect(screen.getByTestId("account screen")).toBeOnTheScreen();
      });
    });
    describe("<VendorMenuTabScreen />: ", () => {
      it("should render the MenuScreen", () => {
        renderNavigator(<VendorMenuTabStack />);
        expect(screen.getByTestId("menu screen")).toBeOnTheScreen();
      });
    });
    describe("<VendorOrdersTabStack />: ", () => {
      it("should render the OrderScreen", () => {
        renderNavigator(<VendorOrdersTabStack />);
        expect(screen.getByTestId("order screen")).toBeOnTheScreen();
      });
    });
  });
});