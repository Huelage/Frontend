import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { mockCartItems } from "@api/mock";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CartScreen, HomeScreen, ItemDetailScreen, LocationScreen, OrderDetailScreen, OrderScreen, PersonalDetailScreen, ProfileScreen, ReferralScreen, SettingScreen, VendorListScreen, VendorScreen, WalletScreen } from "@screens/core";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { showError } from "@utils";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Keyboard } from "react-native";
import { extension, lookup } from "react-native-mime-types";
import uuid from "react-native-uuid";
import { MOCK_ADD_LOCATION, MOCK_GET_MANY_VENDORS, MOCK_GET_MANY_VENDORS_EMPTY, MOCK_GET_MANY_VENDORS_ONE, MOCK_GET_PRODUCT, MOCK_GET_VENDORS_LIST, MOCK_GET_VENDOR_INFO, MOCK_REQUEST_EMAIL_VERIFICATION, MOCK_REQUEST_PHONE_VERIFICATION, MOCK_UPLOAD_IMAGE } from "../gql.mocks";
import { entity, initialState, renderApollo } from "../testhelpers";

describe("When Testing Core(User Flow) Screens: ", () => {
  const testSearchFunc = (logSpy: any) => {
    const searchBar = screen.getByPlaceholderText(/search dishes/i);
    fireEvent.changeText(searchBar, "test");
    expect(logSpy).toBeCalledWith("test");
  };

  describe("<CartScreen />: ", () => {
    const dispatch = jest.fn(), navigate = jest.fn();
    const CART_MOCKS = [...MOCK_GET_MANY_VENDORS, ...MOCK_GET_PRODUCT];
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(mockCartItems);
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      renderApollo(<CartScreen />, CART_MOCKS);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("cart screen")).toBeOnTheScreen();
    });
    it("should render the header box", () => {
      expect(screen.getByTestId("header box")).toBeOnTheScreen();
    });
    it("should render the vendor cart list", async () => {
      await waitFor(() => screen.getAllByTestId("vendor cart item"));
      expect(screen.getByTestId("vendor cart list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("vendor cart item")).not.toBeNull();
    });
    it("should not render the vendor cart list if cart is empty", () => {
      (useAppSelector as jest.Mock).mockReturnValue([]);
      renderApollo(<CartScreen />, MOCK_GET_MANY_VENDORS_EMPTY);
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
      renderApollo(<CartScreen />, MOCK_GET_MANY_VENDORS_EMPTY);
      expect(screen.queryByTestId("continue shopping")).toBeNull();
    });
    it("should render the overview box", () => {
      expect(screen.getByTestId("overview box")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should switch between various vendor carts", async () => {
      await waitFor(() => screen.getAllByTestId("vendor cart item"));
      const vendorCartItems = screen.getAllByTestId("vendor cart item");
      vendorCartItems.forEach(item => {
        fireEvent.press(item);
      });
    });
    it("should clear the vendor's cart when the clear cart button is pressed", async () => {
      await waitFor(() => screen.getAllByTestId("vendor cart item"));
      const clearCartButton = screen.getByTestId("clear cart button");
      const vendorCartItems = screen.getAllByTestId("vendor cart item");
      fireEvent.press(clearCartButton);
      fireEvent.press(vendorCartItems[2]);
      fireEvent.press(clearCartButton);
      // Emulate 1 cart item
      (useAppSelector as jest.Mock).mockReturnValue([mockCartItems[0]]);
      renderApollo(<CartScreen />, [...MOCK_GET_MANY_VENDORS_ONE, ...MOCK_GET_PRODUCT]);
      await waitFor(() => screen.getAllByTestId("vendor cart item"));
      fireEvent.press(screen.getByTestId("clear cart button"));
      expect(dispatch).toBeCalledWith({ type: "global/clearCart", payload: "123" });
    });
    it("should call the continueShopping function when the continue shopping button is pressed", async () => {
      await waitFor(() => expect(screen.getAllByTestId("vendor cart item")));
      const vendorCartItem = screen.getAllByTestId("vendor cart item")[1];
      const clearCartButton = screen.getByTestId("clear cart button");
      const continueShoppingButton = screen.getByTestId("continue shopping");
      fireEvent.press(vendorCartItem);
      fireEvent.press(clearCartButton);
      fireEvent.press(continueShoppingButton);
      expect(navigate).toBeCalledWith("Vendors", { screen: "VendorHome", params: { vendorId: expect.any(String) }, initial: false });
    });
    it("should call the checkout function when the checkout button is pressed", () => {
      const logSpy = jest.spyOn(console, "log");
      renderApollo(<CartScreen />, CART_MOCKS);
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
      beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "1", vendorId: "1" } });
        (useAppSelector as jest.Mock).mockReturnValue(mockCartItems);
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("item detail screen")).toBeOnTheScreen();
      });
      it("should render the go back button", () => {
        expect(screen.getByTestId("go back")).toBeOnTheScreen();
      });
      it("should render the item image", () => {
        expect(screen.getByTestId("item image")).toBeOnTheScreen();
      });
      it("should render the item info", () => {
        expect(screen.getByTestId("item info")).toBeOnTheScreen();
      });
      it("should render the package size list items using the CustomButton component", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "4", vendorId: "234" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("package size list")).toBeOnTheScreen());
        expect(screen.getAllByTestId("custom button")).not.toBeNull();
      });
      it("should render the amount box with a quantityController component if item pricing method is portion", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "2", vendorId: "234" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("amount box")).toBeOnTheScreen());
        expect(screen.getByTestId("quantity controller")).toBeOnTheScreen();
      });
      it("should render the amount box with a text input if item pricing method is price", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "3", vendorId: "345" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("amount box")).toBeOnTheScreen());
        expect(screen.getByPlaceholderText("300")).toBeOnTheScreen();
      });
      it("should render the item side list items using the ItemSideElement component", async () => {
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("item side list")));
        expect(screen.getByTestId("item side list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("item side element")).not.toBeNull();
      });
      it("should render the quantity box", () => {
        expect(screen.getByTestId("quantity box")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should change the pack size when the item pricing method is package", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "4", vendorId: "234" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("package size list")));
        const packButtons = screen.getAllByTestId("custom button");
        packButtons.forEach(button => {
          fireEvent.press(button);
        });
      });
      it("should allow user enter their preferred price if item pricing method is price", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "3", vendorId: "345" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByPlaceholderText("300")));
        const input = screen.getByPlaceholderText("300");
        fireEvent.changeText(input, "500");
      });
      it("should alter the quantity when the increase or decrease quantity button is pressed", () => {
        const increaseButton = screen.getByTestId("increase quantity button");
        const decreaseButton = screen.getByTestId("decrease quantity button");
        const quantityText = screen.getByTestId("quantity value text");
        fireEvent.press(increaseButton);
        expect(quantityText.props.children).toEqual(2);
        fireEvent.press(decreaseButton);
        expect(quantityText.props.children).toEqual(1);
      });
      it("should alter the portion when the increase or decrease amount button is pressed and item is sold per portion", async () => {
        (useRoute as jest.Mock).mockReturnValue({ params: { itemId: "2", vendorId: "234" } });
        renderApollo(<ItemDetailScreen />, MOCK_GET_PRODUCT);
        await waitFor(() => expect(screen.getByTestId("quantity controller")));
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
        renderApollo(<VendorListScreen />, MOCK_GET_VENDORS_LIST);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("vendor list screen")).toBeOnTheScreen();
      });
      it("should render the MainSearchBar component", () => {
        expect(screen.getByTestId("main search bar")).toBeOnTheScreen();
      });
      it("should render the vendors list items using the VendorResCard component", async () => {
        await waitFor(() => expect(screen.getAllByTestId("vendor res card")));
        expect(screen.getByTestId("vendors list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("vendor res card")).not.toBeNull();
      });
      it("should call the search function when the search bar is used", async () => {
        const logSpy = jest.spyOn(console, "log");
        renderApollo(<VendorListScreen />, MOCK_GET_VENDORS_LIST);
        testSearchFunc(logSpy);
      });
    });

    describe("<VendorScreen />: ", () => {
      beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue({ params: { vendorId: "123" } });
        renderApollo(<VendorScreen />, MOCK_GET_VENDOR_INFO);
      });
      it("should render the component correctly", () => {
        expect(screen.getByTestId("vendor screen")).toBeOnTheScreen();
      });
      it("should render the background image", () => {
        const bgImg = screen.getByTestId("vendor screen header");
        expect(bgImg).toBeOnTheScreen();
        expect(bgImg.props.source).toBeDefined();
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
      it("should render the vendor product list items using the VendorProduct component", async () => {
        await waitFor(() => screen.getAllByTestId("vendor product"));
        expect(screen.getByTestId("vendor product list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("vendor product")).not.toBeNull();
      });
      it("should change categories when any of the category buttons are pressed", async () => {
        await waitFor(() => screen.getAllByTestId("vendor product"));
        const categoryButton = screen.getAllByTestId("custom button");
        categoryButton.forEach(btn => {
          act(() => fireEvent.press(btn));
          expect(btn.props.inactive).toBeFalsy();
        });
      });
      it("should call the search function when the search bar is used", () => {
        const logSpy = jest.spyOn(console, "log");
        renderApollo(<VendorScreen />, MOCK_GET_VENDOR_INFO);
        testSearchFunc(logSpy);
      });
    });
  });

  describe("Profile Screens: ", () => {
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
      it("should render the ImageUploader container", () => {
        expect(screen.getByTestId("image uploader")).toBeOnTheScreen();
      });
      it("should render 2 profile nav boxes", () => {
        expect(screen.getAllByTestId("profile nav box")).toHaveLength(2);
      });
      it("should call addImage function when the image uploader is pressed", async () => {
        (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123" }] })));
        (useAppSelector as jest.Mock).mockReturnValue(undefined);
        (lookup as jest.Mock).mockReturnValue("image");
        (extension as jest.Mock).mockReturnValue("");
        jest.spyOn(uuid, "v4").mockReturnValue("123");
        const logSpy = jest.spyOn(console, "log");
        renderApollo(<ProfileScreen />, MOCK_UPLOAD_IMAGE);
        await act(() => fireEvent.press(screen.getByTestId("add image button")));
        const upload = screen.getByTestId("upload button");
        fireEvent.press(upload);
        await waitFor(() => expect(logSpy).toBeCalledWith("image"));
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
