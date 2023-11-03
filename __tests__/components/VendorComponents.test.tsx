import { mockFoods } from "@api/mock";
import { OrderChartElement, SummaryElement, ReviewElement, StatElement } from "@components/vendor/Home";
import { MenuItem } from "@components/vendor/Menu";
import { render, screen } from "@testing-library/react-native";

describe("When Testing Vendor Flow Home Components: ", () => {
  describe("<OrderChartElement />: ", () => {
    const chartProps = { value: 100, iconColor: "red", label: "test", total: 1000, idx: 1 };
    beforeEach(() => {
      render(<OrderChartElement {...chartProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("order chart element")).toBeOnTheScreen();
    });
    it("should render the chart bar", () => {
      expect(screen.getByTestId("chart bar")).toBeOnTheScreen();
    });
    it("should render the bar progress view", () => {
      expect(screen.getByTestId("bar progress")).toBeOnTheScreen();
    });
    it("should render the bar label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the bar progress percentage", () => {
      const testPercentage = `${Math.floor((chartProps.value / chartProps.total) * 100)}%`;
      expect(screen.getByText(testPercentage)).toBeOnTheScreen();
    });
  });

  describe("<ReviewElement />: ", () => {
    const reviewProps = { id: "1", name: "test", avatar: "test image", date: "15/02/23", rating: 5, message: "test comment" };
    beforeEach(() => {
      render(<ReviewElement {...reviewProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("review element")).toBeOnTheScreen();
    });
    it("should render the reviewer name", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render background avatar incase an image is not provided", () => {
      expect(screen.getByTestId("backup avatar")).toBeOnTheScreen();
    });
    it("should render the reviewer avatar", () => {
      expect(screen.getByTestId("reviewer image")).toBeOnTheScreen();
    });
    it("should render the review date", () => {
      expect(screen.getByText("15/02/23")).toBeOnTheScreen();
    });
    it("should render the review ratings using the StarRating component", () => {
      expect(screen.getAllByTestId("ios-star")).toHaveLength(5);
    });
    it("should render the reviewer comment", () => {
      expect(screen.getByText("test comment")).toBeOnTheScreen();
    });
  });

  describe("<StatElement />: ", () => {
    const statProps = { title: "test", value: 100, Icon: ({ size }: { size: number; }) => <></> };
    beforeEach(() => {
      render(<StatElement {...statProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("stat element")).toBeOnTheScreen();
    });
    it("should render the stat title", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the stat value", () => {
      expect(screen.getByText("100")).toBeOnTheScreen();
    });
  });

  describe("<SummaryElement />: ", () => {
    const overviewProps = { label: "test", value: 100, iconColor: "red" };
    beforeEach(() => {
      render(<SummaryElement {...overviewProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("summary element")).toBeOnTheScreen();
    });
    it("should render the overview label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the overview value", () => {
      expect(screen.getByText("100")).toBeOnTheScreen();
    });
    it("should render the right color for the overview status icon", () => {
      expect(screen.getByTestId("status icon")).toHaveStyle({ backgroundColor: "red" });
    });
  });
});


describe("When Testing Vendor Flow Menu Components: ", () => {
  describe("<MenuItem />: ", () => {
    const item = mockFoods[0];
    beforeEach(() => {
      render(<MenuItem item={item} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("menu item")).toBeOnTheScreen();
    });
    it("should render the item image", () => {
      expect(screen.getByTestId("menu item image")).toBeOnTheScreen();
    });
    it("should render the menu item info", () => {
      expect(screen.getByTestId("menu item info")).toBeOnTheScreen();
    });
    it("should render the menu item action box", () => {
      expect(screen.getByTestId("menu item action")).toBeOnTheScreen();
    });
  });
});