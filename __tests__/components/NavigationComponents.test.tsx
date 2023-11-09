import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { mockCartItems } from "@api/mock";
import { getCart, getEntity, getTheme, getThemeType } from "@api/slices/globalSlice";
import { OrderBar, UserTabBar, UserTabHeader, VendorTabBar, VendorTabHeader } from "@components/navigation";
import { UserTabParamList, VendorTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Platform, Text } from "react-native";
import { entity, renderNavigator } from "../testhelpers";

describe("When Testing User Navigation Components: ", () => {
  const Tab = createBottomTabNavigator<UserTabParamList>();
  const TestComp = () => <Text>test component</Text>;
  const TestComp2 = () => <Text>test component 2</Text>;
  const TestComp3 = () => <Text>test component 3</Text>;
  const TestComp4 = () => <Text>test component 4</Text>;
  const renderNav = () => {
    renderNavigator(
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ header: () => <UserTabHeader /> }}
        tabBar={props => <UserTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={TestComp} />
        <Tab.Screen name="Vendors" component={TestComp2} />
        <Tab.Screen name="My Orders" component={TestComp3} />
        <Tab.Screen name="Profile" component={TestComp4} />
      </Tab.Navigator>
    );
  };

  describe("<UserTabBar />: ", () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return entity;
        if (selector === getThemeType) return "manual";
        if (selector === getCart) return mockCartItems;
      });
      renderNav();
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("user tab bar")).toBeOnTheScreen();
    });
    it("should also render the component correctly on android", () => {
      Platform.OS = "android";
      renderNav();
      expect(screen.getByTestId("user tab bar")).toBeOnTheScreen();
      Platform.OS = "ios";
    });
    it("should render the correct number of tabs", () => {
      expect(screen.getAllByTestId(/tab button/i)).toHaveLength(4);
    });
    it("should render the correct tab labels", () => {
      expect(screen.getByText("Home")).toBeOnTheScreen();
      expect(screen.getByText("Vendors")).toBeOnTheScreen();
      expect(screen.getByText("My Orders")).toBeOnTheScreen();
      expect(screen.getByText("Profile")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should do nothing when the current tab is pressed", () => {
      const homeButton = screen.getByTestId("Home tab button");
      expect(screen.getByText("test component")).toBeOnTheScreen();
      fireEvent.press(homeButton);
      expect(screen.getByText("test component")).toBeOnTheScreen();
    });
    it("should navigate to the vendors screen when the tab is pressed", () => {
      const vendorButton = screen.getByTestId("Vendors tab button");
      expect(screen.queryByText("test component 2")).toBeNull();
      fireEvent.press(vendorButton);
      expect(screen.getByText("test component 2")).toBeOnTheScreen();
    });
    it("should navigate to the my orders screen when the tab is pressed", () => {
      const ordersButton = screen.getByTestId("My Orders tab button");
      expect(screen.queryByText("test component 3")).toBeNull();
      fireEvent.press(ordersButton);
      expect(screen.getByText("test component 3")).toBeOnTheScreen();
    });
    it("should navigate to the profile screen when the tab is pressed", () => {
      const profileButton = screen.getByTestId("Profile tab button");
      expect(screen.queryByText("test component 4")).toBeNull();
      fireEvent.press(profileButton);
      expect(screen.getByText("test component 4")).toBeOnTheScreen();
    });
  });

  describe("<UserTabHeader />: ", () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return entity;
        if (selector === getThemeType) return "manual";
        if (selector === getTheme) return "light";
        if (selector === getCart) return mockCartItems;
      });
      renderNav();
    });
    // Testing UI
    it("should render component correctly", async () => {
      expect(screen.getByTestId("user tab header")).toBeOnTheScreen();
    });
    it("should render greeting text", () => {
      expect(screen.getByTestId("greeting text")).toBeOnTheScreen();
    });
    it("should render user image", () => {
      expect(screen.getByTestId("user image")).toBeOnTheScreen();
    });
    it("should render the user image text when the user image is not available", () => {
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return { ...entity, imgUrl: "" };
        if (selector === getThemeType) return "manual";
        if (selector === getTheme) return "light";
        if (selector === getCart) return [];
      });
      renderNav();
      expect(screen.getByTestId("user image text")).toBeOnTheScreen();
      expect(screen.queryByTestId("user image")).toBeNull();
    });
    it("should render user name", () => {
      expect(screen.getByText(`${entity.firstName} ${entity.lastName}`)).toBeOnTheScreen();
    });
    it("should render the theme toggle button", () => {
      expect(screen.getByTestId("theme toggle")).toBeOnTheScreen();
    });
    it("should not render the theme toggle button when the theme is auto", () => {
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return entity;
        if (selector === getThemeType) return "system";
        if (selector === getTheme) return "light";
        if (selector === getCart) return mockCartItems;
      });
      renderNav();
      expect(screen.queryByTestId("theme toggle")).toBeNull();
    });
    it("should render the sun image as the theme toggle button when the theme is dark", () => {
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return entity;
        if (selector === getThemeType) return "manual";
        if (selector === getTheme) return "dark";
        if (selector === getCart) return mockCartItems;
      });
      renderNav();
      expect(screen.getByTestId("theme toggle")).toBeOnTheScreen();
    });
    it("should render the cart button", () => {
      expect(screen.getByTestId("cart button")).toBeOnTheScreen();
    });
    it("should render the cart item length badge", () => {
      expect(screen.getByTestId("cart item length")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should greet the user with the correct time of day", () => {
      const dateSpy = jest.spyOn(Date.prototype, "getHours");
      dateSpy.mockReturnValue(10);
      renderNav();
      expect(screen.getByText("Good morning")).toBeOnTheScreen();
      dateSpy.mockReturnValue(14);
      renderNav();
      expect(screen.getByText("Good afternoon")).toBeOnTheScreen();
      dateSpy.mockReturnValue(20);
      renderNav();
      expect(screen.getByText("Good evening")).toBeOnTheScreen();
      dateSpy.mockRestore();
    });
    it("should switch theme to dark on toggle button press and initial light theme", () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNav();
      const toggleButton = screen.getByTestId("theme toggle");
      fireEvent.press(toggleButton);
      expect(dispatch).toBeCalledWith({ payload: "dark", type: "global/switchTheme" });
    });
    it("should switch theme to light on toggle button press and initial dark theme", () => {
      const dispatch = jest.fn();
      (useAppSelector as jest.Mock).mockImplementation(selector => {
        if (selector === getEntity) return entity;
        if (selector === getThemeType) return "manual";
        if (selector === getTheme) return "dark";
        if (selector === getCart) return mockCartItems;
      });
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNav();
      const toggleButton = screen.getByTestId("theme toggle");
      fireEvent.press(toggleButton);
      expect(dispatch).toBeCalledWith({ payload: "light", type: "global/switchTheme" });
    });
    it("should navigate to the cart screen when the cart button is pressed", () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      renderNav();
      const cartButton = screen.getByTestId("cart button");
      fireEvent.press(cartButton);
      expect(navigate).toBeCalledWith("Cart");
    });
  });
});


describe("When Testing Vendor Navigation Component: ", () => {
  const Tab = createBottomTabNavigator<VendorTabParamList>();
  const TestComp = () => <Text>test component</Text>;
  const TestComp2 = () => <Text>test component 2</Text>;
  const TestComp3 = () => <Text>test component 3</Text>;
  const TestComp4 = () => <Text>test component 4</Text>;
  const renderNav = () => {
    renderNavigator(
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ header: () => <VendorTabHeader /> }}
        tabBar={props => <VendorTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={TestComp} />
        <Tab.Screen name="Orders" component={TestComp2} />
        <Tab.Screen name="Menu" component={TestComp3} />
        <Tab.Screen name="Account" component={TestComp4} />
      </Tab.Navigator>
    );
  };

  describe("<VendorTabBar />: ", () => {
    beforeEach(() => {
      renderNav();
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("vendor tab bar")).toBeOnTheScreen();
    });
    it("should also render the component correctly on android", () => {
      Platform.OS = "android";
      renderNav();
      expect(screen.getByTestId("vendor tab bar")).toBeOnTheScreen();
      Platform.OS = "ios";
    });
    it("should render the correct number of tabs", () => {
      expect(screen.getAllByTestId(/tab button/i)).toHaveLength(4);
    });
    it("should render the correct tab labels", () => {
      expect(screen.getByText("Home")).toBeOnTheScreen();
      expect(screen.getByText("Orders")).toBeOnTheScreen();
      expect(screen.getByText("Menu")).toBeOnTheScreen();
      expect(screen.getByText("Account")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should do nothing when the current tab is pressed", () => {
      const homeButton = screen.getByTestId("Home tab button");
      expect(screen.getByText("test component")).toBeOnTheScreen();
      fireEvent.press(homeButton);
      expect(screen.getByText("test component")).toBeOnTheScreen();
    });
    it("should navigate to the orders screen when the tab is pressed", () => {
      const vendorButton = screen.getByTestId("Orders tab button");
      expect(screen.queryByText("test component 2")).toBeNull();
      fireEvent.press(vendorButton);
      expect(screen.getByText("test component 2")).toBeOnTheScreen();
    });
    it("should navigate to the Menu screen when the tab is pressed", () => {
      const ordersButton = screen.getByTestId("Menu tab button");
      expect(screen.queryByText("test component 3")).toBeNull();
      fireEvent.press(ordersButton);
      expect(screen.getByText("test component 3")).toBeOnTheScreen();
    });
    it("should navigate to the account screen when the tab is pressed", () => {
      const profileButton = screen.getByTestId("Account tab button");
      expect(screen.queryByText("test component 4")).toBeNull();
      fireEvent.press(profileButton);
      expect(screen.getByText("test component 4")).toBeOnTheScreen();
    });
  });

  describe("<VendorTabHeader />: ", () => {
    beforeEach(() => {
      renderNav();
    });
    it("should render correctly", async () => {
      expect(screen.getByTestId("vendor tab header")).toBeOnTheScreen();
    });
    it("should render the vendor name", () => {
      expect(screen.getByTestId("vendor name")).toBeOnTheScreen();
    });
    it("should render the notification button", () => {
      expect(screen.getByTestId("notification button")).toBeOnTheScreen();
    });
    it("should render the notification quantity badge", () => {
      expect(screen.getByTestId("quantity badge")).toBeOnTheScreen();
    });
    it("should render the OrderBar component", () => {
      expect(screen.getByTestId("order bar")).toBeOnTheScreen();
    });
    it("should dispatch clearCredentials when the notification button is pressed", () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderNav();
      const notificationButton = screen.getByTestId("notification button");
      fireEvent.press(notificationButton);
      expect(dispatch).toBeCalledWith({ type: "global/clearCredentials" });
    });
  });

  describe("<OrderBar />: ", () => {
    beforeEach(() => {
      render(<OrderBar />);
    });
    it("should render the order bar", () => {
      expect(screen.getByTestId("order bar")).toBeOnTheScreen();
    });
    it("should render number of new orders", () => {
      expect(screen.getByTestId("new orders")).toBeOnTheScreen();
    });
    it("should not render the order type initially", () => {
      expect(screen.queryByTestId("order type")).toBeNull();
    });
    it("should render the order type at a progress value of 80", () => {
      render(<OrderBar initVal={80} />);
      expect(screen.getByTestId("order type")).toBeOnTheScreen();
    });
    it("should not render the order cta initially", () => {
      expect(screen.queryByTestId("order cta")).toBeNull();
    });
    it("should render the order cta at a progress value of 96", () => {
      render(<OrderBar initVal={96} />);
      expect(screen.getByTestId("order cta")).toBeOnTheScreen();
    });
    it("should render the order action", () => {
      expect(screen.getByTestId("to orders")).toBeOnTheScreen();
    });
  });
});
