import { OrderBar, UserTabBar, UserTabHeader, VendorTabBar, VendorTabHeader } from "@components/navigation";
import { UserTabParamList, VendorTabParamList } from "@interfaces";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderNavigator } from "../testhelpers";

describe("When Testing User Navigation Components: ", () => {
  const Tab = createBottomTabNavigator<UserTabParamList>();
  const TestComp = () => <Text>test component</Text>;

  describe("<UserTabBar />: ", () => {
    beforeEach(() => {
      renderNavigator(
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          tabBar={props => <UserTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={TestComp} />
          <Tab.Screen name="Vendors" component={TestComp} />
          <Tab.Screen name="My Orders" component={TestComp} />
          <Tab.Screen name="Profile" component={TestComp} />
        </Tab.Navigator>
      );
    });
    it("should render correctly", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
    it("should render the correct number of tabs", () => {
      expect(screen.getAllByTestId("tabButton")).toHaveLength(4);
    });
    it("should render the correct tab labels", () => {
      expect(screen.getByText("Home")).toBeOnTheScreen();
      expect(screen.getByText("Vendors")).toBeOnTheScreen();
      expect(screen.getByText("My Orders")).toBeOnTheScreen();
      expect(screen.getByText("Profile")).toBeOnTheScreen();
    });
  });

  describe("<UserTabHeader />: ", () => {
    beforeEach(() => {
      renderNavigator(
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ header: () => <UserTabHeader /> }}
          tabBar={props => <UserTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={TestComp} />
          <Tab.Screen name="Vendors" component={TestComp} />
          <Tab.Screen name="My Orders" component={TestComp} />
          <Tab.Screen name="Profile" component={TestComp} />
        </Tab.Navigator>
      );
    });
    it("should render correctly", async () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
    it("should render greeting text", () => {
      expect(screen.getByTestId("greeting text")).toBeOnTheScreen();
    });
    it("should render user image", () => {
      expect(screen.getByTestId("user image")).toBeOnTheScreen();
    });
    it("should render user name", () => {
      expect(screen.getByTestId("username")).toBeOnTheScreen();
    });
    it("should render the theme toggle button", () => {
      expect(screen.getByTestId("theme toggle")).toBeOnTheScreen();
    });
    it("should render the cart button", () => {
      expect(screen.getByTestId("cart button")).toBeOnTheScreen();
    });
  });
});

describe("When Testing Vendor Navigation Component: ", () => {
  const Tab = createBottomTabNavigator<VendorTabParamList>();
  const TestComp = () => <Text>test component</Text>;

  describe("<VendorTabBar />: ", () => {
    beforeEach(() => {
      renderNavigator(
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          tabBar={props => <VendorTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={TestComp} />
          <Tab.Screen name="Orders" component={TestComp} />
          <Tab.Screen name="Menu" component={TestComp} />
          <Tab.Screen name="Account" component={TestComp} />
        </Tab.Navigator>
      );
    });
    it("should render correctly", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
    it("should render the correct number of tabs", () => {
      expect(screen.getAllByTestId("tabButton")).toHaveLength(4);
    });
    it("should render the correct tab labels", () => {
      expect(screen.getByText("Home")).toBeOnTheScreen();
      expect(screen.getByText("Orders")).toBeOnTheScreen();
      expect(screen.getByText("Menu")).toBeOnTheScreen();
      expect(screen.getByText("Account")).toBeOnTheScreen();
    });
  });

  describe("<VendorTabHeader />: ", () => {
    beforeEach(() => {
      renderNavigator(
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ header: () => <VendorTabHeader /> }}
          tabBar={props => <VendorTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={TestComp} />
          <Tab.Screen name="Orders" component={TestComp} />
          <Tab.Screen name="Menu" component={TestComp} />
          <Tab.Screen name="Account" component={TestComp} />
        </Tab.Navigator>
      );
    });
    it("should render correctly", async () => {
      expect(screen.toJSON()).toMatchSnapshot();
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
    it("should render the order bar", () => {
      expect(screen.getByTestId("new orders")).toBeOnTheScreen();
    });
  });

  describe("<OrderBar />: ", () => {
    beforeEach(() => {
      render(<OrderBar />);
    });
    it("should render number of new orders", () => {
      expect(screen.getByTestId("new orders")).toBeOnTheScreen();
    });
    it("should not render the order type initially", async () => {
      expect(screen.queryByTestId('order type')).toBeNull();
    });
    it("should not render the order cta initially", async () => {
      expect(screen.queryByTestId('order cta')).toBeNull();
    });
    it("should render the order action", () => {
      expect(screen.getByTestId("to orders")).toBeOnTheScreen();
    });
  });
});
