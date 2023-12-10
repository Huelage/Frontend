import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { mockCartItems, mockFoods, mockOrderItems } from "@api/mock";
import { AddToCart, CartItem, CartOverview, Categories, ItemSideElement, LocationList, OrderDetailItem, OrderSummaryElement, PopularFood, PopularRestaurant } from "@containers/User";
import { SideInterface, extraInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { numberToCurrency, showError } from "@utils";
import { MOCK_GET_KNOWN_LOCATIONS, MOCK_GET_PRODUCT, MOCK_REMOVE_LOCATION } from "../gql.mocks";
import { entity, mockFormattedFoods, renderApollo } from "../testhelpers";

describe("When Testing User Cart Containers: ", () => {
  describe("<CartItem />: ", () => {
    const dispatch = jest.fn();
    const itemProp = mockCartItems[0];
    beforeEach(() => {
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      renderApollo(<CartItem {...itemProp} />, MOCK_GET_PRODUCT);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("cart item")).toBeOnTheScreen();
    });
    it("should render the item image", () => {
      const view = screen.getByTestId("cart item image");
      expect(view).toBeOnTheScreen();
      expect(view.props.source).toBeDefined();
    });
    it("should render the item name", async () => {
      renderApollo(<CartItem {...itemProp} />, MOCK_GET_PRODUCT);
      await waitFor(() => expect(screen.getByText("River prawn spicy soup")));
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
    it("should render the price for the specified package size if the item has package sizes", async () => {
      renderApollo(<CartItem {...mockCartItems[3]} />, MOCK_GET_PRODUCT);
      await waitFor(() => expect(screen.getByText("Yamarita")));
      const view = screen.getByTestId("cart item price");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the total item price", () => {
      const view = screen.getByTestId("cart item total");
      expect(view).toBeOnTheScreen();
      expect(view.props.children).toBeDefined();
    });
    it("should render the item quantity using the QuantityController component", () => {
      expect(screen.getByTestId("quantity controller")).toBeOnTheScreen();
    });
    it("should increase the quantity when the increase button is pressed", () => {
      const increaseButton = screen.getByTestId("increase quantity");
      fireEvent.press(increaseButton);
      expect(dispatch).toBeCalledWith({ type: "global/updateCart", payload: { id: itemProp.id, quantity: 2 } });
    });
    it("should decrease the quantity when the decrease button is pressed and quantity is greater than 1", () => {
      renderApollo(<CartItem {...itemProp} quantity={2} />, MOCK_GET_PRODUCT);
      const decreaseButton = screen.getByTestId("decrease quantity");
      fireEvent.press(decreaseButton);
      expect(dispatch).toBeCalledWith({ type: "global/updateCart", payload: { id: itemProp.id, quantity: 1 } });
    });
    it("should remove an item from the cart when the decrease button is pressed and the quantity is 1", () => {
      const decreaseButton = screen.getByTestId("decrease quantity");
      fireEvent.press(decreaseButton);
      expect(dispatch).toBeCalledWith({ type: "global/removeFromCart", payload: itemProp.id });
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
      const cart = mockCartItems[3];
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
});


describe("When Testing the User Vendor Containers: ", () => {
  describe("<AddToCart />: ", () => {
    const extras = mockCartItems[0].extras as extraInterface[];
    const props = { amount: 1, extras, item: mockFormattedFoods[0], vendorId: "1", quantity: 1, price: 1000 };
    beforeEach(() => {
      render(<AddToCart {...props} />);
    });
    it("should render the container correctly", () => {
      expect(screen.getByTestId("add to cart")).toBeOnTheScreen();
    });
    it("should add a new Item to the cart when the addToCart function is called for an item of fixed pricing method", () => {
      const dispatch = jest.fn(), goBack = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ goBack });
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(dispatch).toBeCalledWith({ type: "global/addItemToCart", payload: { id: expect.any(String), item_id: "1", item_name: "River prawn spicy soup", vendorId: "1", quantity: 1, totalPrice: 2100, extras } });
      expect(goBack).toBeCalled();
    });
    it("should add a new Item to the cart when the addToCart function is called for an item of portion pricing method", () => {
      const extras = mockCartItems[1].extras as extraInterface[];
      const props = { amount: 2, extras, item: mockFormattedFoods[1], vendorId: "1", quantity: 1, price: 1000 };
      const dispatch = jest.fn(), goBack = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ goBack });
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(dispatch).toBeCalledWith({ type: "global/addItemToCart", payload: { id: expect.any(String), item_id: "2", item_name: "Jollof Rice", vendorId: "1", quantity: 1, totalPrice: 2500, extras, portion: 2 } });
    });
    it("should add a new Item to the cart when the addToCart function is called for an item of price pricing method", () => {
      const extras = mockCartItems[2].extras as extraInterface[];
      const props = { amount: 500, extras, item: mockFormattedFoods[2], vendorId: "1", quantity: 1, price: 300 };
      const dispatch = jest.fn(), goBack = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ goBack });
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(dispatch).toBeCalledWith({ type: "global/addItemToCart", payload: { id: expect.any(String), item_id: "3", item_name: "Macaroni", vendorId: "1", quantity: 1, totalPrice: 1000, extras, price: 500 } });
    });
    it("should add a new Item to the cart when the addToCart function is called for an item of package pricing method", () => {
      const props = { amount: 1, extras: [], item: mockFormattedFoods[3], vendorId: "1", quantity: 1, price: 3000, size: "large" };
      const dispatch = jest.fn(), goBack = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ goBack });
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(dispatch).toBeCalledWith({ type: "global/addItemToCart", payload: { id: expect.any(String), item_id: "4", item_name: "Yamarita", vendorId: "1", quantity: 1, totalPrice: 3500, extras: [], size: "large" } });
    });
    it("should call the showError function if a required side is not selected", () => {
      const props = { amount: 1, extras: [], item: mockFormattedFoods[1], vendorId: "1", quantity: 1, price: 3000, size: "enormous" };
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(showError).toBeCalledWith("Please select all required sides");
    });
    it("should call the showError function if an item of price pricing method has a price lower than the minimum", () => {
      const props = { amount: 200, extras: [], item: mockFormattedFoods[2], vendorId: "1", quantity: 1, price: 500 };
      render(<AddToCart {...props} />);
      const addToCart = screen.getByTestId("add to cart");
      fireEvent.press(addToCart);
      expect(showError).toBeCalledWith("The minimum price for this item is ₦300.00");
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
