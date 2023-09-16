import { useAppSelector } from "@api/app/appHooks";
import { useRoute } from "@react-navigation/native";
import { ForgotPasswordScreen, LoginScreen, OTPScreen, OnBoardScreen, SetPasswordScreen, SignupSelectScreen, VerifyEmailScreen } from "@screens/auth";
import { render, screen, waitFor } from "@testing-library/react-native";
import { getBiometrics } from "@utils";
import { renderNavigator } from "../testhelpers";

describe("When Testing Authentication Screens: ", () => {
  describe("<ForgotPasswordScreen />: ", () => {
    beforeEach(() => {
      renderNavigator(<ForgotPasswordScreen />);
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
        render(<LoginScreen />)
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
          render(<LoginScreen />)
        ));
        expect(screen.getByPlaceholderText("Vendor ID")).toBeOnTheScreen();
        expect(screen.queryByPlaceholderText("Email address")).toBeNull();
      });
    });

    describe("When the users biometric is enrolled", () => {
      beforeEach(async () => {
        (getBiometrics as jest.Mock).mockImplementation(() => Promise.resolve({ hasBiometrics: true, biometricType: [1], isEnrolled: false }));
        await waitFor(() => (
          render(<LoginScreen />)
        ));
      });
      it("should not render the email or vendor id inputs", () => {
        expect(screen.queryByPlaceholderText("Email address")).toBeNull();
        expect(screen.queryByPlaceholderText("Vendor ID")).toBeNull();
      });
      it("should render the switch account text cta", () => {
        expect(screen.getByText(/Switch/i)).toBeOnTheScreen();
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
      (useRoute as jest.Mock).mockReturnValue({ params: { phoneno: "8058731812" } });
      renderNavigator(<OTPScreen />);
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
      renderNavigator(<SetPasswordScreen />);
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
      renderNavigator(<SetPasswordScreen />);
      expect(screen.getAllByTestId("custom text input")).toHaveLength(2);
    });
    it("should render 3 CustomTextInput components when user is signed in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      renderNavigator(<SetPasswordScreen />);
      expect(screen.getAllByTestId("custom text input")).toHaveLength(3);
    });
    it("should render the new password and confirm password inputs", () => {
      expect(screen.getByPlaceholderText("New password")).toBeOnTheScreen();
      expect(screen.getByPlaceholderText("Confirm Password")).toBeOnTheScreen();
    });
    it("should render the old password input only when user is signed in", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      renderNavigator(<SetPasswordScreen />);
      expect(screen.getByPlaceholderText("Old password")).toBeOnTheScreen();
      (useAppSelector as jest.Mock).mockReturnValue(false);
      renderNavigator(<SetPasswordScreen />);
      expect(screen.queryByPlaceholderText("Old password")).toBeNull();
    });
    it("should render the SubmitButton component", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
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
      renderNavigator(<VerifyEmailScreen />);
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
