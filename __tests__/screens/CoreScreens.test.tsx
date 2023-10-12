import { CartScreen, DetailScreen, HomeScreen, LocationScreen, PersonalDetailScreen, VendorScreen, VerifyEmailScreen, VerifyPhoneScreen } from "@screens/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { renderApollo, renderNavigator } from "../testhelpers";
import { Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { MOCK_REFRESH_OTP, MOCK_REQUEST_EMAIL_VERIFICATION, MOCK_VERIFY_EMAIL, MOCK_VERIFY_PHONE } from "../gql.mocks";
import { useNavigation } from "@react-navigation/native";
import { setItem, showSuccess } from "@utils";

describe("When Testing Core(User Flow) Screens: ", () => {
  const testSearchFunc = () => {
    const searchBar = screen.getByPlaceholderText(/search dishes/i);
    fireEvent.changeText(searchBar, "test");
    expect(console.log).toBeCalledWith("test");
  };
  const entity = {
    id: "123",
    walletId: "123",
    imgUrl: "123",
    firstName: "John",
    lastName: "Doe",
    phone: "+2349058731812",
    email: "mail@mail.com",
    knownLocations: [],
    isPhoneVerified: true,
    isEmailVerified: true
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
        (useAppSelector as jest.Mock).mockReturnValue(entity);
        renderApollo(<PersonalDetailScreen />, []);
      });
      // Testing UI
      it("should render the component correctly", () => {
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
      it("should call the VerifyEmail function when the email element is pressed and email is not verified", async () => {
        const navigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        renderApollo(<PersonalDetailScreen />, MOCK_REFRESH_OTP);
        const phoneElement = screen.getByTestId("unverified");
        fireEvent.press(phoneElement);
        await waitFor(() => {
          expect(navigate).toBeCalledWith("VerifyPhone");
        });
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
        const dispatch = jest.fn(), goBack = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        renderApollo(<VerifyPhoneScreen />, MOCK_VERIFY_PHONE);
        const button = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "1234");
        fireEvent.press(button);
        await waitFor(() => {
          expect(setItem).toBeCalledWith("huelageRefreshToken", "123");
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: { ...user, isPhoneVerified: true }, accessToken: "123" } });
          expect(showSuccess).toBeCalledWith("Phone number verified successfully");
          expect(goBack).toBeCalled();
        });
      });
      it("should not run the submit function if the otp code is not 4 digits", async () => {
        const goBack = jest.fn();
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        renderApollo(<VerifyPhoneScreen />, MOCK_VERIFY_PHONE);
        const submitButton = screen.getByTestId("submit button");
        const input = screen.getByTestId("custom pin input");
        fireEvent.changeText(input, "123");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(goBack).not.toBeCalled();
        });
      });
      it("should call the resend code function when the resend code button is pressed", async () => {
        const dispatch = jest.fn(), goBack = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        const user = { ...entity, isPhoneVerified: false };
        (useAppSelector as jest.Mock).mockReturnValue(user);
        (useNavigation as jest.Mock).mockReturnValue({ goBack });
        renderApollo(<VerifyPhoneScreen />, MOCK_REFRESH_OTP);
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