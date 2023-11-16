import { useNavigation } from "@react-navigation/native";
import { AddItemScreen, HomeScreen, MenuScreen, NotificationScreen } from "@screens/Vendor";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { renderApollo } from "__tests__/testhelpers";

describe("When Testing Vendor Screens: ", () => {
  describe("<HomeScreen />: ", () => {
    beforeEach(() => {
      render(<HomeScreen />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("vendor home screen")).toBeOnTheScreen();
    });
    it("should render the OrderOverview component", () => {
      expect(screen.getByTestId("order overview")).toBeOnTheScreen();
    });
    it("should render the OrderSummary component", () => {
      expect(screen.getByTestId("order summary")).toBeOnTheScreen();
    });
    it("should render the ReviewList component", () => {
      expect(screen.getByTestId("review list")).toBeOnTheScreen();
    });
  });


  describe("Menu Screens: ", () => {
    describe("<AddItemScreen />: ", () => {
      beforeEach(() => {
        renderApollo(<AddItemScreen />, []);
      });
      // Testing UI
      it("should render the component correctly", () => {
        expect(screen.getByTestId("add item screen")).toBeOnTheScreen();
      });
      it("should render the header box", () => {
        expect(screen.getByTestId("header box")).toBeOnTheScreen();
      });
      it("should render the ImageUploader component", () => {
        expect(screen.getByTestId("image uploader")).toBeOnTheScreen();
      });
      it("should render the AddMenuInputs component", () => {
        expect(screen.getByTestId("add menu inputs")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should call onSubmit when the form is submitted", async () => {
        const logSpy = jest.spyOn(console, "log");
        renderApollo(<AddItemScreen />, []);
        const submitButton = screen.getByTestId("submit button");
        const nameInput = screen.getByPlaceholderText("Food Name *");
        const descriptionInput = screen.getByPlaceholderText("Food Description *");
        const categoryInput = screen.getAllByText("Select option")[0];
        const pricingMethodInput = screen.getAllByText("Select option")[1];
        fireEvent.changeText(nameInput, "test name");
        fireEvent.changeText(descriptionInput, "test description");
        fireEvent.press(categoryInput);
        fireEvent.press(screen.getByText("MAIN"));
        fireEvent.press(pricingMethodInput);
        fireEvent.press(screen.getByText("FIXED"));
        const priceInput = screen.getByPlaceholderText("Price *");
        fireEvent.changeText(priceInput, "1000");
        await act(() => fireEvent.press(submitButton));
        expect(logSpy).toBeCalledWith({
          name: "test name", description: "test description", category: "MAIN", pricingMethod: "FIXED", price: "1000"
        });
      });
    });

    describe("<MenuScreen />: ", () => {
      const navigate = jest.fn();
      beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue({ navigate });
        render(<MenuScreen />);
      });
      // Testing UI
      it("should render the screen correctly", () => {
        expect(screen.getByTestId("menu screen")).toBeOnTheScreen();
      });
      it("should render the order empty image if there is no menu item", () => {
        render(<MenuScreen testEmpty />);
        expect(screen.getByTestId("order empty image")).toBeOnTheScreen();
      });
      it("should render the categories text", () => {
        expect(screen.getByText("Categories")).toBeOnTheScreen();
      });
      it("should render the category list", () => {
        expect(screen.getByTestId("category list")).toBeOnTheScreen();
      });
      it("should render the category list items with the CustomButton component", () => {
        expect(screen.getAllByTestId("custom button")).not.toBeNull();
      });
      it("should render the menu item list and its items with the MenuItem component", () => {
        expect(screen.getByTestId("menu item list")).toBeOnTheScreen();
        expect(screen.getAllByTestId("menu item")).not.toBeNull();
      });
      it("should render the add item button", () => {
        expect(screen.getByTestId("add item button")).toBeOnTheScreen();
      });
      // Testing Functionality
      it("should change the category when the user clicks on a category button", () => {
        const categoryButton = screen.getAllByTestId("custom button")[1];
        fireEvent.press(categoryButton);
        expect(categoryButton.props.inactive).toBeFalsy();
      });
      it("should navigate to the AddItem screen with the add item button is pressed", () => {
        fireEvent.press(screen.getByTestId("add item button"));
        expect(navigate).toBeCalledWith("AddItem");
      });
    });
  });


  describe("<NotificationScreen />: ", () => {
    it("should render the component correctly", () => {
      render(<NotificationScreen />);
      expect(screen.getByTestId("notification screen")).toBeOnTheScreen();
    });
  });
});
