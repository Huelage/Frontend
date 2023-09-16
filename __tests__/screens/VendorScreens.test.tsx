import { HomeScreen } from "@screens/Vendor";
import { render, screen } from "@testing-library/react-native";

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
});