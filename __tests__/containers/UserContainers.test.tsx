import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { CartItem, CartOverview, Categories, LocationList, PopularFood, PopularRestaurant } from "@containers/User";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { MOCK_GET_KNOWN_LOCATIONS, MOCK_REMOVE_LOCATION } from "../gql.mocks";
import { entity, renderApollo } from "../testhelpers";

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
      expect(screen.getByTestId("quantity controller")).toBeOnTheScreen();
    });
    it("should increase the quantity when the increase button is pressed", () => {
      const increaseButton = screen.getByTestId("increase quantity");
      const value = screen.getByTestId("quantity value");
      expect(value.props.children).toEqual(2);
      fireEvent.press(increaseButton);
      expect(value.props.children).toEqual(3);
    });
    it("should decrease the quantity when the decrease button is pressed", () => {
      const decreaseButton = screen.getByTestId("decrease quantity");
      const value = screen.getByTestId("quantity value");
      expect(value.props.children).toEqual(2);
      fireEvent.press(decreaseButton);
      expect(value.props.children).toEqual(1);
    });
    it("should not decrease the quantity below 1", () => {
      const decreaseButton = screen.getByTestId("decrease quantity");
      const value = screen.getByTestId("quantity value");
      expect(value.props.children).toEqual(2);
      fireEvent.press(decreaseButton);
      expect(value.props.children).toEqual(1);
      fireEvent.press(decreaseButton);
      expect(value.props.children).toEqual(1);
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
    it("should apply the promo code when the apply button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<CartOverview />);
      const input = screen.getByTestId("promo input");
      fireEvent.changeText(input, "test");
      fireEvent(input, "onSubmitEditing");
      expect(logSpy).toBeCalledWith("test");
    });
    it("should render the OverviewBox component", () => {
      expect(screen.getByTestId("overview box")).toBeOnTheScreen();
    });
    it("should checkout when the checkout button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<CartOverview />);
      const button = screen.getByTestId("checkout button");
      fireEvent.press(button);
      expect(logSpy).toBeCalledWith("Checkout");
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
    it("should select a category when the category icon is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<Categories />);
      const buttons = screen.getAllByTestId("custom button");
      buttons.forEach(button => {
        fireEvent.press(button);
        expect(logSpy).toBeCalled();
      });
    });
    it("should render the CustomCarousel component", () => {
      expect(screen.getByTestId("carousel")).toBeOnTheScreen();
    });
  });

  describe("<PopularFood />: ", () => {
    beforeEach(() => {
      render(<PopularFood />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("popular food")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Popular this week")).toBeOnTheScreen();
    });
    it("should render the View all button using the CustomButton component", () => {
      expect(screen.getByTestId("custom button")).toBeOnTheScreen();
    });
    it("should call the handleViewAll function when the View all button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<PopularFood />);
      const button = screen.getByTestId("custom button");
      fireEvent.press(button);
      expect(logSpy).toBeCalledWith("View All");
    });
    it("should render the popular food list", () => {
      expect(screen.getByTestId("popular food list")).toBeOnTheScreen();
    });
  });

  describe("<PopularRestaurant />: ", () => {
    beforeEach(() => {
      render(<PopularRestaurant />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("popular restaurant")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText("Favorite Restaurants")).toBeOnTheScreen();
    });
    it("should render the View All button using the CustomButton component", () => {
      expect(screen.getByTestId("custom button")).toBeOnTheScreen();
    });
    it("should call the handleViewAll function when the View all button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<PopularRestaurant />);
      const button = screen.getByTestId("custom button");
      fireEvent.press(button);
      expect(logSpy).toBeCalledWith("View All");
    });
    it("should render the popular restaurant list", () => {
      expect(screen.getByTestId("popular restaurant list")).toBeOnTheScreen();
    });
  });
});


describe("When Testing User Profile Containers: ", () => {
  describe("<LocationList />: ", () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(entity);
      renderApollo(<LocationList />, []);
    });
    // Testing UI
    it("should render the container correctly", () => {
      expect(screen.getByTestId("location list")).toBeOnTheScreen();
    });
    it("should not render the container if user is not logged in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(null);
      renderApollo(<LocationList />, []);
      expect(screen.queryByTestId("location list")).toBeNull();
    });
    it("should render the location elements using the LocationElement component", () => {
      expect(screen.getAllByTestId("location element")).not.toBeNull();
    });
    // Testing Functionality
    it("should call the removeLocation function when the remove button is pressed", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useAppSelector as jest.Mock).mockReturnValue(entity);
      renderApollo(<LocationList />, MOCK_REMOVE_LOCATION);
      const removeButton = screen.getByTestId("remove button 123");
      fireEvent.press(removeButton);
      await waitFor(() => {
        expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...entity, knownLocation: [] } } });
      });
    });
    it("should check if the user has known locations on mount if the knownLocation array is empty", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      const user = { ...entity, knownLocation: [] };
      (useAppSelector as jest.Mock).mockReturnValue(user);
      renderApollo(<LocationList />, MOCK_GET_KNOWN_LOCATIONS);
      await waitFor(() => {
        expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...entity, knownLocation: [{ locationId: "123", name: "123 Main St" }] } } });
      });
    });
  });
});
