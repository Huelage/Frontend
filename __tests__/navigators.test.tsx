import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { getEntity, getTheme, getVendorStatus } from "@api/slices/globalSlice";
import { AuthStackNavigator, MainNavigator, StackNavigator, UserOrdersTabStack, UserProfileTabStack, UserStackNavigator, UserTabNavigator, UserVendorsTabStack, VendorAccountTabStack, VendorMenuTabStack, VendorOrdersTabStack, VendorStackNavigator, VendorTabNavigator } from "@navigators";
import { render, screen } from "@testing-library/react-native";
import { renderNavigator } from "./testhelpers";
import { useColorScheme } from "react-native";

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
        (useAppSelector as jest.Mock).mockReturnValue(false);
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("onboard screen")).toBeOnTheScreen();
      });
    });
    describe("When user is signed in: ", () => {
      it("should render the vendor flow HomeScreen if user is a vendor", () => {
        (useAppSelector as jest.Mock).mockImplementation(selector => {
          if (selector === getEntity) return { id: "123231" };
          if (selector === getVendorStatus) return true;
          if (selector === getTheme) return "dark";
        });
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
      });
      it("should render the user flow HomeScreen if user is not a vendor", () => {
        (useAppSelector as jest.Mock).mockImplementation(selector => {
          if (selector === getEntity) return { id: "123231" };
          if (selector === getVendorStatus) return false;
        });
        const mockDispatch = jest.fn();
        (useColorScheme as jest.Mock).mockReturnValue("dark");
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        render(<MainNavigator />);
        expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
      });
    });
  });

  describe("<StackNavigator />", () => {
    it("should render the vendor flow HomeScreen if user is a vendor", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      const mockDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
      renderNavigator(<StackNavigator />);
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
    it("should render the user flow HomeScreen if user is not a vendor", () => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      const mockDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
      renderNavigator(<StackNavigator />);
      expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
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
        expect(screen.getByTestId("my orders screen")).toBeOnTheScreen();
      });
    });
    describe("<UserProfileTabStack />: ", () => {
      it("should render the ProfileScreen", () => {
        renderNavigator(<UserProfileTabStack />);
        expect(screen.getByTestId("profile screen")).toBeOnTheScreen();
      });
    });
    describe("<UserVendorsTabStack />: ", () => {
      it("should render the VendorScreen", () => {
        renderNavigator(<UserVendorsTabStack />);
        expect(screen.getByTestId("vendor screen")).toBeOnTheScreen();
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