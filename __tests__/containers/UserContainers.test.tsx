import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { mockCartItems, mockFoods, mockOrderItems } from "@api/mock";
import { AddToCart, CartItem, CartOverview, Categories, ItemSideElement, LocationList, OrderDetailItem, OrderSummaryElement, PopularFood, PopularRestaurant, ProfileHeader } from "@containers/User";
import { SideInterface } from "@interfaces";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { numberToCurrency } from "@utils";
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
    it("should render the price for the specified package size if the item has package sizes", () => {
      const item = { ...itemProp, item_id: "7", size: "small" };
      render(<CartItem {...item} />);
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


describe("When Testing User Order Containers: ", () => {
  describe("<OrderDetailItem />: ", () => {
    const cart = mockCartItems[0];
    beforeEach(() => {
      render(<OrderDetailItem {...cart} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("order detail item")).toBeOnTheScreen();
    });
    it("should not render the container if item_id is not found", () => {
      render(<OrderDetailItem {...cart} item_id="20" />);
      expect(screen.queryByTestId("order detail item")).toBeNull();
    });
    it("should render the item quantity", () => {
      expect(screen.getByTestId("order item quantity")).toBeOnTheScreen();
    });
    it("should render the item name", () => {
      expect(screen.getByTestId("order item name")).toBeOnTheScreen();
    });
    it("should render the item extras", () => {
      expect(screen.getByTestId("order item extras")).toBeOnTheScreen();
    });
    it("should render the total item price", () => {
      const cart = { id: "3", item_id: "8", quantity: 1, size: "small" };
      render(<OrderDetailItem {...cart} />);
      expect(screen.getByTestId("order item total")).toBeOnTheScreen();
    });
  });

  describe("<OrderSummaryElement />: ", () => {
    const mockOrder = mockOrderItems[0];
    beforeEach(() => {
      render(<OrderSummaryElement {...mockOrder} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("order summary element")).toBeOnTheScreen();
    });
    it("should render the estimated time for the order", () => {
      expect(screen.getByText(/the estimated time for this order/i)).toBeOnTheScreen();
    });
    it("should render the restaurant name", () => {
      expect(screen.getByText(mockOrder.vendorName)).toBeOnTheScreen();
    });
    it("should render the order total price", () => {
      expect(screen.getByText(numberToCurrency(mockOrder.totalAmount))).toBeOnTheScreen();
    });
    it("should render the order formatted date", () => {
      expect(screen.getByTestId("formatted date")).toBeOnTheScreen();
    });
    it("should render the status progress bar component", () => {
      expect(screen.getByTestId("status progress bar")).toBeOnTheScreen();
    });
    it("should render the order status", () => {
      expect(screen.getByText(mockOrder.status)).toBeOnTheScreen();
    });
    it("should render the order info text", () => {
      expect(screen.getByTestId("order info text")).toBeOnTheScreen();
    });
    describe("When the order the resolved or rejected", () => {
      it("should not render the estimated time for the order", () => {
        render(<OrderSummaryElement {...mockOrder} status="COMPLETED" />);
        expect(screen.queryByText(/the estimated time for this order/i)).toBeNull();
      });
      it("should render the order status in the order resolved box", () => {
        render(<OrderSummaryElement {...mockOrder} status="CANCELLED" />);
        expect(screen.getByText(/order cancelled/i)).toBeOnTheScreen();
      });
      it("should not render the bar box", () => {
        render(<OrderSummaryElement {...mockOrder} status="CANCELLED" />);
        expect(screen.queryByTestId("status progress bar")).toBeNull();
      });
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

  describe("<ProfileHeader />: ", () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(entity);
      render(<ProfileHeader />);
    });
    // Testing UI
    it("should render the container correctly", () => {
      expect(screen.getByTestId("profile header")).toBeOnTheScreen();
    });
    it("should not render the container if user is not logged in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(null);
      render(<ProfileHeader />);
      expect(screen.queryByTestId("profile header")).toBeNull();
    });
    it("should render the user image if the user has an image", () => {
      const image = screen.getByTestId("user image");
      expect(image).toBeOnTheScreen();
      expect(image.props.source).toEqual([{ uri: entity.imgUrl }]);
    });
    it("should render a add image text instead of an image, if user has no image", () => {
      const user = { ...entity, imgUrl: "" };
      (useAppSelector as jest.Mock).mockReturnValue(user);
      render(<ProfileHeader />);
      const text = screen.getByText("Add an image");
      expect(text).toBeOnTheScreen();
      expect(screen.queryByTestId("user image")).toBeNull();
    });
    it("should render the add image button", () => {
      expect(screen.getByTestId("add image button")).toBeOnTheScreen();
    });
    it("should render the user's name", () => {
      expect(screen.getByText(`${entity.firstName} ${entity.lastName}`)).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should call the addImage function when the add image button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      render(<ProfileHeader />);
      const button = screen.getByTestId("add image button");
      fireEvent.press(button);
      expect(logSpy).toBeCalledWith("add image");
    });
  });
});


describe("When Testing the User Vendor Containers: ", () => {
  describe("<AddToCart />: ", () => {
    const props = { price: 1000, extras: [{ name: "test", price: 100, quantity: 2 }, { name: "test", price: 100 }], quantity: 2 };
    beforeEach(() => {
      render(<AddToCart {...props} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("add to cart")).toBeOnTheScreen();
    });
  });

  describe("<ItemSideElement />: ", () => {
    const side = (mockFoods[0].sides && mockFoods[0].sides[0]) as SideInterface;
    const side2 = (mockFoods[0].sides && mockFoods[0].sides[1]) as SideInterface;
    const extras = [
      { name: "Plantain", price: 200, quantity: 2, groupId: "2" },
      { name: "Bread", price: 300, quantity: 1, groupId: "2" }
    ];
    const setExtras = jest.fn();
    const props = { ...side, extras, setExtras };
    beforeEach(() => {
      render(<ItemSideElement {...props} />);
    });
    // Testing UI
    it("should render the container correctly", () => {
      expect(screen.getByTestId("item side element")).toBeOnTheScreen();
    });
    it("should render the side description", () => {
      expect(screen.getByText(`${side.description} ${side.isRequired && "(Required)"}`)).toBeOnTheScreen();
    });
    it("should render the side options list", () => {
      const newProps = { ...side2, extras: [], setExtras };
      render(<ItemSideElement {...newProps} />);
      expect(screen.getByTestId("side option list")).toBeOnTheScreen();
    });
    it("should render the side options with the SideOptionElement component", () => {
      expect(screen.getAllByTestId("side option element")).not.toBeNull();
    });
    // Testing Functionality
    it("should call setExtras when the increase function is called", () => {
      const radioButton = screen.getByTestId("Big Pack radio button");
      fireEvent.press(radioButton);
      expect(setExtras).toBeCalledWith([...extras, { groupId: "1", name: "Big Pack", price: 500 }]);
    });
    it("should call setExtras when the decrease function is called", () => {
      const newExtras = [...extras, { groupId: "1", name: "Big Pack", price: 500 }];
      const newProps = { ...side, extras: newExtras, setExtras };
      render(<ItemSideElement {...newProps} />);
      const radioButton = screen.getByTestId("Big Pack radio button");
      fireEvent.press(radioButton);
      expect(setExtras).toBeCalledWith(extras);
    });
    it("should remove item from extras if the item is not multiple", () => {
      const newProps = { ...side, extras: [...extras, { groupId: "1", name: "Big Pack", price: 500 }], setExtras };
      render(<ItemSideElement {...newProps} />);
      const radioButton = screen.getByTestId("Small Pack radio button");
      fireEvent.press(radioButton);
      expect(setExtras).toBeCalledWith([...extras, { groupId: "1", name: "Small Pack", price: 300 }]);
    });
    it("should update the quantity of the item if the item is multiple", () => {
      const newProps = { ...side2, extras, setExtras };
      render(<ItemSideElement {...newProps} />);
      const quantityController = screen.getAllByTestId("increase quantity")[0];
      fireEvent.press(quantityController);
      expect(setExtras).toBeCalledWith(extras);
    });
    it("should remove an item from the list of extras if the quantity is 0", () => {
      const newProps = { ...side2, extras, setExtras };
      render(<ItemSideElement {...newProps} />);
      const quantityController = screen.getAllByTestId("decrease quantity")[1];
      fireEvent.press(quantityController);
      expect(setExtras).toBeCalledWith([{ name: "Plantain", price: 200, quantity: 2, groupId: "2" }]);
    });
    it("should reduce the quantity of an item if the quantity is greater than 2", () => {
      const setExtras = jest.fn();
      const newProps = { ...side2, extras, setExtras };
      render(<ItemSideElement {...newProps} />);
      const decreaseButton = screen.getAllByTestId("decrease quantity")[0];
      fireEvent.press(decreaseButton);
      expect(setExtras).toBeCalledWith([
        { name: "Plantain", price: 200, quantity: 1, groupId: "2" },
        { name: "Bread", price: 300, quantity: 1, groupId: "2" }
      ]);
    });
  });
});
