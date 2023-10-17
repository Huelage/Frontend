import { OrderOverview, OrderSummary, ReviewList } from "@containers/Vendor";
import { render, screen } from "@testing-library/react-native";

describe("When Testing Vendor Home Containers: ", () => {
  describe("<OrderOverview />: ", () => {
    beforeEach(() => {
      render(<OrderOverview />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("order overview")).toBeOnTheScreen();
    });
    it("should render the right amount of stat elements", () => {
      expect(screen.getAllByTestId("stat element")).toHaveLength(3);
    });
  });

  describe("<OrderSummary />: ", () => {
    beforeEach(() => {
      render(<OrderSummary />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("order summary")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Order Summary")).toBeOnTheScreen();
    });
    it("should render the summary elements box", () => {
      expect(screen.getByTestId("summary elements")).toBeOnTheScreen();
    });
    it("should render the summary elements", () => {
      expect(screen.getAllByTestId("summary element")).not.toBeNull();
    });
    it("should render the chart elements box", () => {
      expect(screen.getByTestId("chart elements")).toBeOnTheScreen();
    });
    it("should render the chart elements", () => {
      expect(screen.getAllByTestId("order chart element")).not.toBeNull();
    });
  });

  describe("<ReviewList />: ", () => {
    beforeEach(() => {
      render(<ReviewList />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("review list")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Ratings and Reviews")).toBeOnTheScreen();
    });
    it("should render the review elements list", () => {
      expect(screen.getByTestId("review elements")).toBeOnTheScreen();
    });
    it("should render the review elements", () => {
      expect(screen.getAllByTestId("review element")).not.toBeNull();
    });
  });
});
