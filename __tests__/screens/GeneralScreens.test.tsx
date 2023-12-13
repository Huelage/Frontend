import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { useNavigation } from "@react-navigation/native";
import { AboutScreen, ChangePasswordScreen, ChangePhoneScreen, FAQScreen, HelpScreen, VerifyEmailScreen, VerifyPhoneScreen } from "@screens/General";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { setItem, showSuccess } from "@utils";
import { Keyboard } from "react-native";
import { MOCK_CHANGE_PASSWORD, MOCK_REQUEST_EMAIL_VERIFICATION, MOCK_REQUEST_PHONE_VERIFICATION, MOCK_VERIFY_EMAIL, MOCK_VERIFY_PHONE } from "../gql.mocks";
import { entity, renderApollo } from "../testhelpers";

describe("When Testing General Screens: ", () => {
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