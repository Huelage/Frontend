import { CartScreen, HomeScreen, VendorScreen } from "@screens/core";
import { render, screen } from "@testing-library/react-native";
import { renderNavigator, testRect } from "../testhelpers";

describe("When Testing Core(User Flow) Screens: ", () => {
  describe("<CartScren />: ", () => {
    beforeEach(() => {
      renderNavigator(<CartScreen />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("cart screen")).toBeOnTheScreen();
    });
    it("should render the screen title", () => {
      expect(screen.getByText("Cart")).toBeOnTheScreen();
    });
    it("should render the go back button", () => {
      expect(screen.getByTestId("go back")).toBeOnTheScreen();
    });
    it("should render the cart items list", () => {
      expect(screen.getByTestId("cart items list")).toBeOnTheScreen();
    });
    it("should render the cart items using the CartItem component", () => {
      expect(screen.getAllByTestId("cart item")).not.toBeNull();
    });
    it("should render the cart overview using the CartOverview component", () => {
      expect(screen.getByTestId("cart overview")).toBeOnTheScreen();
    });
  });

  describe("<HomeScreen />: ", () => {
    beforeEach(() => {
      render(<HomeScreen testRect={testRect} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("user home screen")).toBeOnTheScreen();
    });
    it("should render the MainSearchBar component", () => {
      expect(screen.getByTestId("main search bar")).toBeOnTheScreen();
    });
    it("should render the hero image", () => {
      const heroImage = screen.getByTestId("hero image");
      expect(heroImage).toBeOnTheScreen();
      expect(heroImage.props.source).toBeDefined();
    });
    it("should render the PopularFood container", () => {
      expect(screen.getByTestId("popular food")).toBeOnTheScreen();
    });
    it("should render the PopularRestaurant container", () => {
      expect(screen.getByTestId("popular restaurant")).toBeOnTheScreen();
    });
    it("should render the Categories container", () => {
      expect(screen.getByTestId("categories")).toBeOnTheScreen();
    });
  });

  describe("<VendorScreen />: ", () => {
    beforeEach(() => {
      render(<VendorScreen />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("vendor screen")).toBeOnTheScreen();
    });
    it("should render the MainSearchBar component", () => {
      expect(screen.getByTestId("main search bar")).toBeOnTheScreen();
    });
    it("should render the vendors list", () => {
      expect(screen.getByTestId("vendors list")).toBeOnTheScreen();
    });
    it("should render the vendors using the VendorResCard component", () => {
      expect(screen.getAllByTestId("vendor res card")).not.toBeNull();
    });
  });
});