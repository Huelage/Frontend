import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { setVendorStatus } from "@api/slices/globalSlice";
import { AuthNavigate, CustomPinInput, CustomTextInput, LoginInputs, SetPasswordInputs, SignupInputs, SocialLogin, SubmitButton, UserVendor } from "@components/auth";
import { LoginInfoInterface, ResetPasswordInterface, SignUpInfoInterface } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useForm } from "react-hook-form";

describe("When Testing Authentication Components: ", () => {
  describe("<AuthNavigate />: ", () => {
    const navigate = jest.fn();
    beforeEach(() => {
      (useNavigation as jest.Mock).mockImplementation(() => ({
        navigate,
        dispatch: jest.fn()
      }));
      render(<AuthNavigate page="SU" />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("auth navigate")).toBeOnTheScreen();
    });
    it("should render info text", () => {
      expect(screen.getByText("Already a member?")).toBeOnTheScreen();
    });
    it("should render navigation button", () => {
      expect(screen.getByText("Login")).toBeOnTheScreen();
    });
    it("should try to navigate to login page when pressed", () => {
      fireEvent.press(screen.getByText("Login"));
      expect(navigate).toBeCalledWith("Login");
    });
    it("should try to navigate to the sign up page when pressed", () => {
      render(<AuthNavigate page="SI" />);
      fireEvent.press(screen.getByText("Sign Up"));
      expect(navigate).toBeCalledWith("SignupSelect");
    });
  });

  describe("<CustomPinInput />: ", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    beforeEach(async () => {
      await waitFor(() => {
        render(<CustomPinInput value="" onChange={onChange} onSubmit={onSubmit} />);
      });
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("custom pin input")).toBeOnTheScreen();
    });
    it("should render the 4 pin inputs", () => {
      expect(screen.getAllByTestId(/^pin input \d$/i)).toHaveLength(4);
    });
    it("should let user type in pin input", () => {
      const pinInput = screen.getByTestId("custom pin input");
      fireEvent.changeText(pinInput, "123");
      expect(onChange).toBeCalledWith("123");
    });
    it("should call onSubmit when pin input is complete", () => {
      const pinInput = screen.getByTestId("custom pin input");
      fireEvent(pinInput, "onEndEditing");
      expect(onSubmit).toBeCalled();
    });
  });

  describe("<CustomTextInput />: ", () => {
    it("should render the component correctly", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass />);
      expect(screen.getByTestId("custom text input")).toBeOnTheScreen();
    });
    it("should render text input", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass />);
      expect(screen.getByPlaceholderText("test")).toBeOnTheScreen();
    });
    it("should render password visibility toggle icon", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass />);
      const toggleButton = screen.getByTestId("pass-visibility toggle");
      expect(toggleButton).toBeOnTheScreen();
    });
    it("should allow user to toggle password visibility", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass />);
      const toggleButton = screen.getByTestId("pass-visibility toggle");
      const textInput = screen.getByPlaceholderText("test");
      fireEvent.press(toggleButton);
      expect(textInput.props.secureTextEntry).toBe(false);
    });
    it("should render the phone input if isPhone is true", () => {
      render(<CustomTextInput placeholder="test" label="test" isPhone />);
      expect(screen.getByTestId("phone input")).toBeOnTheScreen();
    });
    it("should allow user to type in text input", () => {
      const onChangeText = jest.fn();
      render(<CustomTextInput onChangeText={onChangeText} placeholder="test" label="test" isPass />);
      const textInput = screen.getByPlaceholderText("test");
      fireEvent.changeText(textInput, "test input");
      expect(onChangeText).toBeCalledWith("test input");
    });
    it("should render error message", () => {
      const error = { type: "test", message: "test error" };
      render(<CustomTextInput error={error} placeholder="test" label="test" isPass />);
      expect(screen.getByText(/test error/i)).toBeOnTheScreen();
    });
    it("should render error message if it's a phone input", () => {
      const error = { type: "test", message: "test error" };
      (useAppSelector as jest.Mock).mockReturnValue("dark");
      render(<CustomTextInput error={error} placeholder="test" label="test" isPhone />);
      expect(screen.getByText(/test error/i)).toBeOnTheScreen();
    });
  });

  describe("<LoginInputs />: ", () => {
    let props = { loginwithsaved: false };
    const setFocus = jest.fn();
    const submit = jest.fn();
    const ControlledInput = () => {
      const { control } = useForm<LoginInfoInterface>();
      return <LoginInputs {...props} control={control} errors={{}} setFocus={setFocus} submit={submit} />;
    };
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      render(<ControlledInput />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("login inputs")).toBeOnTheScreen();
    });
    it("should render the CustomTextInput component", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the email input", () => {
      expect(screen.getByPlaceholderText(/Email Address/i)).toBeOnTheScreen();
    });
    it("should render the password input", () => {
      expect(screen.getByPlaceholderText("Password")).toBeOnTheScreen();
    });
    it("should call setFocus when email input is submitted", () => {
      const input = screen.getByPlaceholderText(/Email Address/i);
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("password");
    });
    it("should call submit when password input is submitted", () => {
      const input = screen.getByPlaceholderText("Password");
      fireEvent(input, "onSubmitEditing");
      expect(submit).toBeCalled();
    });
    describe("When user is a vendor: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(true);
        render(<ControlledInput />);
      });
      it("should render the vendor key input in place of the email input", () => {
        expect(screen.getByPlaceholderText("Vendor Key")).toBeOnTheScreen();
        expect(screen.queryByPlaceholderText(/Email Address/i)).toBeNull();
      });
      it("should call setFocus when vendor key input is submitted", () => {
        const input = screen.getByPlaceholderText("Vendor Key");
        fireEvent(input, "onSubmitEditing");
        expect(setFocus).toBeCalledWith("password");
      });
    });
    describe("When there is saved details: ", () => {
      it("should not render the vendor key or email inputs", () => {
        props.loginwithsaved = true;
        render(<ControlledInput />);
        expect(screen.queryByPlaceholderText("Vendor Key")).toBeNull();
        expect(screen.queryByPlaceholderText(/Email Address/i)).toBeNull();
      });
    });
  });

  describe("<SetPasswordInputs />: ", () => {
    const setFocus = jest.fn();
    const submit = jest.fn();
    const ControlledInput = () => {
      const { control, watch } = useForm<ResetPasswordInterface>({ mode: "onChange" });
      return <SetPasswordInputs control={control} errors={{}} setFocus={setFocus} watch={watch} submit={submit} />;
    };
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(null);
      render(<ControlledInput />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("set password inputs")).toBeOnTheScreen();
    });
    it("should render the CustomTextInput component", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the new password input", () => {
      expect(screen.getByPlaceholderText("New Password")).toBeOnTheScreen();
    });
    it("should call setFocus when new password input is submitted", () => {
      const input = screen.getByPlaceholderText("New Password");
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("confirmPassword");
    });
    it("should render the confirm password input", () => {
      expect(screen.getByPlaceholderText("Confirm Password")).toBeOnTheScreen();
    });
    it("should call submit when confirm password input is submitted", () => {
      const input = screen.getByPlaceholderText("Confirm Password");
      fireEvent(input, "onSubmitEditing");
      expect(submit).toBeCalled();
    });
    it("should validate confirm password input if it matches password input", () => {
      const passwordInput = screen.getByPlaceholderText("New Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      fireEvent.changeText(passwordInput, "pass1&onlY");
      fireEvent.changeText(confirmPasswordInput, "pass1&onl");
      fireEvent(confirmPasswordInput, "onSubmitEditing");
      expect(submit).toBeCalled();
    });
    describe("When user is changing password from the profile screen i.e is signed in", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue({ id: "123" });
        render(<ControlledInput />);
      });
      it("should render the old password input", () => {
        expect(screen.getByPlaceholderText("Old Password")).toBeOnTheScreen();
      });
      it("should call setFocus when old password input is submitted", () => {
        const input = screen.getByPlaceholderText("Old Password");
        fireEvent(input, "onSubmitEditing");
        expect(setFocus).toBeCalledWith("password");
      });
    });
  });

  describe("<SignupInputs />: ", () => {
    const setFocus = jest.fn();
    const submit = jest.fn();
    const ControlledInput = () => {
      const { control } = useForm<SignUpInfoInterface>();
      return <SignupInputs control={control} errors={{}} setFocus={setFocus} submit={submit} />;
    };
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      render(<ControlledInput />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("signup inputs")).toBeOnTheScreen();
    });
    it("should render the CustomTextInput component", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the first name input", () => {
      expect(screen.getByPlaceholderText(/First Name/i)).toBeOnTheScreen();
    });
    it("should set focus on the last name input when the first name input is submitted", () => {
      const input = screen.getByPlaceholderText(/First Name/i);
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("lastName");
    });
    it("should render the last name input", () => {
      expect(screen.getByPlaceholderText(/Last Name/i)).toBeOnTheScreen();
    });
    it("should set focus on the email input when the last name input is submitted", () => {
      const input = screen.getByPlaceholderText(/Last Name/i);
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("email");
    });
    it("should render the email address input", () => {
      expect(screen.getByPlaceholderText(/Email Address/i)).toBeOnTheScreen();
    });
    it("should set focus on the phone input when the email input is submitted", () => {
      const input = screen.getByPlaceholderText(/Email Address/i);
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("phone");
    });
    it("should render the phone input", () => {
      expect(screen.getByPlaceholderText(/Phone Number/i)).toBeOnTheScreen();
    });
    it("should set focus on the password input when the phone input is submitted", () => {
      const input = screen.getByPlaceholderText(/Phone Number/i);
      fireEvent(input, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("password");
    });
    it("should render the password input", () => {
      expect(screen.getByPlaceholderText(/Password/i)).toBeOnTheScreen();
    });
    it("should call submit when password input is submitted", () => {
      const input = screen.getByPlaceholderText(/Password/i);
      fireEvent(input, "onSubmitEditing");
      expect(submit).toBeCalled();
    });
    describe("When user is signing up as a vendor: ", () => {
      beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue(true);
        render(<ControlledInput />);
      });
      it("should not render the first and last name inputs", () => {
        expect(screen.queryByPlaceholderText(/First Name/i)).toBeNull();
        expect(screen.queryByPlaceholderText(/Last Name/i)).toBeNull();
      });
      it("should render the business name input", () => {
        expect(screen.getByPlaceholderText(/Business Name/i)).toBeOnTheScreen();
      });
      it("should set focus on the business address input when the business name input is submitted", () => {
        const input = screen.getByPlaceholderText(/Business Name/i);
        fireEvent(input, "onSubmitEditing");
        expect(setFocus).toBeCalledWith("businessAddress");
      });
      it("should render the business address input", () => {
        expect(screen.getByPlaceholderText(/Business Address/i)).toBeOnTheScreen();
      });
      it("should set focus on the rep name input when the business address input is submitted", () => {
        const input = screen.getByPlaceholderText(/Business Address/i);
        fireEvent(input, "onSubmitEditing");
        expect(setFocus).toBeCalledWith("repName");
      });
      it("should render the rep name input", () => {
        expect(screen.getByPlaceholderText(/Vendor's Name/i)).toBeOnTheScreen();
      });
      it("should set focus on the email input when the rep name input is submitted", () => {
        const input = screen.getByPlaceholderText(/Vendor's Name/i);
        fireEvent(input, "onSubmitEditing");
        expect(setFocus).toBeCalledWith("email");
      });
    });
  });

  describe("<SocialLogin />: ", () => {
    beforeEach(() => {
      render(<SocialLogin page="SU" />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("social login")).toBeOnTheScreen();
    });
    it("should render the decorated 'or'", () => {
      const decoText = screen.getByText("or");
      expect(decoText).toBeOnTheScreen();
    });
    it("should render google icon", () => {
      const icon = screen.getByTestId("googleIcon");
      expect(icon).toBeOnTheScreen();
    });
    it("should render the google signup text", () => {
      const text = screen.getByText("SIGN UP WITH GOOGLE");
      expect(text).toBeOnTheScreen();
    });
    it("should render the google sign in text", () => {
      render(<SocialLogin page="SI" />);
      const text = screen.getByText("SIGN IN WITH GOOGLE");
      expect(text).toBeOnTheScreen();
    });
  });

  describe("<SubmitButton />: ", () => {
    const onSubmit = jest.fn();
    beforeEach(() => {
      render(<SubmitButton label="test" onSubmit={onSubmit} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    it("should render button label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the activity loader when isLoading is true", () => {
      render(<SubmitButton label="test" isLoading onSubmit={onSubmit} />);
      expect(screen.getByTestId("loader")).toBeOnTheScreen();
    });
    it("should call onSubmit when pressed", () => {
      fireEvent.press(screen.getByText("test"));
      expect(onSubmit).toBeCalled();
    });
  });

  describe("<UserVendor />: ", () => {
    it("should render the component", () => {
      render(<UserVendor />);
      expect(screen.getByTestId("user vendor")).toBeOnTheScreen();
    });
    it("should render vendor button", () => {
      render(<UserVendor />);
      expect(screen.getByText("Vendor")).toBeOnTheScreen();
    });
    it("should render user button", () => {
      render(<UserVendor />);
      expect(screen.getByText("User")).toBeOnTheScreen();
    });
    it("Vendor button should dispatch true to vendor status", () => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      const mockDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
      render(<UserVendor />);
      const vendorButton = screen.getByText("Vendor");
      fireEvent.press(vendorButton);
      expect(mockDispatch).toBeCalledWith(setVendorStatus(true));
    });
    it("User button should dispatch false to vendor status", () => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      const mockDispatch = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
      render(<UserVendor />);
      const userButton = screen.getByText("User");
      fireEvent.press(userButton);
      expect(mockDispatch).toBeCalledWith(setVendorStatus(false));
    });
  });
});
