import { mockFoods, mockRestaurants } from "@api/mock";
import { OverviewBox, PromoBox, QuantityController } from "@components/core/Cart";
import { CategoryCard, CustomButton, CustomCarousel, FoodCard, MainSearchBar, RestaurantCard } from "@components/core/Home";
import FoodModalContent from "@components/core/Home/FoodModalContent";
import FoodModalResCard from "@components/core/Home/FoodModalResCard";
import { VendorResCard } from "@components/core/Vendor";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { testRect } from "../testhelpers";

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
    it("should render the quantity text", () => {
      expect(screen.getByText("1")).toBeOnTheScreen();
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

describe("When Testing Core Home Components: ", () => {
  describe("<CategoryCard />: ", () => {
    const category = { idx: 1, name: "test", rating: 5, price: 100, imgUrl: "test", addToCart: jest.fn(), animationValue: { value: 1 } };
    beforeEach(() => {
      render(<CategoryCard {...category} testRect={testRect} />);
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
      const indicators = screen.getAllByTestId("carousel indicator");
      expect(indicators).not.toBeNull();
    });
  });

  describe("<FoodCard />: ", () => {
    beforeEach(() => {
      render(<FoodCard {...foodData} testRect={testRect} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("food card")).toBeOnTheScreen();
    });
    it("should render the food name", () => {
      expect(screen.getByText(foodData.name)).toBeOnTheScreen();
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
  });

  describe("<FoodModalContent />: ", () => {
    const close = jest.fn();
    beforeEach(() => {
      render(<FoodModalContent {...foodData} testRect={testRect} close={close} />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("food modal content")).toBeOnTheScreen();
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
      render(<RestaurantCard {...resData} testRect={testRect} />);
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