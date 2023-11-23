import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ForgotPasswordScreen, LoginScreen, OTPScreen, OnBoardScreen, SetPasswordScreen, SignUpScreen, SignupSelectScreen, VerifyEmailScreen } from "@screens/auth";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { enableBiometrics, getBiometrics, getItem, loginWithBiometrics } from "@utils";
import { Alert, Keyboard } from "react-native";
import { MOCK_LOGIN_USER, MOCK_LOGIN_VENDOR_SAVED, MOCK_REQUEST_EMAIL_VERIFICATION, MOCK_REQUEST_PHONE_VERIFICATION, MOCK_SET_PASSWORD, MOCK_SIGNUP_USER, MOCK_SIGNUP_VENDOR, MOCK_VERIFY_EMAIL, MOCK_VERIFY_OTP } from "../gql.mocks";
import { renderApollo } from "../testhelpers";

describe("When Testing Authentication Screens: ", () => {
  const userState = {
    id: "123",
    walletId: "123",
    firstName: "John",
    lastName: "Doe",
    email: "mail@mail.com",
    phone: "+2349058731812",
    imgUrl: null,
    isPhoneVerified: false,
    isEmailVerified: true,
    knownLocation: []
  };
  const vendorState = {
    id: "123",
    walletId: "123",
    businessName: "John Doe",
    businessAddress: "123 Main St",
    repName: "John Doe",
    email: "mail@mail.com",
    phone: "+2349058731812",
    imgUrl: null,
    isPhoneVerified: false,
    isEmailVerified: true
  };

  describe("<ForgotPasswordScreen />: ", () => {
    beforeEach(() => {
      renderApollo(<ForgotPasswordScreen />, []);
    });
    // Testing UI
    it("should render the ForgotPasswordScreen component", () => {
      expect(screen.getByTestId("forgot password screen")).toBeOnTheScreen();
    });
    it("should render the screen title", () => {
      expect(screen.getByText(/forgot password/i)).toBeOnTheScreen();
    });
    it("should render the back button", () => {
      expect(screen.getByTestId("go back")).toBeOnTheScreen();
    });
    it("should render the screen main icon", () => {
      expect(screen.getByTestId("screen icon")).toBeOnTheScreen();
    });
    it("should render the info text", () => {
      expect(screen.getByText(/enter your registered email/i)).toBeOnTheScreen();
    });
    it("should render the CustomTextInput component", () => {
      expect(screen.getByTestId("custom text input")).toBeOnTheScreen();
    });
    it("should render the email input", () => {
      expect(screen.getByPlaceholderText("Email address")).toBeOnTheScreen();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should dismiss the keyboard when the screen is touched", () => {
      const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
      renderApollo(<ForgotPasswordScreen />, []);
      const screenContainer = screen.getByTestId("forgot password screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should call the submit function when the submit button is pressed", async () => {
      const navigate = jest.fn();
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      renderApollo(<ForgotPasswordScreen />, MOCK_REQUEST_EMAIL_VERIFICATION);
      const button = screen.getByTestId("submit button");
      const input = screen.getByPlaceholderText("Email address");
      fireEvent.changeText(input, "mail@mail.com");
      fireEvent.press(button);
      await waitFor(() => {
        expect(dispatch).toBeCalledWith({ type: "global/setVendorStatus", payload: true });
        expect(navigate).toBeCalledWith("VerifyEmail", { email: "mail@mail.com" });
      });
    });
  });

  describe("<LoginScreen />: ", () => {
    beforeEach(async () => {
      await waitFor(() => (
        renderApollo(<LoginScreen />, [])
      ));
    });
    // Testing UI
    it("should render the LoginScreen component", () => {
      expect(screen.getByTestId("login screen")).toBeOnTheScreen();
    });
    it("should render the logo image", () => {
      const logoImage = screen.getByTestId("logo image");
      expect(logoImage).toBeOnTheScreen();
      expect(logoImage.props.source).toBeDefined();
    });
    it("should render the welcome text", () => {
      expect(screen.getByText("Welcome Back!")).toBeOnTheScreen();
    });
    it("should render the welcome info text", () => {
      expect(screen.getByText(/login to continue/i)).toBeOnTheScreen();
    });
    it("should render the UserVendor component", () => {
      expect(screen.getByTestId("user vendor")).toBeOnTheScreen();
    });
    it("should render the LoginInputs component", () => {
      expect(screen.getByTestId("login inputs")).toBeOnTheScreen();
    });
    it("should render the forgot password button", () => {
      expect(screen.getByText("Forgot Password?")).toBeOnTheScreen();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    it("should render the AuthNavigate component", () => {
      expect(screen.getByTestId("auth navigate")).toBeOnTheScreen();
    });
    it("should render the contact us text", () => {
      expect(screen.getByText(/Need help?/i)).toBeOnTheScreen();
    });
    describe("When there is saved login details and isType is true", () => {
      beforeEach(async () => {
        (getItem as jest.Mock).mockImplementation(key => {
          if (key === "huelageEntityType") return Promise.resolve("VENDOR");
          else return Promise.resolve("test key");
        });
        (useAppSelector as jest.Mock).mockReturnValue(true);
        await waitFor(() => (
          renderApollo(<LoginScreen />, [])
        ));
      });
      it("should render the saved name instead of the welcome info text", () => {
        expect(screen.getByText(/test key/i)).toBeOnTheScreen();
      });
      it("should render the switch account text cta", () => {
        expect(screen.getByText(/Switch/i)).toBeOnTheScreen();
      });
      it("should change useSaved status when the switch account button is pressed", () => {
        const switchButton = screen.getByText(/Switch/i);
        fireEvent.press(switchButton);
        expect(screen.getByText(/login to continue/i)).toBeOnTheScreen();
      });
    });
    describe("When there is saved login details and isType is false", () => {
      beforeEach(async () => {
        (getItem as jest.Mock).mockImplementation(() => "test key");
        await waitFor(() => renderApollo(<LoginScreen />, []));
      });
      it("should render the login to continue text instead of the saved name", () => {
        expect(screen.getByText(/login to continue/i)).toBeOnTheScreen();
      });
      it("should not render the switch account text cta", () => {
        expect(screen.queryByText(/Switch/i)).toBeNull();
      });
    });
    describe("When the users biometric is enrolled", () => {
      beforeEach(async () => {
        (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [1], isEnrolled: true }));
        (getItem as jest.Mock).mockImplementation(() => Promise.resolve("test key"));
        await waitFor(() => (
          renderApollo(<LoginScreen />, [])
        ));
      });
      it("should render the biometric prompt text", () => {
        expect(screen.getByText(/Login with/i)).toBeOnTheScreen();
      });
      it("should render the biometric button", () => {
        expect(screen.getByTestId("biometric button")).toBeOnTheScreen();
      });
      it("should not render the AuthNavigate component", () => {
        expect(screen.queryByTestId("auth navigate")).toBeNull();
      });
      it("should change useSaved status when the switch account button is pressed", () => {
        const switchButton = screen.getByText(/Switch/i);
        fireEvent.press(switchButton);
        expect(screen.getByText(/login to continue/i)).toBeOnTheScreen();
      });
    });
    // Testing Functionality
    it("should dismiss the keyboard when the screen is touched", async () => {
      const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
      await waitFor(() => {
        renderApollo(<LoginScreen />, []);
      });
      const screenContainer = screen.getByTestId("login screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should navigate to the forgot password screen when the forgot password button is pressed", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      await waitFor(() => {
        renderApollo(<LoginScreen />, []);
      });
      const forgotPasswordButton = screen.getByText("Forgot Password?");
      fireEvent.press(forgotPasswordButton);
      expect(navigate).toBeCalledWith("ForgotPassword");
    });
    describe("When submit button is clicked it should call onSubmit: ", () => {
      const dispatch = jest.fn();
      it("(no saved detail and user is not a vendor)", async () => {
        (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [1], isEnrolled: false }));
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (getItem as jest.Mock).mockImplementation(() => Promise.resolve(null));
        const mockedAlert = jest.spyOn(Alert, "alert");
        (useAppSelector as jest.Mock).mockReturnValue(false);
        await waitFor(() => (
          renderApollo(<LoginScreen />, MOCK_LOGIN_USER)
        ));
        const submitButton = screen.getByTestId("submit button");
        const emailInput = screen.getByPlaceholderText("Email Address");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.changeText(emailInput, "mail@mail.com");
        fireEvent.changeText(passwordInput, "pass1&onlY");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(mockedAlert).toBeCalled();
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: userState, accessToken: "123" } });
        });
      });
      it("should test Alert popup for biometrics", async () => {
        (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [1], isEnrolled: false }));
        (getItem as jest.Mock).mockImplementation(() => Promise.resolve(null));
        const mockedAlert = jest.spyOn(Alert, "alert");
        await waitFor(() => (
          renderApollo(<LoginScreen />, MOCK_LOGIN_USER)
        ));
        const submitButton = screen.getByTestId("submit button");
        const emailInput = screen.getByPlaceholderText("Email Address");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.changeText(emailInput, "mail@mail.com");
        fireEvent.changeText(passwordInput, "pass1&onlY");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(mockedAlert).toBeCalled();
          if (mockedAlert.mock.calls[0][2]) {
            const enableButton = mockedAlert.mock.calls[0][2].find(button => button.text === "Enable");
            const notNowButton = mockedAlert.mock.calls[0][2].find(button => button.text === "Not now");
            expect(enableButton).toBeDefined();
            expect(notNowButton).toBeDefined();
            if (enableButton?.onPress) {
              enableButton.onPress();
              expect(enableBiometrics).toBeCalled();
            }
            if (notNowButton?.onPress) notNowButton.onPress();
          }
        });
      });
      it("(use saved details and user is vendor)", async () => {
        (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [2], isEnrolled: true }));
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (getItem as jest.Mock).mockImplementation(key => {
          if (key === "huelageEntityType") return Promise.resolve("VENDOR");
          else return Promise.resolve("123");
        });
        (useAppSelector as jest.Mock).mockReturnValue(true);
        await waitFor(() => (
          renderApollo(<LoginScreen />, MOCK_LOGIN_VENDOR_SAVED)
        ));
        const submitButton = screen.getByTestId("submit button");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.changeText(passwordInput, "pass1&onlY");
        fireEvent.changeText(passwordInput, "pass1&onlY");
        fireEvent.press(submitButton);
        await waitFor(() => {
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: vendorState, accessToken: "123" } });
        });
      });
      it("(use saved details and user is vendor and bio details saved)", async () => {
        (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
        (getItem as jest.Mock).mockImplementation(() => Promise.resolve("123"));
        (useAppSelector as jest.Mock).mockReturnValue(true);
        await waitFor(() => (
          renderApollo(<LoginScreen />, MOCK_LOGIN_VENDOR_SAVED)
        ));
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.changeText(passwordInput, "pass1&onlY");
        fireEvent(passwordInput, "onSubmitEditing");
        await waitFor(() => {
          expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: vendorState, accessToken: "123" } });
        });
      });
    });
    it("should call loginwithbiometrics function when the biometric button is pressed", async () => {
      (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [3], isEnrolled: true }));
      (getItem as jest.Mock).mockImplementation(() => Promise.resolve("123"));
      (useAppSelector as jest.Mock).mockReturnValue(true);
      await waitFor(() => renderApollo(<LoginScreen />, MOCK_LOGIN_VENDOR_SAVED));
      const biometricButton = screen.getByTestId("biometric button");
      fireEvent.press(biometricButton);
      await waitFor(() => expect(loginWithBiometrics).toBeCalled());
    });
  });

  describe("<OnBoardScreen />: ", () => {
    beforeEach(async () => {
      await waitFor(() => render(<OnBoardScreen />));
    });
    it("should render the OnBoardScreen component", () => {
      expect(screen.getByTestId("onboard screen")).toBeOnTheScreen();
    });
    it("should render the logo image", () => {
      const logoImage = screen.getByTestId("logo image");
      expect(logoImage).toBeOnTheScreen();
      expect(logoImage.props.source).toBeDefined();
    });
    it("should render the logo text", () => {
      expect(screen.getByText(/Huelage/i)).toBeOnTheScreen();
    });
    it("should render the login button", () => {
      expect(screen.getByTestId("login button")).toBeOnTheScreen();
    });
    it("should navigate to the login screen when the login button is pressed", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      await waitFor(() => render(<OnBoardScreen />));
      const loginButton = screen.getByTestId("login button");
      fireEvent.press(loginButton);
      expect(navigate).toBeCalledWith("Login");
    });
    it("should render the signup button", () => {
      expect(screen.getByTestId("signup button")).toBeOnTheScreen();
    });
    it("should navigate to the signup select screen when the signup button is pressed", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      await waitFor(() => render(<OnBoardScreen />));
      const loginButton = screen.getByTestId("signup button");
      fireEvent.press(loginButton);
      expect(navigate).toBeCalledWith("SignupSelect");
    });
    it("should navigate to the login screen if the showOnboard state is false", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      (useAppSelector as jest.Mock).mockReturnValue(false);
      await waitFor(() => render(<OnBoardScreen />));
      await waitFor(() => expect(navigate).toBeCalledWith("Login"));
    });
    it("should dispatch setShowOnboard(false) if the showOnboard state is true", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useAppSelector as jest.Mock).mockReturnValue(true);
      await waitFor(() => render(<OnBoardScreen />));
      await waitFor(() => expect(dispatch).toBeCalledWith({ type: "global/setShowOnboard", payload: false }));
    });
  });

  describe("<OTPScreen />: ", () => {
    beforeEach(() => {
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 805 873 1812" } });
      renderApollo(<OTPScreen />, []);
    });
    // Testing UI
    it("should render the component", () => {
      expect(screen.getByTestId("otp screen")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText(/otp code verification/i)).toBeOnTheScreen();
    });
    it("should render the back button", () => {
      expect(screen.getByTestId("back button")).toBeOnTheScreen();
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
      renderApollo(<OTPScreen />, []);
      const screenContainer = screen.getByTestId("otp screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should run the verifyOtp function when the submit button is pressed and user is not a vendor", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 905 873 1812" } });
      (useNavigation as jest.Mock).mockReturnValue({ goBack: jest.fn() });
      renderApollo(<OTPScreen />, MOCK_VERIFY_OTP);
      const button = screen.getByTestId("submit button");
      const input = screen.getByTestId("custom pin input");
      fireEvent.changeText(input, "1234");
      fireEvent.press(button);
      await waitFor(() => {
        expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: userState, accessToken: "123" } });
      });
    });
    it("should run the verifyOtp function when the submit button is pressed and user is a vendor", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 905 873 1812" } });
      (useNavigation as jest.Mock).mockReturnValue({ goBack: jest.fn() });
      renderApollo(<OTPScreen />, MOCK_VERIFY_OTP);
      const button = screen.getByTestId("submit button");
      const input = screen.getByTestId("custom pin input");
      fireEvent.changeText(input, "1234");
      fireEvent.press(button);
      await waitFor(() => {
        expect(dispatch).toBeCalledWith({ type: "global/setCredentials", payload: { entity: vendorState, accessToken: "123" } });
      });
    });
    it("should not run the submit function if the otp code is not 4 digits", async () => {
      const dispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 905 873 1812" } });
      (useNavigation as jest.Mock).mockReturnValue({ goBack: jest.fn() });
      renderApollo(<OTPScreen />, MOCK_VERIFY_OTP);
      const submitButton = screen.getByTestId("submit button");
      const input = screen.getByTestId("custom pin input");
      fireEvent.changeText(input, "123");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(dispatch).not.toBeCalledWith({ type: "global/setCredentials", payload: { entity: vendorState, accessToken: "123" } });
      });
    });
    it("should call the resend code function when the resend code button is pressed", async () => {
      (getItem as jest.Mock).mockReturnValue("123");
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 905 873 1812" } });
      (useNavigation as jest.Mock).mockReturnValue({ goBack: jest.fn() });
      renderApollo(<OTPScreen />, MOCK_REQUEST_PHONE_VERIFICATION);
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

  describe("<SetPasswordScreen />: ", () => {
    beforeEach(() => {
      renderApollo(<SetPasswordScreen />, []);
    });
    // Testing UI
    it("should render the component", () => {
      expect(screen.getByTestId("set password screen")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText(/set password/i)).toBeOnTheScreen();
    });
    it("should render the back button", () => {
      expect(screen.getByTestId("go back")).toBeOnTheScreen();
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
      renderApollo(<SetPasswordScreen />, []);
      const screenContainer = screen.getByTestId("set password screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should submit the form when the submit button is pressed if user is not a vendor and not signed in", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useRoute as jest.Mock).mockReturnValue({ params: { entityId: "123" } });
      renderApollo(<SetPasswordScreen />, MOCK_SET_PASSWORD);
      const submitButton = screen.getByTestId("submit button");
      const newPasswordInput = screen.getByPlaceholderText("New Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      fireEvent.changeText(newPasswordInput, "pass1&onlY");
      fireEvent.changeText(confirmPasswordInput, "pass1&onlY");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).toBeCalledWith("Login");
      });
    });
    it("should submit the form when the submit button is pressed if user is a vendor and signed in", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useRoute as jest.Mock).mockReturnValue({ params: { entityId: "123" } });
      renderApollo(<SetPasswordScreen />, MOCK_SET_PASSWORD);
      const submitButton = screen.getByTestId("submit button");
      const oldPasswordInput = screen.getByPlaceholderText("Old Password");
      const newPasswordInput = screen.getByPlaceholderText("New Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      fireEvent.changeText(oldPasswordInput, "password");
      fireEvent.changeText(newPasswordInput, "pass1&onlY");
      fireEvent.changeText(confirmPasswordInput, "pass1&onlY");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).toBeCalledWith("Login");
      });
    });
  });

  describe("<SignUpScreen />: ", () => {
    beforeEach(() => {
      const mocks: any = [];
      renderApollo(<SignUpScreen />, mocks);
    });
    // Testing UI
    it("should render the component", () => {
      expect(screen.getByTestId("signup screen")).toBeOnTheScreen();
    });
    it("should render the logo image", () => {
      const logoImage = screen.getByTestId("logo image");
      expect(logoImage).toBeOnTheScreen();
      expect(logoImage.props.source).toBeDefined();
    });
    it("should render the sign up", () => {
      expect(screen.getByTestId("welcome text")).toBeOnTheScreen();
    });
    it("should render the info text", () => {
      expect(screen.getByText(/please fill in your details/i)).toBeOnTheScreen();
    });
    it("should render the SignupInputs component", () => {
      expect(screen.getByTestId("signup inputs")).toBeOnTheScreen();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    it("should render the AuthNavigate component", () => {
      expect(screen.getByTestId("auth navigate")).toBeOnTheScreen();
    });
    describe("When the vendor status is true", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(true);
        renderApollo(<SignUpScreen />, []);
      });
      it("should render the terms and condition checkbox", () => {
        expect(screen.getByTestId("terms and condition")).toBeOnTheScreen();
      });
      it("should allow user accept terms and condition", () => {
        const tandt = screen.getByTestId("terms and condition");
        expect(tandt.props.accessibilityState.checked).toBeFalsy();
        act(() => fireEvent.press(tandt));
        expect(tandt.props.accessibilityState.checked).toBeTruthy();
      });
    });
    // Testing Functionality
    it("should dismiss the keyboard when the screen is pressed", () => {
      const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
      renderApollo(<SignUpScreen />, []);
      const screenContainer = screen.getByTestId("signup screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should call the submit function when the submit button is pressed if user is not vendor", async () => {
      const navigate = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      renderApollo(<SignUpScreen />, MOCK_SIGNUP_USER);
      const submitButton = screen.getByTestId("submit button");
      const firstNameInput = screen.getByPlaceholderText("First Name");
      const lastNameInput = screen.getByPlaceholderText("Last Name");
      const phoneInput = screen.getByPlaceholderText("Phone Number");
      const emailInput = screen.getByPlaceholderText("Email Address");
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.changeText(firstNameInput, "John");
      fireEvent.changeText(lastNameInput, "Doe");
      fireEvent.changeText(phoneInput, "+234 905 873 1812");
      fireEvent.changeText(emailInput, "mail@mail.com");
      fireEvent.changeText(passwordInput, "pass1&onlY");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).toBeCalledWith("OTP", { phoneno: "+234 905 873 1812" });
      });
    });
    it("should call the submit function when the submit button is pressed if user is vendor", async () => {
      const navigate = jest.fn();
      (useAppSelector as jest.Mock).mockReturnValue(true);
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      renderApollo(<SignUpScreen />, MOCK_SIGNUP_VENDOR);
      const submitButton = screen.getByTestId("submit button");
      const businessNameInput = screen.getByPlaceholderText("Business Name");
      const businessAddressInput = screen.getByPlaceholderText("Business Address");
      const repNameInput = screen.getByPlaceholderText("Vendor's Name");
      const phoneInput = screen.getByPlaceholderText("Phone Number");
      const emailInput = screen.getByPlaceholderText("Email Address");
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.changeText(businessNameInput, "John Doe");
      fireEvent.changeText(businessAddressInput, "123 Main St");
      fireEvent.changeText(repNameInput, "John Doe");
      fireEvent.changeText(phoneInput, "+234 905 873 1812");
      fireEvent.changeText(emailInput, "mail@mail.com");
      fireEvent.changeText(passwordInput, "pass1&onlY");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).toBeCalledWith("OTP", { phoneno: "+234 905 873 1812" });
      });
    });
  });

  describe("<SignupSelectScreen />: ", () => {
    beforeEach(() => {
      render(<SignupSelectScreen />);
    });
    it("should render the component", () => {
      expect(screen.getByTestId("signup select screen")).toBeOnTheScreen();
    });
    it("should render the logo image", () => {
      const logoImage = screen.getByTestId("logo image");
      expect(logoImage).toBeOnTheScreen();
      expect(logoImage.props.source).toBeDefined();
    });
    it("should render the info text", () => {
      expect(screen.getByText(/select account option/i)).toBeOnTheScreen();
    });
    it("should render the vendor select box", () => {
      expect(screen.getByTestId("vendor select box")).toBeOnTheScreen();
    });
    it("should render the user select box", () => {
      expect(screen.getByTestId("user select box")).toBeOnTheScreen();
    });
    it("should render the select box images", () => {
      const boxImages = screen.getAllByTestId("select box image");
      expect(boxImages).toHaveLength(2);
      boxImages.forEach(image => expect(image.props.source).toBeDefined());
    });
    it("should render the signup as vendor button", () => {
      expect(screen.getByTestId("signup vendor")).toBeOnTheScreen();
    });
    it("should navigate to the signup screen as a vendor when the signup as vendor button is pressed", () => {
      const dispatch = jest.fn();
      const navigate = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      render(<SignupSelectScreen />);
      const signupVendor = screen.getByTestId("signup vendor");
      fireEvent.press(signupVendor);
      expect(dispatch).toBeCalledWith({ type: "global/setVendorStatus", payload: true });
      expect(navigate).toBeCalledWith("SignUp");
    });
    it("should render the signup as user button", () => {
      expect(screen.getByTestId("signup user")).toBeOnTheScreen();
    });
    it("should navigate to the signup screen as a user when the signup as user button is pressed", () => {
      const dispatch = jest.fn();
      const navigate = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (useNavigation as jest.Mock).mockReturnValue({ navigate });
      render(<SignupSelectScreen />);
      const signupVendor = screen.getByTestId("signup user");
      fireEvent.press(signupVendor);
      expect(dispatch).toBeCalledWith({ type: "global/setVendorStatus", payload: false });
      expect(navigate).toBeCalledWith("SignUp");
    });
  });

  describe("<VerifyEmailScreen />: ", () => {
    beforeEach(() => {
      renderApollo(<VerifyEmailScreen />, []);
    });
    // Testing UI
    it("should render the component", () => {
      expect(screen.getByTestId("verify email screen")).toBeOnTheScreen();
    });
    it("should render the container title", () => {
      expect(screen.getByText(/email verification/i)).toBeOnTheScreen();
    });
    it("should render the back button", () => {
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
      expect(screen.getByText(/didn"t receive a code/i)).toBeOnTheScreen();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should dismiss the keyboard when the screen is pressed", () => {
      const dismissKeyboard = jest.spyOn(Keyboard, "dismiss");
      renderApollo(<VerifyEmailScreen />, []);
      const screenContainer = screen.getByTestId("verify email screen");
      fireEvent(screenContainer, "onTouchStart");
      expect(dismissKeyboard).toBeCalled();
    });
    it("should call the submit function when the submit button is pressed", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      (useRoute as jest.Mock).mockReturnValue({ params: { email: "mail@mail.com" } });
      renderApollo(<VerifyEmailScreen />, MOCK_VERIFY_EMAIL);
      const submitButton = screen.getByTestId("submit button");
      const input = screen.getByTestId("custom pin input");
      fireEvent.changeText(input, "1234");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).toBeCalledWith("SetPassword", { entityId: "123" });
      });
    });
    it("should not run the submit function if the otp code is not 4 digits", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      (useRoute as jest.Mock).mockReturnValue({ params: { email: "mail@mail.com" } });
      renderApollo(<VerifyEmailScreen />, MOCK_VERIFY_EMAIL);
      const submitButton = screen.getByTestId("submit button");
      const input = screen.getByTestId("custom pin input");
      fireEvent.changeText(input, "123");
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(navigate).not.toBeCalledWith("SetPassword", { entityId: "123" });
      });
    });
    it("should call the resend code function when the resend code button is pressed", async () => {
      const navigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValue({ navigate, goBack: jest.fn() });
      (useRoute as jest.Mock).mockReturnValue({ params: { email: "mail@mail.com" } });
      renderApollo(<VerifyEmailScreen />, MOCK_REQUEST_EMAIL_VERIFICATION);
      jest.advanceTimersByTime(58000);
      await waitFor(() => {
        const resendCodeButton = screen.getByText(/resend code/i);
        fireEvent.press(resendCodeButton);
        expect(screen.getByText(/didn"t receive a code/i)).toBeOnTheScreen();
      });
      await waitFor(() => {
        expect(screen.getByText(/59/i)).toBeOnTheScreen();
      });
    });
  });
});
