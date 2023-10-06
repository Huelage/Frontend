import { useAppSelector } from "@api/app/appHooks";
import { useRoute } from "@react-navigation/native";
import { ForgotPasswordScreen, LoginScreen, OTPScreen, OnBoardScreen, SetPasswordScreen, SignUpScreen, SignupSelectScreen, VerifyEmailScreen } from "@screens/auth";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { getBiometrics, getItem } from "@utils";
import { renderApollo, renderApolloNavigator, renderNavigator } from "../testhelpers";

describe("When Testing Authentication Screens: ", () => {
  describe("<ForgotPasswordScreen />: ", () => {
    beforeEach(() => {
      const mocks: any = [];
      renderApolloNavigator(<ForgotPasswordScreen />, mocks);
    });
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
  });

  describe("<LoginScreen />: ", () => {
    beforeEach(async () => {
      await waitFor(() => (
        renderApollo(<LoginScreen />, [])
      ));
    });
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
    it("should render the CustomTextInput component", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the email input", () => {
      expect(screen.getByPlaceholderText("Email address")).toBeOnTheScreen();
    });
    it("should render the password input", () => {
      expect(screen.getByPlaceholderText("Password")).toBeOnTheScreen();
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

    describe("When the vendor status is true", () => {
      it("should render the vendor id input instead of the email input", async () => {
        (useAppSelector as jest.Mock).mockReturnValue(true);
        await waitFor(() => (
          renderApollo(<LoginScreen />, [])
        ));
        expect(screen.getByPlaceholderText("Vendor Key")).toBeOnTheScreen();
        expect(screen.queryByPlaceholderText("Email address")).toBeNull();
      });
    });

    describe("When there is saved login details", () => {
      beforeEach(async () => {
        (getItem as jest.Mock).mockImplementation(() => Promise.resolve("test key"));
        await waitFor(() => (
          renderApollo(<LoginScreen />, [])
        ));
      });
      it("should not render the email or vendor key inputs", () => {
        expect(screen.queryByPlaceholderText("Email address")).toBeNull();
        expect(screen.queryByPlaceholderText("Vendor ID")).toBeNull();
      });
      it("should render the saved name instead of the welcome info text", () => {
        expect(screen.getByText(/test key/i)).toBeOnTheScreen();
      });
      it("should render the switch account text cta", () => {
        expect(screen.getByText(/Switch/i)).toBeOnTheScreen();
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
      it("should not render the email or vendor id inputs", () => {
        expect(screen.queryByPlaceholderText("Email address")).toBeNull();
        expect(screen.queryByPlaceholderText("Vendor ID")).toBeNull();
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
    });
  });


  describe("<OnBoardScreen />: ", () => {
    beforeEach(async () => {
      await waitFor(() => {
        render(<OnBoardScreen />);
      });
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
      expect(screen.getByText(/Log in/i)).toBeOnTheScreen();
    });
    it("should render the signup button", () => {
      expect(screen.getByText(/Sign up/i)).toBeOnTheScreen();
    });
  });


  describe("<OTPScreen />: ", () => {
    beforeEach(() => {
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "+234 8058731812" } });
      renderApolloNavigator(<OTPScreen />, []);
    });
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
  });


  describe("<SetPasswordScreen />: ", () => {
    beforeEach(() => {
      renderApolloNavigator(<SetPasswordScreen />, []);
    });
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
    it("should render 2 CustomTextInput components when user is not signed in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      renderApolloNavigator(<SetPasswordScreen />, []);
      expect(screen.getAllByTestId("custom text input")).toHaveLength(2);
    });
    it("should render 3 CustomTextInput components when user is signed in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      renderApolloNavigator(<SetPasswordScreen />, []);
      expect(screen.getAllByTestId("custom text input")).toHaveLength(3);
    });
    it("should render the new password and confirm password inputs", () => {
      expect(screen.getByPlaceholderText("New password")).toBeOnTheScreen();
      expect(screen.getByPlaceholderText("Confirm Password")).toBeOnTheScreen();
    });
    it("should render the old password input only when user is signed in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      renderApolloNavigator(<SetPasswordScreen />, []);
      expect(screen.getByPlaceholderText("Old password")).toBeOnTheScreen();
      (useAppSelector as jest.Mock).mockReturnValue(false);
      renderApolloNavigator(<SetPasswordScreen />, []);
      expect(screen.queryByPlaceholderText("Old password")).toBeNull();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
  });


  describe("<SignUpScreen />: ", () => {
    beforeEach(() => {
      const mocks: any = [];
      renderApollo(<SignUpScreen />, mocks);
    });
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
    it("should render the CustomTextInput component", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the email input", () => {
      expect(screen.getByPlaceholderText("Email address")).toBeOnTheScreen();
    });
    it("should render the phone input", () => {
      expect(screen.getByTestId("phone input")).toBeOnTheScreen();
    });
    it("should render the password input", () => {
      expect(screen.getByPlaceholderText("Create password")).toBeOnTheScreen();
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
      it("should render the business name input", () => {
        expect(screen.getByPlaceholderText("Business name")).toBeOnTheScreen();
      });
      it("should render the business address input", () => {
        expect(screen.getByPlaceholderText("Business address")).toBeOnTheScreen();
      });
      it("should render the vendor name input", () => {
        expect(screen.getByPlaceholderText("Vendor's name")).toBeOnTheScreen();
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

    describe("When the vendor status is false", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(false);
        renderApollo(<SignUpScreen />, []);
      });
      it("should render the first name input", () => {
        expect(screen.getByPlaceholderText("First name")).toBeOnTheScreen();
      });
      it("should render the last name input", () => {
        expect(screen.getByPlaceholderText("Last name")).toBeOnTheScreen();
      });
    });
  });


  describe("<SignupSelectScreen />: ", () => {
    beforeEach(() => {
      renderNavigator(<SignupSelectScreen />);
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
      expect(screen.getByText(/vendor/i)).toBeOnTheScreen();
    });
    it("should render the signup as user button", () => {
      expect(screen.getByText(/user/i)).toBeOnTheScreen();
    });
  });


  describe("<VerifyEmailScreen />: ", () => {
    beforeEach(() => {
      renderApolloNavigator(<VerifyEmailScreen />, []);
    });
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
      expect(screen.getByText(/didn't receive a code/i)).toBeOnTheScreen();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
  });
});
