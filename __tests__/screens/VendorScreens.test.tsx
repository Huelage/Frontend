import { useNavigation } from "@react-navigation/native";
import { AddItemScreen, HomeScreen, MenuScreen, NotificationScreen } from "@screens/Vendor";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { showError, showSuccess } from "@utils";
import { launchImageLibraryAsync } from "expo-image-picker";
import { extension, lookup } from "react-native-mime-types";
import uuid from "react-native-uuid";
import { MOCK_ADD_FOOD_ITEM, MOCK_ADD_FOOD_PACKAGE_ITEM, MOCK_UPLOAD_IMAGE } from "../gql.mocks";
import { renderApollo } from "../testhelpers";

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
      const inputFoodData = () => {
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
      };
      const inputFoodPackage = async () => {
        const nameInput = screen.getByPlaceholderText("Food Name *");
        const descriptionInput = screen.getByPlaceholderText("Food Description *");
        const categoryInput = screen.getAllByText("Select option")[0];
        const pricingMethodInput = screen.getAllByText("Select option")[1];
        const preparationTimeInput = screen.getByPlaceholderText("Preparation Time (in minutes)");
        fireEvent.changeText(nameInput, "test name");
        fireEvent.changeText(descriptionInput, "test description");
        fireEvent.press(categoryInput);
        fireEvent.press(screen.getByText("MAIN"));
        fireEvent.press(pricingMethodInput);
        fireEvent.press(screen.getByText("PACKAGE"));
        const button = screen.getAllByTestId("add package size");
        fireEvent.changeText(screen.getAllByPlaceholderText("Enter package size")[0], "big pack");
        fireEvent.changeText(screen.getAllByPlaceholderText("Enter package price")[0], "1000");
        await act(() => fireEvent.press(button[0]));
        fireEvent.changeText(screen.getByPlaceholderText("Enter package size"), "small pack");
        fireEvent.changeText(screen.getByPlaceholderText("Enter package price"), "500");
        await act(() => fireEvent.press(button[1]));
        fireEvent.changeText(preparationTimeInput, 30);
      };

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
      it("should throw an error if an image is not added when creating the food", async () => {
        const submitButton = screen.getByTestId("submit button");
        inputFoodData();
        await act(() => fireEvent.press(submitButton));
        expect(showError).toBeCalledWith("Please upload an image");
      });
      it("should call onSubmit when the form is submitted", async () => {
        (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123" }] })));
        (lookup as jest.Mock).mockReturnValue("");
        (extension as jest.Mock).mockReturnValue("");
        jest.spyOn(uuid, "v4").mockReturnValueOnce("123");
        renderApollo(<AddItemScreen />, [...MOCK_UPLOAD_IMAGE, ...MOCK_ADD_FOOD_ITEM]);
        const submitButton = screen.getByTestId("submit button");
        await act(() => fireEvent.press(screen.getByTestId("add image button")));
        const upload = screen.getByTestId("upload button");
        fireEvent.press(upload);
        await waitFor(() => expect(screen.queryByTestId("upload button")).toBeNull());
        inputFoodData();
        fireEvent.press(submitButton);
        await waitFor(() => expect(showSuccess).toBeCalledWith("Food added to your menu successfully"));
      }, 20000);
      it("should call onSubmit when the form is submitted", async () => {
        (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123" }] })));
        (lookup as jest.Mock).mockReturnValue("");
        (extension as jest.Mock).mockReturnValue("");
        jest.spyOn(uuid, "v4").mockReturnValueOnce("123");
        renderApollo(<AddItemScreen />, [...MOCK_UPLOAD_IMAGE, ...MOCK_ADD_FOOD_PACKAGE_ITEM]);
        const submitButton = screen.getByTestId("submit button");
        await act(() => fireEvent.press(screen.getByTestId("add image button")));
        const upload = screen.getByTestId("upload button");
        fireEvent.press(upload);
        await waitFor(() => expect(screen.queryByTestId("upload button")).toBeNull());
        await inputFoodPackage();
        fireEvent.press(submitButton);
        await waitFor(() => expect(showSuccess).toBeCalledWith("Food added to your menu successfully"));
        await act(() => jest.runAllTimers());
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
