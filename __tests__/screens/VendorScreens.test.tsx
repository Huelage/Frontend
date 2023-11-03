import { HomeScreen, MenuScreen, NotificationScreen } from "@screens/Vendor";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("When Testing Vendor Screens: ", () => {
  describe("<HomeScreen />: ", () => {
    beforeEach(() => {
      render(<HomeScreen />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
    it("should render the OrderOverview component", () => {
      expect(screen.getByTestId("order overview")).toBeOnTheScreen();
    });
    it("should render the OrderSummary component", () => {
      expect(screen.getByTestId("order summary")).toBeOnTheScreen();
    });
    it("should render the ReviewList component", () => {
      expect(screen.getByTestId("review list")).toBeOnTheScreen();
    });
  });

  describe("<MenuScreen />: ", () => {
    beforeEach(() => {
      render(<MenuScreen />);
    });
    // Testing UI
    it("should render the screen correctly", () => {
      expect(screen.getByTestId("menu screen")).toBeOnTheScreen();
    });
    it("should render the order empty image if there is no menu item", () => {
      render(<MenuScreen testEmpty />);
      expect(screen.getByTestId("order empty image")).toBeOnTheScreen();
    });
    it("should render the categories text", () => {
      expect(screen.getByText("Categories")).toBeOnTheScreen();
    });
    it("should render the category list", () => {
      expect(screen.getByTestId("category list")).toBeOnTheScreen();
    });
    it("should render the category list items with the CustomButton component", () => {
      expect(screen.getAllByTestId("custom button")).not.toBeNull();
    });
    it("should render the menu item list and its items with the MenuItem component", () => {
      expect(screen.getByTestId("menu item list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("menu item")).not.toBeNull();
    });
    it("should render the add item button", () => {
      expect(screen.getByTestId("add item button")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should change the category when the user clicks on a category button", () => {
      const categoryButton = screen.getAllByTestId("custom button")[1];
      fireEvent.press(categoryButton);
      expect(categoryButton.props.inactive).toBeFalsy();
    });
  });

  describe("<NotificationScreen />: ", () => {
    it("should render the component correctly", () => {
      render(<NotificationScreen />);
      expect(screen.getByTestId("notification screen")).toBeOnTheScreen();
    });
  });
});
