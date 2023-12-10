import { useAppSelector } from "@api/app/appHooks";
import { mockCartItems, mockFoods, mockOrderItems } from "@api/mock";
import { OrderChartElement, ReviewElement, StatElement, SummaryElement } from "@components/vendor/Home";
import { AddMenuInputs, MenuItem, PackageSizeElement, PackageSizeInput, SideElement, SideInput, SideOptionElement } from "@components/vendor/Menu";
import { OrderElement, OrderItemElement } from "@components/vendor/Orders";
import { AddFoodInterface } from "@interfaces";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { showError } from "@utils";
import { useForm } from "react-hook-form";
import { act } from "react-test-renderer";

describe("When Testing Vendor Flow Home Components: ", () => {
  describe("<OrderChartElement />: ", () => {
    const chartProps = { value: 100, iconColor: "red", label: "test", total: 1000, idx: 1 };
    beforeEach(() => {
      render(<OrderChartElement {...chartProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("order chart element")).toBeOnTheScreen();
    });
    it("should render the chart bar", () => {
      expect(screen.getByTestId("chart bar")).toBeOnTheScreen();
    });
    it("should render the bar progress view", () => {
      expect(screen.getByTestId("bar progress")).toBeOnTheScreen();
    });
    it("should render the bar label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the bar progress percentage", () => {
      const testPercentage = `${Math.floor((chartProps.value / chartProps.total) * 100)}%`;
      expect(screen.getByText(testPercentage)).toBeOnTheScreen();
    });
  });

  describe("<ReviewElement />: ", () => {
    const reviewProps = { id: "1", name: "test", avatar: "test image", date: "15/02/23", rating: 5, message: "test comment" };
    beforeEach(() => {
      render(<ReviewElement {...reviewProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("review element")).toBeOnTheScreen();
    });
    it("should render the reviewer name", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render background avatar incase an image is not provided", () => {
      expect(screen.getByTestId("backup avatar")).toBeOnTheScreen();
    });
    it("should render the reviewer avatar", () => {
      expect(screen.getByTestId("reviewer image")).toBeOnTheScreen();
    });
    it("should render the review date", () => {
      expect(screen.getByText("15/02/23")).toBeOnTheScreen();
    });
    it("should render the review ratings using the StarRating component", () => {
      expect(screen.getAllByTestId("ios-star")).toHaveLength(5);
    });
    it("should render the reviewer comment", () => {
      expect(screen.getByText("test comment")).toBeOnTheScreen();
    });
  });

  describe("<StatElement />: ", () => {
    const statProps = { title: "test", value: 100, Icon: ({ size }: { size: number; }) => <></> };
    beforeEach(() => {
      render(<StatElement {...statProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("stat element")).toBeOnTheScreen();
    });
    it("should render the stat title", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the stat value", () => {
      expect(screen.getByText("100")).toBeOnTheScreen();
    });
  });

  describe("<SummaryElement />: ", () => {
    const overviewProps = { label: "test", value: 100, iconColor: "red" };
    beforeEach(() => {
      render(<SummaryElement {...overviewProps} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("summary element")).toBeOnTheScreen();
    });
    it("should render the overview label", () => {
      expect(screen.getByText("test")).toBeOnTheScreen();
    });
    it("should render the overview value", () => {
      expect(screen.getByText("100")).toBeOnTheScreen();
    });
    it("should render the right color for the overview status icon", () => {
      expect(screen.getByTestId("status icon")).toHaveStyle({ backgroundColor: "red" });
    });
  });
});


describe("When Testing Vendor Flow Menu Components: ", () => {
  describe("<AddMenuInput />: ", () => {
    const setFocus = jest.fn();
    const submit = jest.fn();
    const ControlledInput = () => {
      const { control, watch } = useForm<AddFoodInterface>();
      return <AddMenuInputs control={control} errors={{}} isSubmitted={false} setFocus={setFocus} watch={watch} submit={submit} />;
    };
    const useDropDown = (value: string) => {
      fireEvent.press(screen.getAllByTestId("dropdown toggle")[1]);
      fireEvent.press(screen.getByTestId(`dropdown item ${value}`));
    };
    beforeEach(() => {
      render(<ControlledInput />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("add menu inputs")).toBeOnTheScreen();
    });
    it("should render the text inputs", () => {
      expect(screen.getAllByTestId("custom text input")).not.toBeNull();
    });
    it("should render the price field when pricingMethod is selected", () => {
      useDropDown("PORTION");
      expect(screen.getByPlaceholderText("Price per portion *")).toBeOnTheScreen();
    });
    it("should render the PackageSizeInput component if package is selected as the pricingMethod", () => {
      useDropDown("PACKAGE");
      expect(screen.getByTestId("package size input")).toBeOnTheScreen();
    });
    it("should render the Price input field if Price is selected as the pricingMethod", () => {
      useDropDown("PRICE");
      expect(screen.getByPlaceholderText("Minimum Price *")).toBeOnTheScreen();
    });
    it("should render the Fixed price input field if FIXED is selected as the pricingMethod", () => {
      useDropDown("FIXED");
      expect(screen.getByPlaceholderText("Price *")).toBeOnTheScreen();
    });
    it("should render the Sideinput component", () => {
      expect(screen.getByTestId("side input")).toBeOnTheScreen();
    });
    it("should render the submit button to create the food item", () => {
      expect(screen.getByTestId("submit button")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should set focus to the description when the name input is submitted", () => {
      const name = screen.getByPlaceholderText("Food Name *");
      fireEvent(name, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("description");
    });
    it("should set focus to the preparationTime input when price inputis submitted", () => {
      useDropDown("PRICE");
      const priceInput = screen.getByPlaceholderText("Minimum Price *");
      fireEvent.changeText(priceInput, "1000");
      fireEvent(priceInput, "onSubmitEditing");
      expect(setFocus).toBeCalledWith("preparationTime");
    });
    it("should call the submit function when the submit button is pressed", async () => {
      fireEvent.press(screen.getByTestId("submit button"));
      expect(submit).toBeCalled();
      await act(() => jest.runAllTimers());
    });
  });

  describe("<MenuItem />: ", () => {
    const item = mockFoods[0];
    beforeEach(() => {
      render(<MenuItem item={item} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("menu item")).toBeOnTheScreen();
    });
    it("should render the item image", () => {
      expect(screen.getByTestId("menu item image")).toBeOnTheScreen();
    });
    it("should render the menu item info", () => {
      expect(screen.getByTestId("menu item info")).toBeOnTheScreen();
    });
    it("should render the menu item action box", () => {
      expect(screen.getByTestId("menu item action")).toBeOnTheScreen();
    });
  });

  describe("<PackageSizeElement />: ", () => {
    const onAdd = jest.fn(), onRemove = jest.fn();
    const props = { onAdd, onRemove };
    const valuedProp = { onAdd, onRemove, value: { name: "test", price: 1000 } };
    beforeEach(() => {
      render(<PackageSizeElement {...props} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("package size element")).toBeOnTheScreen();
    });
    it("should render the textinputs if value is not provided", () => {
      expect(screen.getByPlaceholderText("Enter package size")).toBeOnTheScreen();
      expect(screen.getByPlaceholderText("Enter package price")).toBeOnTheScreen();
    });
    it("should render the package size info if the value is provided", () => {
      render(<PackageSizeElement {...valuedProp} />);
      expect(screen.getAllByTestId("package size info")).toHaveLength(2);
    });
    it("should render the add package size button", () => {
      expect(screen.getByTestId("add package size")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should allow typing into the inputs and submitting", async () => {
      const size = screen.getByPlaceholderText("Enter package size");
      const price = screen.getByPlaceholderText("Enter package price");
      fireEvent.changeText(size, "big pack");
      fireEvent(size, "onSubmitEditing");
      fireEvent.changeText(price, "1000");
      fireEvent(price, "onSubmitEditing");
      await waitFor(() => {
        expect(onAdd).toBeCalledWith({ name: "big pack", price: 1000 });
      });
    });
    it("should call the onRemove when the add package size button is pressed and value is provided", () => {
      render(<PackageSizeElement {...valuedProp} />);
      const button = screen.getByTestId("add package size");
      fireEvent.press(button);
      expect(onRemove).toBeCalledWith(valuedProp.value);
    });
    it("should call the onAdd when the add package size button is pressed and value is not provided", async () => {
      const size = screen.getByPlaceholderText("Enter package size");
      const price = screen.getByPlaceholderText("Enter package price");
      const button = screen.getByTestId("add package size");
      fireEvent.changeText(size, "big pack");
      fireEvent.changeText(price, "1000");
      fireEvent.press(button);
      await waitFor(() => {
        expect(onAdd).toBeCalledWith({ name: "big pack", price: 1000 });
      });
    });
  });

  describe("<PackageSizeInput />: ", () => {
    const sizes = [{ name: "test", price: 1000 }], onChange = jest.fn();
    const props = { sizes, onChange };
    beforeEach(() => {
      render(<PackageSizeInput {...props} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("package size input")).toBeOnTheScreen();
    });
    it("should render the package size element list items with the PackageSizeElement component", () => {
      expect(screen.getByTestId("package size element list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("package size element")).not.toBeNull();
    });
    it("should render the add size input button", () => {
      expect(screen.getByTestId("add size input")).toBeOnTheScreen();
    });
    // Testing Functinality
    it("should call show error with an error message for invalid input", async () => {
      const size = screen.getByPlaceholderText("Enter package size");
      const price = screen.getByPlaceholderText("Enter package price");
      const button = screen.getAllByTestId("add package size")[1];
      fireEvent.changeText(price, "1000");
      await act(() => fireEvent.press(button));
      expect(showError).toBeCalledWith("Package name is required");
      fireEvent.changeText(size, "te");
      await act(() => fireEvent.press(button));
      expect(showError).toBeCalledWith("Package name should be a minimum of 3 characters");
      fireEvent.changeText(size, "test");
      await act(() => fireEvent.press(button));
      expect(showError).toBeCalledWith("Package name already exists");
      fireEvent.changeText(size, "big pack");
      await act(() => fireEvent.press(button));
      expect(showError).toBeCalledWith("Package price is required");
    });
    it("should call the onAdd function when a valid input is submitted", async () => {
      const size = screen.getByPlaceholderText("Enter package size");
      const price = screen.getByPlaceholderText("Enter package price");
      const button = screen.getAllByTestId("add package size")[1];
      fireEvent.changeText(size, "big pack");
      fireEvent.changeText(price, "1000");
      await act(() => fireEvent.press(button));
      expect(onChange).toBeCalledWith([...sizes, { name: "big pack", price: 1000 }]);
    });
    it("should call the onRemove function when the remove button is pressed", () => {
      const newSize = [...sizes, { name: "test2", price: 1500 }, { name: "test3", price: 2000 }];
      render(<PackageSizeInput {...props} sizes={newSize} />);
      const button = screen.getAllByTestId("add package size")[0];
      fireEvent.press(button);
      fireEvent.press(button);
      expect(onChange).toBeCalledWith([{ name: "test2", price: 1500 }, { name: "test3", price: 2000 }]);
    });
    it("should add an extra input to the list when the add size input button is pressed", () => {
      const newSize = [...sizes, { name: "test2", price: 1500 }];
      render(<PackageSizeInput {...props} sizes={newSize} />);
      const button = screen.getByTestId("add size input");
      fireEvent.press(button);
      expect(screen.getAllByTestId("package size element")).toHaveLength(3);
    });
  });

  describe("<SideElement />: ", () => {
    const onAdd = jest.fn(), onRemove = jest.fn();
    const options = [{ name: "test", price: 1000, isSingle: false, groupId: "1" }];
    const side = { id: "1", description: "test", isRequired: true, isMultiple: false, options };
    beforeEach(() => {
      render(<SideElement side={side} onAdd={onAdd} onRemove={onRemove} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("side element")).toBeOnTheScreen();
    });
    it("should render the side description box", () => {
      expect(screen.getByTestId("side description")).toBeOnTheScreen();
    });
    it("should render the side description textinput", () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      expect(screen.getByPlaceholderText("Enter side description")).toBeOnTheScreen();
    });
    it("should render the side option element list via the SideOptionElement component", () => {
      const option2 = [...options, { name: "test2", price: 2000, isSingle: false, groupId: "1" }, { name: "test3", price: 3000, isSingle: false, groupId: "1" }];
      render(<SideElement side={{ ...side, options: option2 }} onAdd={onAdd} onRemove={onRemove} />);
      expect(screen.getByTestId("side option element list")).toBeOnTheScreen();
      expect(screen.getAllByTestId("side option element")).not.toBeNull();
    });
    it("should render the add side option input button if side is not provided", () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      expect(screen.getByTestId("add side input")).toBeOnTheScreen();
    });
    it("should render the checkboxes", () => {
      expect(screen.getAllByTestId(/checkbox/)).toHaveLength(2);
    });
    it("should render the add side button", () => {
      expect(screen.getByTestId("add side button")).toBeOnTheScreen();
    });
    // Testing Functinality
    it("should call show error with an error message for invalid option input", async () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      const names = screen.getAllByPlaceholderText("Enter option name");
      const prices = screen.getAllByPlaceholderText("Enter option price");
      const buttons = screen.getAllByTestId("add side option");
      // Should not allow empty inputs
      await act(() => fireEvent.press(buttons[0]));
      expect(showError).toBeCalledWith("Option name is required");
      // Should not allow inputs less than 3 characters
      fireEvent.changeText(names[0], "te");
      await act(() => fireEvent.press(buttons[0]));
      expect(showError).toBeCalledWith("Option name should be a minimum of 3 characters");
      // Should not allow empty price inputs
      fireEvent.changeText(names[0], "big pack");
      await act(() => fireEvent.press(buttons[0]));
      expect(showError).toBeCalledWith("Option price is required");
      // Should not allow duplicate option names
      fireEvent.changeText(names[0], "test");
      fireEvent.changeText(prices[0], "1000");
      await act(() => fireEvent.press(buttons[0]));
      fireEvent.changeText(names[1], "test");
      await act(() => fireEvent.press(buttons[1]));
      expect(showError).toBeCalledWith("Option name already exists");
    });
    it("should allow removing an option and adding more option inputs without errors", async () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      // Add 2 options
      fireEvent.changeText(screen.getAllByPlaceholderText("Enter option name")[0], "test");
      fireEvent.changeText(screen.getAllByPlaceholderText("Enter option price")[0], "1000");
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[0]));
      fireEvent.changeText(screen.getByPlaceholderText("Enter option name"), "test2");
      fireEvent.changeText(screen.getByPlaceholderText("Enter option price"), "2000");
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[1]));
      // Remove an option
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[1]));
      // Add another option
      fireEvent.changeText(screen.getByPlaceholderText("Enter option name"), "test2");
      fireEvent.changeText(screen.getByPlaceholderText("Enter option price"), "2000");
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[1]));
      // Add an extra option input
      await act(() => fireEvent.press(screen.getByTestId("add side input")));
      // Add the 3rd option
      fireEvent.changeText(screen.getByPlaceholderText("Enter option name"), "test3");
      fireEvent.changeText(screen.getByPlaceholderText("Enter option price"), "3000");
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[2]));
      // Remove the 3rd option
      await act(() => fireEvent.press(screen.getAllByTestId("add side option")[2]));
      expect(screen.getAllByTestId("side option element")).toHaveLength(2);
    });
    it("should call the show error for invalid side input", async () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      const addSide = screen.getByTestId("add side button");
      await act(() => fireEvent.press(addSide));
      expect(showError).toBeCalledWith("Side description is required");
      fireEvent.changeText(screen.getByPlaceholderText("Enter side description"), "te");
      await act(() => fireEvent.press(addSide));
      expect(showError).toBeCalledWith("Side description should be a minimum of 3 characters");
      fireEvent.changeText(screen.getByPlaceholderText("Enter side description"), "test");
      await act(() => fireEvent.press(addSide));
      expect(showError).toBeCalledWith("Side should have at least 2 options");
    });
    it("should call the onAdd function when a valid input is submitted", async () => {
      render(<SideElement onAdd={onAdd} onRemove={onRemove} />);
      const addSide = screen.getByTestId("add side button");
      const description = screen.getByPlaceholderText("Enter side description");
      const names = screen.getAllByPlaceholderText("Enter option name");
      const prices = screen.getAllByPlaceholderText("Enter option price");
      const addOptions = screen.getAllByTestId("add side option");
      const checkboxes = screen.getAllByTestId(/checkbox/);
      fireEvent.changeText(description, "test description");
      fireEvent.changeText(names[0], "test");
      fireEvent.changeText(prices[0], "1000");
      await act(() => fireEvent.press(addOptions[0]));
      fireEvent.changeText(names[1], "test2");
      fireEvent.changeText(prices[1], "2000");
      await act(() => fireEvent.press(addOptions[1]));
      checkboxes.forEach(checkbox => fireEvent.press(checkbox));
      await act(() => fireEvent.press(addSide));
      expect(onAdd).toBeCalledWith({
        id: expect.any(String), description: "test description", isRequired: true, isMultiple: true,
        options: [{ name: "test", price: 1000, isSingle: false, groupId: expect.any(String) }, { name: "test2", price: 2000, isSingle: false, groupId: expect.any(String) }]
      });
    });
    it("should call the onRemove function when the remove button is pressed", () => {
      const removeSide = screen.getByTestId("add side button");
      fireEvent.press(removeSide);
      expect(onRemove).toBeCalledWith(side.id);
    });
  });

  describe("<SideInput />: ", () => {
    const onChange = jest.fn(), props = { isSubmitted: true, onChange };
    beforeEach(() => {
      render(<SideInput {...props} sides={[]} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("side input")).toBeOnTheScreen();
    });
    it("should render the side element list and it should be empty initially", () => {
      expect(screen.getByTestId("side element list")).toBeOnTheScreen();
      expect(screen.queryByTestId("side element")).toBeNull();
    });
    it("should render the add side input button", () => {
      expect(screen.getByTestId("add side input")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should add a new side input when the add side input button is pressed", () => {
      const button = screen.getByTestId("add side input");
      fireEvent.press(button);
      expect(screen.getByTestId("side element")).toBeOnTheScreen();
    });
    it("should call the onChange function when a side is added", async () => {
      const addSideInput = screen.getByTestId("add side input");
      fireEvent.press(addSideInput);
      const addSide = screen.getByTestId("add side button");
      const description = screen.getByPlaceholderText("Enter side description");
      const names = screen.getAllByPlaceholderText("Enter option name");
      const prices = screen.getAllByPlaceholderText("Enter option price");
      const addOptions = screen.getAllByTestId("add side option");
      const checkboxes = screen.getAllByTestId(/checkbox/);
      fireEvent.changeText(description, "test description");
      fireEvent.changeText(names[0], "test");
      fireEvent.changeText(prices[0], "1000");
      await act(() => fireEvent.press(addOptions[0]));
      fireEvent.changeText(names[1], "test2");
      fireEvent.changeText(prices[1], "2000");
      await act(() => fireEvent.press(addOptions[1]));
      checkboxes.forEach(checkbox => fireEvent.press(checkbox));
      await act(() => fireEvent.press(addSide));
      expect(onChange).toBeCalledWith([{
        id: expect.any(String), description: "test description", isRequired: true, isMultiple: true,
        options: [{ name: "test", price: 1000, isSingle: false, groupId: expect.any(String) }, { name: "test2", price: 2000, isSingle: false, groupId: expect.any(String) }]
      }]);
    });
    it("should call the onChange function when a side is removed", () => {
      const side = { id: "1", description: "test", isRequired: true, isMultiple: false, options: [{ name: "test", price: 1000, isSingle: true, groupId: "1" }, { name: "test2", price: 1500, isSingle: false, groupId: "1" }] };
      render(<SideInput isSubmitted={false} onChange={onChange} sides={[side]} />);
      const removeSide = screen.getByTestId("add side button");
      fireEvent.press(removeSide);
      expect(onChange).toBeCalledWith([]);
    });
  });

  describe("<SideOptionElement />: ", () => {
    const onAdd = jest.fn(), onRemove = jest.fn();
    const props = { onAdd, onRemove };
    const valuedProp = { onAdd, onRemove, option: { groupId: "1", name: "test", price: 1000, isSingle: true }, isSide: true };
    const valueSideProp = { onAdd, onRemove, option: { groupId: "1", name: "test", price: 1000, isSingle: true }, isSide: false };
    beforeEach(() => {
      render(<SideOptionElement {...props} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("side option element")).toBeOnTheScreen();
    });
    it("should render the textinputs if option is not provided", () => {
      expect(screen.getByPlaceholderText("Enter option name")).toBeOnTheScreen();
      expect(screen.getByPlaceholderText("Enter option price")).toBeOnTheScreen();
    });
    it("should render the side option info if the value is provided", () => {
      render(<SideOptionElement {...valuedProp} />);
      expect(screen.getAllByTestId("side option info")).toHaveLength(2);
    });
    it("should render the add side option button if isSide is false", () => {
      expect(screen.getByTestId("add side option")).toBeOnTheScreen();
    });
    it("should render the isSingle checkbox", () => {
      expect(screen.getByTestId("limit to one")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should allow typing into the inputs and submitting", async () => {
      const size = screen.getByPlaceholderText("Enter option name");
      const price = screen.getByPlaceholderText("Enter option price");
      const checkbox = screen.getByTestId("limit to one");
      const button = screen.getByTestId("add side option");
      fireEvent.changeText(size, "big pack");
      fireEvent(size, "onSubmitEditing");
      fireEvent.changeText(price, "1000");
      fireEvent(price, "onSubmitEditing");
      fireEvent.press(checkbox);
      fireEvent.press(button);
      await waitFor(() => {
        expect(onAdd).toBeCalledWith({ name: "big pack", price: 1000, isSingle: true, groupId: "" });
      });
    });
    it("should call the onRemove when the add side option button is pressed and option is provided", () => {
      render(<SideOptionElement {...valueSideProp} />);
      const button = screen.getByTestId("add side option");
      fireEvent.press(button);
      expect(onRemove).toBeCalledWith(valueSideProp.option);
    });
  });
});


describe("When Testing Vendor Flow Order Components: ", () => {
  describe("<OrderElement />: ", () => {
    beforeEach(() => {
      render(<OrderElement order={mockOrderItems[0]} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("order element")).toBeOnTheScreen();
    });
    it("should render the header box", () => {
      expect(screen.getByTestId("header box")).toBeOnTheScreen();
    });
    it("should render the order item names as a summary", () => {
      expect(screen.getByTestId("order items")).toBeOnTheScreen();
    });
    // Testing Functionality
    it("should update the height of the custom box when the order Element is rendered", () => {
      const element = screen.getByTestId("order element");
      fireEvent(element, "onLayout", { nativeEvent: { layout: { height: 100 } } });
    });
  });

  describe("<OrderItemElement />: ", () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
      render(<OrderItemElement {...mockCartItems[0]} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("order item element")).toBeOnTheScreen();
    });
    it("should render the header box", () => {
      expect(screen.getByTestId("header box")).toBeOnTheScreen();
    });
    it("should render the table if isGrid is true", () => {
      expect(screen.getByTestId("extra items table")).toBeOnTheScreen();
    });
    it("should render the list if isGrid is false", () => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      render(<OrderItemElement {...mockCartItems[0]} />);
      expect(screen.getByTestId("extra items list")).toBeOnTheScreen();
    });
    it("should only render the extra list or table if the order item contain extras", () => {
      render(<OrderItemElement {...mockCartItems[3]} />);
      expect(screen.queryByText("Extras: ")).toBeNull();
    });
    // Testing Functionality
    it("should update the height of the custom box when the order Element is rendered", () => {
      const element = screen.getByTestId("order item element");
      fireEvent(element, "onLayout", { nativeEvent: { layout: { height: 100 } } });
    });
  });
});