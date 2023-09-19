import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { setVendorStatus } from "@api/slices/globalSlice";
import { AuthNavigate, CustomPinInput, CustomTextInput, Hero, SocialLogin, SubmitButton, UserVendor } from "@components/auth";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { renderNavigator } from "../testhelpers";

describe("When Testing Authentication Components: ", () => {
  describe("<AuthNavigate />: ", () => {
    beforeEach(() => {
      renderNavigator(<AuthNavigate page="SU" />);
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
  });

  describe("<CustomPinInput />: ", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    beforeEach(() => {
      render(<CustomPinInput value="" onChange={onChange} onSubmit={onSubmit} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("custom pin input")).toBeOnTheScreen();
    });
    it("should render the 4 pin inputs", () => {
      expect(screen.getAllByTestId("pin input")).toHaveLength(4);
    });
    it("should let user type in pin input", () => {
      const pinInput = screen.getByTestId("custom pin input");
      fireEvent.changeText(pinInput, "123");
      expect(onChange).toBeCalledWith("123");
    });
    it("should call onSubmit when pin input is complete", () => {
      const pinInput = screen.getByTestId("custom pin input");
      fireEvent.changeText(pinInput, "1234");
      fireEvent(pinInput, "onEndEditing");
      expect(onSubmit).toBeCalled();
    });
  });

  describe("<Hero />", () => {
    it("Hero should render correctly", () => {
      render(<Hero page="SU" lead="Baby" accent="coming in" />);
      expect(screen.getByText("Baby")).toBeOnTheScreen();
    });
  });

  describe("<CustomTextInput />: ", () => {
    it("should render the component correctly", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass={true} />);
      expect(screen.getByTestId("custom text input")).toBeOnTheScreen();
    });
    it("should render text input", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass={true} />);
      expect(screen.getByPlaceholderText("test")).toBeOnTheScreen();
    });
    it("should render password visibility toggle icon", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass={true} />);
      const toggleButton = screen.getByTestId("pass-visibility toggle");
      expect(toggleButton).toBeOnTheScreen();
    });
    it("should allow user to toggle password visibility", () => {
      render(<CustomTextInput placeholder="test" label="test" isPass={true} />);
      const toggleButton = screen.getByTestId("pass-visibility toggle");
      const textInput = screen.getByPlaceholderText("test");
      fireEvent.press(toggleButton);
      expect(textInput.props.secureTextEntry).toBe(false);
    });
    it("should render the phone input if isPhone is true", () => {
      render(<CustomTextInput placeholder="test" label="test" isPhone={true} />);
      expect(screen.getByTestId("phone input")).toBeOnTheScreen();
    });
    it("should allow user to type in text input", () => {
      const onChangeText = jest.fn();
      render(<CustomTextInput onChangeText={onChangeText} placeholder="test" label="test" isPass={true} />);
      const textInput = screen.getByPlaceholderText("test");
      fireEvent.changeText(textInput, "test input");
      expect(onChangeText).toBeCalledWith("test input");
    });
    it("should render error message", () => {
      const error = { type: "test", message: "test error" };
      render(<CustomTextInput error={error} placeholder="test" label="test" isPass={true} />);
      expect(screen.getByText(/test error/i)).toBeOnTheScreen();
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
    it("should render the google text", () => {
      const text = screen.getByText("SIGN UP WITH GOOGLE");
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