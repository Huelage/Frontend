import { CartScreen, DetailScreen, HomeScreen, LocationScreen, PersonalDetailScreen, VendorScreen } from "@screens/core";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { renderNavigator } from "../testhelpers";
import { Keyboard } from "react-native";
import { useAppSelector } from "@api/app/appHooks";

describe("When Testing Core(User Flow) Screens: ", () => {
  const testSearchFunc = () => {
    const searchBar = screen.getByPlaceholderText(/search dishes/i);
    fireEvent.changeText(searchBar, "test");
    expect(console.log).toBeCalledWith("test");
  };

  describe("<CartScreen />: ", () => {
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
    it("should call Keyboard.dimss() when the screen is touched", () => {
      const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
      renderNavigator(<CartScreen />);
      const screenView = screen.getByTestId("cart screen");
      fireEvent(screenView, "onTouchStart");
      expect(dismissKeyboard).toBeCalledTimes(1);
    });
  });

  describe("<DetailScreen />: ", () => {
    it("should render the component correctly", () => {
      render(<DetailScreen />);
      expect(screen.getByTestId("detail screen")).toBeOnTheScreen();
    });
  });

  describe("<HomeScreen />: ", () => {
    beforeEach(() => {
      render(<HomeScreen />);
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
    it("should call the search function when the search bar is used", () => {
      console.log = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValueOnce("dark");
      render(<HomeScreen />);
      testSearchFunc();
      console.log = console.log.bind(console);
    });
  });

  describe("Vendor Screens: ", () => {
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
      it("should call the search function when the search bar is used", () => {
        console.log = jest.fn();
        render(<VendorScreen />);
        testSearchFunc();
        console.log = console.log.bind(console);
      });
    });
  });

  describe("Profile Screens: ", () => {
    describe("<LocationScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue({ id: 123 });
        render(<LocationScreen />);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("location screen")).toBeOnTheScreen();
      });
      it("should not render component if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        render(<LocationScreen />);
        expect(screen.queryByTestId("location screen")).toBeNull();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Locations")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the locationInput component", () => {
        expect(screen.getByTestId("location input")).toBeOnTheScreen();
      });
      it("should render the location list", () => {
        expect(screen.getByTestId("location list")).toBeOnTheScreen();
      });
      it("should render the location elements using the LocationElement component", () => {
        expect(screen.getAllByTestId("location element")).not.toBeNull();
      });
      it("should call the removeLocation function when the remove button is pressed", () => {
        console.log = jest.fn();
        render(<LocationScreen />);
        const removeButtons = screen.getAllByTestId("remove button");
        removeButtons.forEach(button => {
          fireEvent.press(button);
          expect(console.log).toBeCalled();
        });
        console.log = console.log.bind(console);
      });
    });

    describe("<PersonalDetailScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue({ id: 123 });
        render(<PersonalDetailScreen />);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("personal detail screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Personal Details")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the detail elements", () => {
        expect(screen.getAllByTestId("detail element")).not.toBeNull();
        expect(screen.getAllByTestId("detail element")).toHaveLength(4);
      });
    });
  });
});