import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { mockCartItems } from "@api/mock";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AboutScreen, CartScreen, ChangePasswordScreen, ChangePhoneScreen, FAQScreen, HelpScreen, HomeScreen, ItemDetailScreen, LocationScreen, OrderDetailScreen, OrderScreen, PersonalDetailScreen, ProfileScreen, ReferralScreen, SettingScreen, VendorListScreen, VendorScreen, VerifyEmailScreen, VerifyPhoneScreen, WalletScreen } from "@screens/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { setItem, showError, showSuccess } from "@utils";
import { Keyboard } from "react-native";
import { MOCK_ADD_LOCATION, MOCK_CHANGE_PASSWORD, MOCK_REQUEST_EMAIL_VERIFICATION, MOCK_REQUEST_PHONE_VERIFICATION, MOCK_VERIFY_EMAIL, MOCK_VERIFY_PHONE } from "../gql.mocks";
import { entity, initialState, renderApollo } from "../testhelpers";

describe("When Testing Core(User Flow) Screens: ", () => {
  const testSearchFunc = (logSpy: any) => {
    const searchBar = screen.getByPlaceholderText(/search dishes/i);
    fireEvent.changeText(searchBar, "test");
    expect(logSpy).toBeCalledWith("test");
  };

  describe("<CartScreen />: ", () => {
    const dispatch = jest.fn(), navigate = jest.fn();
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(mockCartItems);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      render(<CartScreen />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("cart screen")).toBeOnTheScreen();
    });
    it("should render the header box", () => {
      expect(screen.getByTestId("header box")).toBeOnTheScreen();
    });
    it("should render the vendor cart list", () => {
      expect(screen.getByTestId("vendor cart list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("vendor cart item")).not.toBeNull();
    });
    it("should not render the vendor cart list if cart is empty", () => {
      (useAppSelector as jest.Mock).mockReturnValue([]);
      render(<CartScreen />);
      expect(screen.queryByTestId("vendor cart list")).toBeNull();
    });
    it("should render the cart info box", () => {
      expect(screen.getByTestId("cart info box")).toBeOnTheScreen();
    });
    it("should render the cart items using the CartItem component", () => {
      expect(screen.getByTestId("cart items list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("cart item")).not.toBeNull();
    });
    it("should render the continue shopping button", () => {
      expect(screen.getByTestId("continue shopping")).toBeOnTheScreen();
    });
    it("should not render the continue shopping button if the cart is empty", () => {
      (useAppSelector as jest.Mock).mockReturnValue([]);
      render(<CartScreen />);
      expect(screen.queryByTestId("continue shopping")).toBeNull();
    });
    it("should render the overview box", () => {
      expect(screen.getByTestId("overview box")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should switch between various vendor carts", () => {
      const vendorCartItems = screen.getAllByTestId("vendor cart item");
      vendorCartItems.forEach(item => {
        fireEvent.press(item);
      });
    });
    it("should clear the vendor's cart when the clear cart button is pressed", () => {
      const clearCartButton = screen.getByTestId("clear cart button");
      fireEvent.press(clearCartButton);
      expect(dispatch).toBeCalledWith({ type: "global/clearCart", payload: "1" });
    });
    it("should call the continueShopping function when the continue shopping button is pressed", () => {
      const vendorCartItem = screen.getAllByTestId("vendor cart item")[1];
      const clearCartButton = screen.getByTestId("clear cart button");
      const continueShoppingButton = screen.getByTestId("continue shopping");
      fireEvent.press(vendorCartItem);
      fireEvent.press(clearCartButton);
      fireEvent.press(continueShoppingButton);
      expect(navigate).toBeCalledWith("Vendors", { screen: "VendorHome", params: { vendorId: "1" }, initial: false });
    });
    it("should call the checkout function when the checkout button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      (useAppSelector as jest.Mock).mockReturnValue([mockCartItems[0]]);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      render(<CartScreen />);
      const clearCartButton = screen.getByTestId("clear cart button");
      const checkoutButton = screen.getByTestId("checkout button");
      fireEvent.press(clearCartButton);
      fireEvent.press(checkoutButton);
      expect(logSpy).toBeCalledWith("checkout");
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
      const logSpy = jest.spyOn(console, "log");
      (useAppSelector as jest.Mock).mockReturnValueOnce("dark");
      render(<HomeScreen />);
      testSearchFunc(logSpy);
    });
  });

  describe("Vendor Screens: ", () => {
    describe("<ItemDetailScreen />: ", () => {
      // Testing UI
      it("should render the screen correctly", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "1", vendorId: "1" } });
        (useAppSelector as jest.Mock).mockReturnValue(mockCartItems);
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("item detail screen")).toBeOnTheScreen();
      });
      it("should not render screen if itemId is not provided", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: {} });
        render(<ItemDetailScreen />);
        expect(screen.queryByTestId("item detail screen")).toBeNull();
      });
      it("should render the go back button", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "2", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the item image", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "3", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("item image")).toBeOnTheScreen();
      });
      it("should render the item info", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "6", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("item info")).toBeOnTheScreen();
      });
      it("should render the package size list items using the CustomButton component", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "9", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("package size list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("custom button")).not.toBeNull();
      });
      it("should render the amount box with a quantityController component if item pricing method is portion", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "2", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("amount box")).toBeOnTheScreen();
        expect(screen.getByTestId("quantity controller")).toBeOnTheScreen();
      });
      it("should render the amount box with a text input if item pricing method is price", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "3", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("amount box")).toBeOnTheScreen();
        expect(screen.getByPlaceholderText("500")).toBeOnTheScreen();
      });
      it("should render the item side list items using the ItemSideElement component", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "1", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("item side list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("item side element")).not.toBeNull();
      });
      it("should render the quantity box", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "1", vendorId: "1" } });
        render(<ItemDetailScreen />);
        expect(screen.getByTestId("quantity box")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should change the pack size when the item pricing method is package", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "9", vendorId: "1" } });
        render(<ItemDetailScreen />);
        const packButtons = screen.getAllByTestId("custom button");
        packButtons.forEach(button => {
          fireEvent.press(button);
        });
      });
      it("should allow user enter their preferred price if item pricing method is price", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "3", vendorId: "1" } });
        render(<ItemDetailScreen />);
        const input = screen.getByPlaceholderText("500");
        fireEvent.changeText(input, "500");
      });
      it("should alter the quantity when the increase or decrease quantity button is pressed", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "1", vendorId: "1" } });
        render(<ItemDetailScreen />);
        const increaseButton = screen.getByTestId("increase quantity button");
        const decreaseButton = screen.getByTestId("decrease quantity button");
        const quantityText = screen.getByTestId("quantity value text");
        fireEvent.press(increaseButton);
        expect(quantityText.props.children).toEqual(2);
        fireEvent.press(decreaseButton);
        expect(quantityText.props.children).toEqual(1);
      });
      it("should alter the portion when the increase or decrease amount button is pressed and item is sold per portion", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "2", vendorId: "1" } });
        render(<ItemDetailScreen />);
        const increaseButton = screen.getByTestId("increase quantity");
        const decreaseButton = screen.getByTestId("decrease quantity");
        const amountText = screen.getByTestId("quantity value");
        fireEvent.press(increaseButton);
        expect(amountText.props.children).toEqual(3);
        fireEvent.press(decreaseButton);
        expect(amountText.props.children).toEqual(2);
      });
    });

    describe("<VendorListScreen />: ", () => {
      beforeEach(() => {
        render(<VendorListScreen />);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("vendor list screen")).toBeOnTheScreen();
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
        const logSpy = jest.spyOn(console, "log");
        render(<VendorListScreen />);
        testSearchFunc(logSpy);
      });
    });

    describe("<VendorScreen />: ", () => {
      beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue({ params: { vendorId: "1" } });
        render(<VendorScreen />);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("vendor screen")).toBeOnTheScreen();
      });
      it("should not render the screen if vendorId is not provided", () => {
        (useRoute as jest.Mock).mockReturnValue({ params: {} });
        render(<VendorScreen />);
        expect(screen.queryByTestId("vendor screen")).toBeNull();
      });
      it("should render the vendor screen header", () => {
        expect(screen.getByTestId("vendor screen header")).toBeOnTheScreen();
      });
      it("should render the main search bar", () => {
        expect(screen.getByTestId("main search bar")).toBeOnTheScreen();
      });
      it("should render the vendor info box", () => {
        expect(screen.getByTestId("vendor info box")).toBeOnTheScreen();
      });
      it("should render the vendor category list items using the CustomButton component", () => {
        expect(screen.getByTestId("vendor category list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("custom button")).not.toBeNull();
      });
      it("should render the vendor product list items using the VendorProduct component", () => {
        expect(screen.getByTestId("vendor product list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("vendor product")).not.toBeNull();
      });
      it("should change categories when any of the category buttons are pressed", () => {
        const categoryButton = screen.getAllByTestId("custom button")[1];
        fireEvent.press(categoryButton);
        expect(categoryButton.props.inactive).toBeFalsy();
      });
      it("should call the search function when the search bar is used", () => {
        const logSpy = jest.spyOn(console, "log");
        render(<VendorScreen />);
        testSearchFunc(logSpy);
      });
    });
  });

  describe("Profile Screens: ", () => {
    describe("<AboutScreen />: ", () => {
      beforeEach(() => {
        render(<AboutScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("about screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("About Us")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
    });

    describe("<ChangePasswordScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<ChangePasswordScreen />, []);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("change password screen")).toBeOnTheScreen();
      });
      it("should not render the screen if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<ChangePasswordScreen />, []);
        expect(screen.queryByTestId("change password screen")).toBeNull();
      });
      it("should render the header box", () => {
        expect(screen.getByTestId("header box")).toBeOnTheScreen();
      });
      it("should render the screen main icon", () => {
        expect(screen.getByTestId("screen icon")).toBeOnTheScreen();
      });
      it("should render the info text", () => {
        expect(screen.getByText(/your new password must be/i)).toBeOnTheScreen();
      });
      it("should render the SetPasswordInputs component", () => {
        expect(screen.getByTestId("set password inputs")).toBeOnTheScreen();
      });
      it("should render the SubmitButton component", () => {
        expect(screen.getByTestId("submit button")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should dismiss the keyboard when the screen is touched", () => {
        const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
        renderApollo(<ChangePasswordScreen />, []);
        const screenContainer = screen.getByTestId("change password screen");
        fireEvent(screenContainer, "onTouchStart");
        expect(dismissKeyboard).toBeCalled();
      });
      it("should submit the form when the submit button is pressed", async () => {
        const goBack = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        renderApollo(<ChangePasswordScreen />, MOCK_CHANGE_PASSWORD);
        const submitButton = screen.getByTestId("submit button");
        const oldPasswordInput = screen.getByPlaceholderText("Old Password");
        const newPasswordInput = screen.getByPlaceholderText("New Password");
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
        fireEvent.changeText(oldPasswordInput, "pass1&onlY");
        fireEvent.changeText(newPasswordInput, "pass1&onlY");
        fireEvent.changeText(confirmPasswordInput, "pass1&onlY");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(showSuccess).toBeCalledWith("Your password has been changed successfully");
          expect(goBack).toBeCalled();
        });
      });
    });

    describe("<ChangePhoneScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<ChangePhoneScreen />, []);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("change phone screen")).toBeOnTheScreen();
      });
      it("should not render the screen if the user is not authenticated", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<ChangePhoneScreen />, []);
        expect(screen.queryByTestId("change phone screen")).toBeNull();
      });
      it("should render the header box", () => {
        expect(screen.getByTestId("header box")).toBeOnTheScreen();
      });
      it("should render the phone number input using the CustomTextInput component", () => {
        expect(screen.getByTestId("custom text input")).toBeOnTheScreen();
        expect(screen.getByPlaceholderText("Phone Number")).toBeOnTheScreen();
      });
      it("should render the SubmitButton component", () => {
        expect(screen.getByTestId("submit button")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should dismiss the keyboard when the screen is touched", () => {
        const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
        renderApollo(<ChangePhoneScreen />, []);
        const screenContainer = screen.getByTestId("change phone screen");
        fireEvent(screenContainer, "onTouchStart");
        expect(dismissKeyboard).toBeCalled();
      });
      it("should call the submit function when the submit button is pressed", async () => {
        const navigate = jest.fn(), dispatch = jest.fn();
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
        renderApollo(<ChangePhoneScreen />, MOCK_REQUEST_PHONE_VERIFICATION);
        const button = screen.getByTestId("submit button");
        const input = screen.getByPlaceholderText("Phone Number");
        fireEvent.changeText(input, "+234 905 873 1812");
        fireEvent.press(button);
        await waitFor(() => {
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity } });
          expect(navigate).toBeCalledWith("VerifyPhone");
        });
      });
    });

    describe("<FAQScreen />: ", () => {
      beforeEach(() => {
        render(<FAQScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("faq screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("FAQ")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
    });

    describe("<HelpScreen />: ", () => {
      beforeEach(() => {
        render(<HelpScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("help screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Help")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
    });

    describe("<LocationScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<LocationScreen />, []);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("location screen")).toBeOnTheScreen();
      });
      it("should not render component if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<LocationScreen />, []);
        expect(screen.queryByTestId("location screen")).toBeNull();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Locations")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the location list", () => {
        expect(screen.getByTestId("location list")).toBeOnTheScreen();
      });
      it("should call the handleLocation function when a location is selected and location is already a known location", async () => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<LocationScreen />, []);
        const locationElement = screen.getByTestId("places autocomplete");
        fireEvent(locationElement, "onTouchStart");
        expect(showError).toBeCalledWith("Main St is already a known location");
      });
      it("should call the handleLocation function when a location is selected and location is not already a known location", async () => {
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        const user = { ...entity, knownLocation: [{ locationId: "1234", name: "123 Main St" }] };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<LocationScreen />, MOCK_ADD_LOCATION);
        const locationElement = screen.getByTestId("places autocomplete");
        fireEvent(locationElement, "onTouchStart");
        await waitFor(() => {
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...entity, knownLocation: [{ locationId: "123", name: "123 Main St" }] } } });
        });
      });
      it("should call the onError function when the onFail prop is called", () => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<LocationScreen />, []);
        const locationElement = screen.getByTestId("places autocomplete");
        fireEvent(locationElement, "onTouchCancel");
        expect(showError).toBeCalledWith("test error");
      });
    });

    describe("<PersonalDetailScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<PersonalDetailScreen />, []);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("personal detail screen")).toBeOnTheScreen();
      });
      it("should not render component if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<PersonalDetailScreen />, []);
        expect(screen.queryByTestId("personal detail screen")).toBeNull();
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
      // Testing Functionality
      it("should dismiss keyboard when the screen is touched", () => {
        const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
        renderApollo(<PersonalDetailScreen />, []);
        const screenView = screen.getByTestId("personal detail screen");
        fireEvent(screenView, "onTouchStart");
        expect(dismissKeyboard).toBeCalled();
      });
      it("should call the VerifyEmail function when the email element is pressed and email is not verified", async () => {
        const navigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
        const user = { ...entity, isEmailVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<PersonalDetailScreen />, MOCK_REQUEST_EMAIL_VERIFICATION);
        const emailElement = screen.getByTestId("unverified");
        fireEvent.press(emailElement);
        await waitFor(() => {
          expect(navigate).toBeCalledWith("VerifyEmail");
        });
      });
      it("should call the VerifyPhone function when the phone element is pressed and phone is not verified", async () => {
        const navigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<PersonalDetailScreen />, MOCK_REQUEST_PHONE_VERIFICATION);
        const phoneElement = screen.getByTestId("unverified");
        fireEvent.press(phoneElement);
        await waitFor(() => {
          expect(navigate).toBeCalledWith("VerifyPhone");
        });
      });
    });

    describe("<ProfileScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<ProfileScreen />, []);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("profile screen")).toBeOnTheScreen();
      });
      it("should render the ProfileHeader container", () => {
        expect(screen.getByTestId("profile header")).toBeOnTheScreen();
      });
      it("should render 2 profile nav boxes", () => {
        expect(screen.getAllByTestId("profile nav box")).toHaveLength(2);
      });
    });

    describe("<ReferralScreen />: ", () => {
      beforeEach(() => {
        render(<ReferralScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("referral screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Referrals")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
    });

    describe("<SettingScreen />: ", () => {
      const dispatch = jest.fn(), navigate = jest.fn();
      const logSpy = jest.spyOn(console, "log");
      beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue({ navigate });
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (useAppSelector as jest.Mock).mockReturnValue(initialState);
        render(<SettingScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("setting screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Settings")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the setting list", () => {
        expect(screen.getByTestId("setting list")).toBeOnTheScreen();
      });
      it("should render the setting elements using the SettingElement component", () => {
        expect(screen.getAllByTestId("setting element")).not.toBeNull();
      });
      // Testing Functionality
      it("should toggle the theme type when the match device setting toggle is pressed", () => {
        const toggle = screen.getByTestId(/match device setting toggle switch/i);
        fireEvent(toggle, "onValueChange");
        expect(dispatch).toBeCalledWith({ type: "global/toggleThemeType" });
      });
      it("should toggle the theme when the dark mode toggle is pressed", () => {
        const toggle = screen.getByTestId(/dark mode toggle switch/i);
        fireEvent(toggle, "onValueChange");
        expect(dispatch).toBeCalledWith({ type: "global/toggleTheme" });
      });
      it("should toggle the push notifications when the push notifications toggle is pressed", () => {
        const toggle = screen.getByTestId(/push notifications toggle switch/i);
        fireEvent(toggle, "onValueChange");
        expect(dispatch).toBeCalledWith({ type: "global/toggleAllowPush" });
      });
      it("should toggle the in-app notifications when the in-app notifications toggle is pressed", () => {
        const toggle = screen.getByTestId(/in-app notifications toggle switch/i);
        fireEvent(toggle, "onValueChange");
        expect(dispatch).toBeCalledWith({ type: "global/toggleAllowToast" });
      });
      it("should toggle the location when the location toggle is pressed", () => {
        const toggle = screen.getByTestId(/location toggle switch/i);
        fireEvent(toggle, "onValueChange");
        expect(dispatch).toBeCalledWith({ type: "global/toggleAllowLocation" });
      });
      it("should call the appropriate onPress function when the change phone number option is pressed", () => {
        const changePhoneOption = screen.getByTestId(/change phone number setting option item/i);
        fireEvent.press(changePhoneOption);
        expect(navigate).toBeCalledWith("ChangePhone");
      });
      it("should call the appropriate onPress function when the change password option is pressed", () => {
        const changePasswordOption = screen.getByTestId(/change password setting option item/i);
        fireEvent.press(changePasswordOption);
        expect(navigate).toBeCalledWith("ChangePass");
      });
      it("should call the appropriate onPress function when the delete account option is pressed", () => {
        const deleteAccountOption = screen.getByTestId(/delete account setting option item/i);
        fireEvent.press(deleteAccountOption);
        expect(logSpy).toBeCalledWith("pressed");
      });
      it("should call the clearCredentials function when the logout button is pressed", () => {
        const logoutButton = screen.getByTestId(/logout setting option item/i);
        fireEvent.press(logoutButton);
        expect(dispatch).toBeCalledWith({ type: "global/clearCredentials" });
      });
    });

    describe("<WalletScreen />: ", () => {
      beforeEach(() => {
        render(<WalletScreen />);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("wallet screen")).toBeOnTheScreen();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Wallet")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
    });

    describe("<VerifyEmailScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<VerifyEmailScreen />, []);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("profile verify email screen")).toBeOnTheScreen();
      });
      it("should not render screen if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<VerifyEmailScreen />, []);
        expect(screen.queryByTestId("profile verify email screen")).toBeNull();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Verify Email Address")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the screen main icon", () => {
        expect(screen.getByTestId("screen icon")).toBeOnTheScreen();
      });
      it("should render the info text", () => {
        expect(screen.getByText(/enter the 4 digit code/i)).toBeOnTheScreen();
      });
      it("should render the CustomPinInput component", () => {
        expect(screen.getByTestId("custom pin input")).toBeOnTheScreen();
      });
      it("should render the resend code timer", () => {
        expect(screen.getByText(/didn't receive a code/i)).toBeOnTheScreen();
      });
      it("should render the SubmitButton component", () => {
        expect(screen.getByTestId("submit button")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should dismiss the keyboard when the screen is pressed", () => {
        const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
        renderApollo(<VerifyEmailScreen />, []);
        const screenContainer = screen.getByTestId("profile verify email screen");
        fireEvent(screenContainer, "onTouchStart");
        expect(dismissKeyboard).toBeCalled();
      });
      it("should call the submit function when the submit button is pressed", async () => {
        const goBack = jest.fn(), dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        const user = { ...entity, isEmailVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<VerifyEmailScreen />, MOCK_VERIFY_EMAIL);
        const submitButton = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "1234");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...entity, isEmailVerified: true } } });
          expect(showSuccess).toBeCalledWith("Email verified successfully");
          expect(goBack).toBeCalled();
        });
      });
      it("should not run the submit function if the otp code is not 4 digits", async () => {
        const goBack = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<VerifyEmailScreen />, MOCK_VERIFY_EMAIL);
        const submitButton = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "123");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(goBack).not.toBeCalled();
        });
      });
      it("should call the resend code function when the resend code button is pressed", async () => {
        const goBack = jest.fn(), dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        const user = { ...entity, isEmailVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<VerifyEmailScreen />, MOCK_REQUEST_EMAIL_VERIFICATION);
        jest.advanceTimersByTime(58000);
        await waitFor(() => {
          const resendCodeButton = screen.getByText(/resend code/i);
          fireEvent.press(resendCodeButton);
          expect(screen.getByText(/didn't receive a code/i)).toBeOnTheScreen();
        });
        await waitFor(() => {
          expect(screen.getByText(/59/i)).toBeOnTheScreen();
        });
      });
    });

    describe("<VerifyPhoneScreen />: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<VerifyPhoneScreen />, []);
      });
      // Testing UI
      it("should render the screen", () => {
        expect(screen.getByTestId("verify phone screen")).toBeOnTheScreen();
      });
      it("should not render screen if user is not logged in", () => {
        (useAppSelector as jest.Mock).mockReturnValue(null);
        renderApollo(<VerifyPhoneScreen />, []);
        expect(screen.queryByTestId("verify phone screen")).toBeNull();
      });
      it("should render the screen title", () => {
        expect(screen.getByText("Verify Phone Number")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the logo image", () => {
        expect(screen.getByTestId("logo image")).toBeOnTheScreen();
      });
      it("should render the phone number for the user", () => {
        expect(screen.getByText(/code has been sent/i)).toBeOnTheScreen();
      });
      it("should render the CustomPinInput component", () => {
        expect(screen.getByTestId("custom pin input")).toBeOnTheScreen();
      });
      it("should render the resend code timer", () => {
        expect(screen.getByText(/resend code/i)).toBeOnTheScreen();
      });
      it("should render the SubmitButton component", () => {
        expect(screen.getByTestId("submit button")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should dismiss the keyboard when the screen is touched", () => {
        const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
        renderApollo(<VerifyPhoneScreen />, []);
        const screenContainer = screen.getByTestId("verify phone screen");
        fireEvent(screenContainer, "onTouchStart");
        expect(dismissKeyboard).toBeCalled();
      });
      it("should run the verifyOtp function when the submit button is pressed and user is not a vendor", async () => {
        const dispatch = jest.fn(), navigate = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
        renderApollo(<VerifyPhoneScreen />, MOCK_VERIFY_PHONE);
        const button = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "1234");
        fireEvent.press(button);
        await waitFor(() => {
          expect(setItem).toBeCalledWith("huelageRefreshToken", "123");
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...user, isPhoneVerified: true }, accessToken: "123" } });
          expect(showSuccess).toBeCalledWith("Phone number verified successfully");
          expect(navigate).toBeCalledWith("Setting");
        });
      });
      it("should not run the submit function if the otp code is not 4 digits", async () => {
        const navigate = jest.fn();
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ navigate });
        renderApollo(<VerifyPhoneScreen />, MOCK_VERIFY_PHONE);
        const submitButton = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "123");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(navigate).not.toBeCalled();
        });
      });
      it("should call the resend code function when the resend code button is pressed", async () => {
        const dispatch = jest.fn(), goBack = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        renderApollo(<VerifyPhoneScreen />, MOCK_REQUEST_PHONE_VERIFICATION);
        jest.advanceTimersByTime(58000);
        await waitFor(() => {
          const resendCodeButton = screen.getByText("Resend Code");
          fireEvent.press(resendCodeButton);
          expect(screen.getByText(/resend code in/i)).toBeOnTheScreen();
        });
        await waitFor(() => {
          expect(screen.getByText(/59/i)).toBeOnTheScreen();
        });
      });
    });
  });
});

describe("Order Screens: ", () => {
  describe("<OrderDetailScreen />: ", () => {
    beforeEach(() => {
      (useRoute as jest.Mock).mockReturnValue({ params: { orderId: "1" } });
      render(<OrderDetailScreen />);
    });
    it("should render the screen correctly", () => {
      expect(screen.getByTestId("order detail screen")).toBeOnTheScreen();
    });
    it("should not render the screen if the order id is not provided", () => {
      (useRoute as jest.Mock).mockReturnValue({ params: {} });
      render(<OrderDetailScreen />);
      expect(screen.queryByTestId("order detail screen")).toBeNull();
    });
    it("should render the header box", () => {
      expect(screen.getByTestId("header box")).toBeOnTheScreen();
    });
    it("should render the order header box", () => {
      expect(screen.getByTestId("order header box")).toBeOnTheScreen();
    });
    it("should render the order detail items list", () => {
      expect(screen.getByTestId("order detail item list")).toBeOnTheScreen();
    });
    it("should render the order detail items using the OrderDetailItem component", () => {
      expect(screen.getAllByTestId("order detail item")).toHaveLength(1);
    });
    it("should render the TrackOrder component", () => {
      expect(screen.getByTestId("track order")).toBeOnTheScreen();
    });
    it("should render the call rider button if order is en route already", () => {
      (useRoute as jest.Mock).mockReturnValue({ params: { orderId: "5" } });
      render(<OrderDetailScreen />);
      expect(screen.getByTestId("call rider button")).toBeOnTheScreen();
    });
    it("should render the cancel order button if order is pending approval", () => {
      (useRoute as jest.Mock).mockReturnValue({ params: { orderId: "6" } });
      render(<OrderDetailScreen />);
      expect(screen.getByTestId("cancel order button")).toBeOnTheScreen();
    });
    it("should not render the TrackOrder component if the order is resolved or rejected", () => {
      (useRoute as jest.Mock).mockReturnValue({ params: { orderId: "4" } });
      render(<OrderDetailScreen />);
      expect(screen.queryByTestId("track order")).toBeNull();
    });
  });

  describe("<OrderScreen />: ", () => {
    beforeEach(() => {
      render(<OrderScreen />);
    });
    it("should render the screen correctly", () => {
      expect(screen.getByTestId("order screen")).toBeOnTheScreen();
    });
    describe("When there are no orders: ", () => {
      const navigate = jest.fn();
      beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue({ navigate });
        render(<OrderScreen testEmpty />);
      });
      it("should render the order empty image", () => {
        const emptyImage = screen.getByTestId("order empty image");
        expect(emptyImage).toBeOnTheScreen();
        expect(emptyImage.props.source).toBeDefined();
      });
      it("should render the order empty text", () => {
        expect(screen.getByText(/you haven't made any order with huelage/i)).toBeOnTheScreen();
      });
      it("should render the order empty button", () => {
        expect(screen.getByTestId("submit button")).toBeOnTheScreen();
      });
      it("should navigate to the vendor main screen when the order empty button is pressed", () => {
        const button = screen.getByTestId("submit button");
        fireEvent.press(button);
        expect(navigate).toBeCalledWith("Vendors", { screen: "Main" });
      });
    });
    it("should render the order box header", () => {
      expect(screen.getByTestId("order box header")).toBeOnTheScreen();
    });
    it("should render the order summary elements list", () => {
      expect(screen.getByTestId("order summary elements list")).toBeOnTheScreen();
    });
    it("should render the order summary elements using the OrderSummaryElement component", () => {
      expect(screen.getAllByTestId("order summary element")).not.toBeNull();
    });
    // Testing Functionality
    it("should filter the items when a filter item is pressed", () => {
      const filterItems = screen.getAllByTestId("filter item");
      filterItems.forEach(item => {
        fireEvent.press(item);
        expect(screen.queryAllByTestId("order summary element")).toBeDefined();
      });
      filterItems.forEach(item => {
        fireEvent.press(item);
        expect(screen.queryAllByTestId("order summary element")).toBeDefined();
      });
    });
    it("should filter by date when the date filter item is pressed", () => {
      const filterHeaderItem = screen.getAllByTestId("filter header item")[1];
      fireEvent.press(filterHeaderItem);
      const filterItems = screen.getAllByTestId("filter item");
      filterItems.forEach(item => {
        fireEvent.press(item);
        expect(screen.queryAllByTestId("order summary element")).toBeDefined();
      });
      fireEvent.press(filterItems[3]);
      expect(screen.queryAllByTestId("order summary element")).toBeDefined();
    });
    it("should navigate to the order detail screen when an order is pressed", () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      render(<OrderScreen />);
      const orderItem = screen.getAllByTestId("order element")[0];
      fireEvent.press(orderItem);
      expect(navigate).toBeCalledWith("OrderDetail", { orderId: expect.stringMatching(/\d/) });
    });
  });
});
