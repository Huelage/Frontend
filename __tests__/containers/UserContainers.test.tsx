import { CartItem, CartOverview, Categories, PopularFood, PopularRestaurant } from "@containers/User";
import { render, screen } from "@testing-library/react-native";
import { testRect } from "../testhelpers";

describe("When Testing User Cart Containers: ", () => {
  describe("<CartItem />: ", () => {
    const itemProp = { id: "1", item_id: "1", quantity: 2, extras: [{ name: "test", price: 100, quantity: 2 }] };
    beforeEach(() => {
      render(<CartItem {...itemProp} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("cart item")).toBeOnTheScreen();
    });
    it("should render the item image", () => {
      const view = screen.getByTestId("cart item image");
      expect(view).toBeOnTheScreen();
      expect(view.props.source).toBeDefined();
    });
    it("should render the item name", () => {
      const view = screen.getByTestId("cart item name");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the item extras", () => {
      const view = screen.getByTestId("cart item extras");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the item price", () => {
      const view = screen.getByTestId("cart item price");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the total item price", () => {
      const view = screen.getByTestId("cart item total");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the item quantity using the QunatityController component", () => {
      const increaseButton = screen.getByTestId("increase quantity");
      const decreaseButton = screen.getByTestId("decrease quantity");
      expect(increaseButton).toBeOnTheScreen();
      expect(decreaseButton).toBeOnTheScreen();
    });
    it("should render null if item_id is not found", () => {
      render(<CartItem {...itemProp} item_id="20" />);
      const view = screen.queryByTestId("cart item name");
      expect(view).toBeNull();
    });
  });

  describe("<CartOverview />: ", () => {
    beforeEach(() => {
      render(<CartOverview />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("cart overview")).toBeOnTheScreen();
    });
    it("should render the PromoBox component", () => {
      expect(screen.getByTestId("promo box")).toBeOnTheScreen();
    });
    it("should render the OverviewBox component", () => {
      expect(screen.getByTestId("overview box")).toBeOnTheScreen();
    });
  });
});

describe("When Testing User Home Containers: ", () => {
  describe("<Categories />: ", () => {
    beforeEach(() => {
      render(<Categories />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("categories")).toBeOnTheScreen();
    });
    it("should render category icon list", () => {
      expect(screen.getByTestId("category icon list")).toBeOnTheScreen();
    });
    it("should render the category icons", () => {
      expect(screen.getAllByTestId("custom button")).not.toBeNull();
    });
    it("should render the CustomCarousel component", () => {
      expect(screen.getByTestId("carousel")).toBeOnTheScreen();
    });
  });

  describe("<PopularFood />: ", () => {
    beforeEach(() => {
      render(<PopularFood testRect={testRect} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("popular food")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Popular this week")).toBeOnTheScreen();
    });
    it("should render the CustomButton component", () => {
      expect(screen.getByTestId("custom button")).toBeOnTheScreen();
    });
    it("should render the popular food list", () => {
      expect(screen.getByTestId("popular food list")).toBeOnTheScreen();
    });
  });

  describe("<PopularRestaurant />: ", () => {
    beforeEach(() => {
      render(<PopularRestaurant testRect={testRect} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("popular restaurant")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Favorite Restaurants")).toBeOnTheScreen();
    });
    it("should render the CustomButton component", () => {
      expect(screen.getByTestId("custom button")).toBeOnTheScreen();
    });
    it("should render the popular restaurant list", () => {
      expect(screen.getByTestId("popular restaurant list")).toBeOnTheScreen();
    });
  });
});