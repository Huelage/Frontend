import { mockFoods, mockRestaurants } from "@api/mock";
import { OverviewBox, PromoBox, QuantityController } from "@components/core/Cart";
import { RatingCard } from "@components/core/Detail";
import { CategoryCard, CustomButton, CustomCarousel, FoodCard, MainSearchBar, RestaurantCard } from "@components/core/Home";
import FoodModalContent from "@components/core/Home/FoodModalContent";
import FoodModalResCard from "@components/core/Home/FoodModalResCard";
import { VendorResCard } from "@components/core/Vendor";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";

const foodData = mockFoods[0];
const resData = mockRestaurants[0];

describe("When Testing Core Cart Components: ", () => {
  describe("<OverviewBox />: ", () => {
    const totals = [
      { name: "test 1", amount: 1000 },
      { name: "test 2", amount: 2000 }
    ];
    const checkout = jest.fn();
    beforeEach(() => {
      render(<OverviewBox totals={totals} checkout={checkout} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("overview box")).toBeOnTheScreen();
    });
    it("should render the totals name", () => {
      totals.forEach(total => {
        expect(screen.getByText(total.name)).toBeOnTheScreen();
      });
    });
    it("should render the totals amount", () => {
      totals.forEach(total => {
        expect(screen.getByText(`₦ ${total.amount}`)).toBeOnTheScreen();
      });
    });
    it("should render the checkout button", () => {
      expect(screen.getByTestId("checkout button")).toBeOnTheScreen();
    });
    it("should allow user to checkout", () => {
      const checkoutButton = screen.getByTestId("checkout button");
      fireEvent.press(checkoutButton);
      expect(checkout).toBeCalled();
    });
  });

  describe("<PromoBox />: ", () => {
    const apply = jest.fn();
    beforeEach(() => {
      render(<PromoBox handleApply={apply} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("promo box")).toBeOnTheScreen();
    });
    it("should render the promo input", () => {
      expect(screen.getByTestId("promo input")).toBeOnTheScreen();
    });
    it("should call the apply function when the promo input is submitted", () => {
      const promoInput = screen.getByTestId("promo input");
      fireEvent.changeText(promoInput, "test promo");
      fireEvent(promoInput, "onSubmitEditing");
      expect(apply).toBeCalledWith("test promo");
    });
    it("should render the apply button", () => {
      expect(screen.getByText("Apply")).toBeOnTheScreen();
    });
    it("should allow users to apply promo", () => {
      const applyButton = screen.getByText("Apply");
      const promoInput = screen.getByTestId("promo input");
      fireEvent.changeText(promoInput, "test promo");
      fireEvent.press(applyButton);
      expect(apply).toBeCalledWith("test promo");
    });
  });

  describe("<QuantityController />: ", () => {
    const increase = jest.fn();
    const decrease = jest.fn();
    beforeEach(() => {
      render(<QuantityController quantity={1} increase={increase} decrease={decrease} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("quantity controller")).toBeOnTheScreen();
    });
    it("should render the increase button", () => {
      expect(screen.getByTestId("increase quantity")).toBeOnTheScreen();
    });
    it("should render the decrease button", () => {
      expect(screen.getByTestId("decrease quantity")).toBeOnTheScreen();
    });
    it("should render the quantity text with the current quantity value", () => {
      const val = screen.getByTestId("quantity value");
      expect(val.props.children).toEqual(1);
    });
    it("should allow user to increase quantity", () => {
      const increaseButton = screen.getByTestId("increase quantity");
      fireEvent.press(increaseButton);
      expect(increase).toBeCalled();
    });
    it("should allow user to decrease quantity", () => {
      const decreaseButton = screen.getByTestId("decrease quantity");
      fireEvent.press(decreaseButton);
      expect(decrease).toBeCalled();
    });
  });
});

describe("When Testing Core Detail Components: ", () => {
  describe("<RatingCard />: ", () => {
    beforeEach(() => {
      render(<RatingCard rating={5} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("rating card")).toBeOnTheScreen();
    });
    it("should render the rating", () => {
      expect(screen.getByText(/5.0/i)).toBeOnTheScreen();
    });
  });
});

describe("When Testing Core Home Components: ", () => {
  describe("<CategoryCard />: ", () => {
    const category = { idx: 1, name: "test", rating: 5, price: 100, imgUrl: "test", addToCart: jest.fn(), animationValue: { value: 1 } };
    beforeEach(() => {
      render(<CategoryCard {...category} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("category card")).toBeOnTheScreen();
    });
    it("should render the category name", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the category rating", () => {
      expect(screen.getByText(/5.0/i)).toBeOnTheScreen();
    });
    it("should render the category price", () => {
      expect(screen.getByText(/100.00/i)).toBeOnTheScreen();
    });
    it("should render the category image", () => {
      expect(screen.getByTestId("categoryImage")).toBeOnTheScreen();
    });
    it("should render the add to cart button", () => {
      expect(screen.getByTestId("addToCart")).toBeOnTheScreen();
    });
    it("should allow user to add to cart", () => {
      const addToCartButton = screen.getByTestId("addToCart");
      fireEvent.press(addToCartButton);
      expect(category.addToCart).toBeCalled();
    });
  });

  describe("<CustomButton />: ", () => {
    const buttonProps = { label: "test", height: 20, fontSize: 14, onPress: jest.fn() };
    beforeEach(() => {
      render(<CustomButton {...buttonProps} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("custom button")).toBeOnTheScreen();
    });
    it("should render the button label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the button icon", () => {
      render(<CustomButton {...buttonProps} icon='add-circle' />);
      expect(screen.getByTestId("button icon")).toBeOnTheScreen();
    });
    it("should allow user to press the button", () => {
      const button = screen.getByText("test");
      fireEvent.press(button);
      expect(buttonProps.onPress).toBeCalled();
    });
  });

  describe("<CustomCarousel />: ", () => {
    beforeEach(() => {
      render(<CustomCarousel />);
    });
    it("should render the carousel", () => {
      expect(screen.getByTestId("carousel")).toBeOnTheScreen();
    });
    it("should render the carousel indicators", () => {
      const indicators = screen.getAllByTestId(/carousel indicator/);
      expect(indicators).not.toBeNull();
    });
    it("should change indicator backgroud on scroll", () => {
      const component = screen.getByTestId("carousel");
      const indicator = screen.getByTestId("carousel indicator 1");
      fireEvent(component, "onSnapToItem", 1);
      expect(indicator.props.style).toContainEqual({ backgroundColor: "#47CA4C" });
    });
  });

  describe("<FoodCard />: ", () => {
    beforeEach(() => {
      render(<FoodCard {...foodData} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("food card")).toBeOnTheScreen();
    });
    it("should render the food name", () => {
      expect(screen.getAllByText(foodData.name)).not.toBeNull();
    });
    it("should render the food rating", () => {
      expect(screen.getByText(foodData.rating.toFixed(1))).toBeOnTheScreen();
    });
    it("should render the food calories", () => {
      expect(screen.getByText(`${foodData.cals} KCal`)).toBeOnTheScreen();
    });
    it("should render the food price", () => {
      expect(screen.getByText(`₦${foodData.price}`)).toBeOnTheScreen();
    });
    it("should render the favourite toggle button", () => {
      expect(screen.getByTestId("favourite toggle")).toBeOnTheScreen();
    });
    it("should change favourite status on press", () => {
      const toggleButton = screen.getByTestId("favourite toggle");
      fireEvent.press(toggleButton);
      expect(toggleButton.props.accessibilityState.checked).toBe(!foodData.isFavourite);
    });
    it("should toggle the modal on press", () => {
      const modalButton = screen.getByTestId("toggle modal");
      const modal = screen.getByTestId("custom modal");
      expect(modal.props.isVisible).toBeFalsy();
      fireEvent.press(modalButton);
      expect(modal.props.isVisible).toBeTruthy();
    });
  });

  describe("<FoodModalContent />: ", () => {
    const close = jest.fn();
    beforeEach(() => {
      render(<FoodModalContent {...foodData} close={close} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("food modal content")).toBeOnTheScreen();
    });
    it("should render the close button", () => {
      expect(screen.getByTestId("close button")).toBeOnTheScreen();
    });
    it("should call close function on close button press", () => {
      const closeButton = screen.getByTestId("close button");
      fireEvent.press(closeButton);
      expect(close).toBeCalledWith(false);
    });
    it("should render the food name", () => {
      expect(screen.getByText(foodData.name)).toBeOnTheScreen();
    });
    it("should render the food description", () => {
      expect(screen.getByText(foodData.desc)).toBeOnTheScreen();
    });
    it("should render the available at list", () => {
      const list = screen.getByTestId("available at list");
      expect(list).toBeOnTheScreen();
      expect(list.props.data).toBeTruthy();
    });
  });

  describe("<FoodModalResCard />: ", () => {
    beforeEach(() => {
      render(<FoodModalResCard resId={resData.id} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("food modal res card")).toBeOnTheScreen();
    });
    it("should render the restaurant name", () => {
      expect(screen.getByText(resData.name)).toBeOnTheScreen();
    });
    it("should render the restaurant image", () => {
      expect(screen.getByTestId("restaurant image")).toBeOnTheScreen();
    });
    it("should render the select button", () => {
      expect(screen.getByText("Select")).toBeOnTheScreen();
    });
  });

  describe("<MainSearchBar />: ", () => {
    const searchFunc = jest.fn();
    beforeEach(() => {
      render(<MainSearchBar searchFunc={searchFunc} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("main search bar")).toBeOnTheScreen();
    });
    it("should render the search icon", () => {
      expect(screen.getByTestId("search icon")).toBeOnTheScreen();
    });
    it("should render the search input", () => {
      expect(screen.getByPlaceholderText("Search dishes...")).toBeOnTheScreen();
    });
    it("should render the filter icon", () => {
      expect(screen.getByTestId("filter icon")).toBeOnTheScreen();
    });
    it("should allow text input change", () => {
      const input = screen.getByPlaceholderText("Search dishes...");
      fireEvent.changeText(input, "test input");
      expect(searchFunc).toBeCalledWith("test input");
    });
  });

  describe("<RestaurantCard />: ", () => {
    beforeEach(() => {
      render(<RestaurantCard {...resData} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("restaurant card")).toBeOnTheScreen();
    });
    it("should render restaurant image", () => {
      expect(screen.getByTestId("restuarant image")).toBeOnTheScreen();
    });
    it("should render restaurant name", () => {
      expect(screen.getByText(resData.name)).toBeOnTheScreen();
    });
    it("should render restaurant location", () => {
      expect(screen.getByText(resData.location)).toBeOnTheScreen();
    });
    it("should call navigate when detail box is pressed", () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockImplementation(() => ({
        navigate,
        dispatch: jest.fn()
      }));
      render(<RestaurantCard {...resData} />);
      const detailBox = screen.getByTestId("details box");
      fireEvent.press(detailBox);
      expect(navigate).toBeCalled();
    });
  });
});

describe("When Testing Core Vendor Components: ", () => {
  describe("<VendorResCard />: ", () => {
    beforeEach(() => {
      render(<VendorResCard resId={resData.id} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("vendor res card")).toBeOnTheScreen();
    });
    it("should render restaurant image", () => {
      expect(screen.getByTestId("restaurant image")).toBeOnTheScreen();
    });
    it("should render restaurant name", () => {
      expect(screen.getByText(resData.name)).toBeOnTheScreen();
    });
    it("should render restaurant location", () => {
      expect(screen.getByText(resData.location)).toBeOnTheScreen();
    });
    it("should render view button", () => {
      expect(screen.getByText("View")).toBeOnTheScreen();
    });
  });
});