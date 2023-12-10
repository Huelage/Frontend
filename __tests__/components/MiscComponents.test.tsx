import { CustomDropdown, CustomFilterBox, CustomModal, CustomPopupModal, StarRating } from "@components/misc";
import { FilterGroup } from "@interfaces";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";

describe("When Testing Miscellaneous Components: ", () => {
  describe("<CustomDropdown />: ", () => {
    const data = [
      { value: "testValue1", imgUrl: "image", desc: "test description 1" },
      { value: "testValue2", imgUrl: "image" },
      { value: "testValue3", imgUrl: "image", desc: "test description 3" }
    ];
    const onChange = jest.fn();
    beforeEach(() => {
      render(<CustomDropdown data={data} label="Test dropdown" onChange={onChange} />);
    });
    it("should render the component correctly", () => {
      expect(screen.getByTestId("custom dropdown")).toBeOnTheScreen();
    });
    it("should render the label", () => {
      expect(screen.getByText("Test dropdown")).toBeOnTheScreen();
    });
    it("should render the dropdown", () => {
      render(<CustomDropdown data={data} label="Test dropdown" onChange={onChange} isError />);
      expect(screen.getByTestId("dropdown toggle")).toBeOnTheScreen();
    });
    it("should call the onChange function when the dropdown is used", () => {
      fireEvent.press(screen.getByTestId("dropdown toggle"));
      fireEvent.press(screen.getByTestId("dropdown item testValue2"));
      expect(onChange).toBeCalled();
    });
  });

  describe("<CustomFilterBox />: ", () => {
    const onPress = jest.fn();
    const props = {
      filterItems: [
        {
          id: "status", label: "Status", type: "MULTIPLE", items: [
            { id: "1", groupId: "status", name: "Pending", onPress },
            { id: "2", groupId: "status", name: "Completed", onPress }
          ]
        },
        {
          id: "date", label: "Order date", type: "SINGLE", items: [
            { id: "4", groupId: "date", name: "Today", onPress },
            { id: "5", groupId: "date", name: "Yesterday", onPress }
          ]
        }
      ] as FilterGroup[], defaultFilter: "Status"
    };

    beforeEach(() => {
      render(<CustomFilterBox {...props} />);
    });
    // Testing UI
    it("should render the component correctly", () => {
      expect(screen.getByTestId("custom filter box")).toBeOnTheScreen();
    });
    it("should render the toggle filter box button", () => {
      expect(screen.getByTestId("toggle filter box")).toBeOnTheScreen();
    });
    it("should render the CustomPopupModal component", () => {
      expect(screen.getByTestId("custom popup modal")).toBeOnTheScreen();
    });
    it("should render the filter header list", () => {
      expect(screen.getByTestId("filter header list")).toBeOnTheScreen();
    });
    it("should render the filter header items", () => {
      expect(screen.getAllByTestId("filter header item")).toHaveLength(2);
    });
    it("should render the filter items list", () => {
      expect(screen.getByTestId("filter items list")).toBeOnTheScreen();
    });
    it("should render the filter items", () => {
      expect(screen.getAllByTestId("filter item")).toHaveLength(2);
    });
    it("should render an empty list when filter items are not available", () => {
      render(<CustomFilterBox {...props} filterItems={[]} />);
      expect(screen.queryAllByTestId("filter item")).toHaveLength(0);
    });
    // Testing Functionality
    it("should open the filter box when the toggle filter box button is pressed", () => {
      const filterBox = screen.getByTestId("custom popup modal");
      const toggleFilterBox = screen.getByTestId("toggle filter box");
      expect(filterBox.props.isVisible).toBeFalsy();
      fireEvent.press(toggleFilterBox);
      expect(filterBox.props.isVisible).toBeTruthy();
    });
    it("should select a new group when one of the header items is pressed", async () => {
      const filterHeaderItem = screen.getAllByTestId("filter header item")[1];
      expect(screen.queryByText("Yesterday")).toBeNull();
      fireEvent.press(filterHeaderItem);
      await waitFor(() => expect(screen.getByText("Yesterday")).toBeOnTheScreen());
    });
    it("should select a new filter item when one of the filter items is pressed", async () => {
      const filterItem = screen.getAllByTestId("filter item")[1];
      expect(screen.queryByText("Completed checkmark")).toBeNull();
      fireEvent.press(filterItem);
      await waitFor(() => expect(screen.getByTestId("Completed checkmark")).toBeOnTheScreen());
      expect(onPress).toBeCalledWith(true);
    });
    it("should replace all items from a group and select the new filter if the group type is SINGLE", async () => {
      const filterHeaderItem = screen.getAllByTestId("filter header item")[1];
      fireEvent.press(filterHeaderItem);
      expect(screen.queryByText("Yesterday checkmark")).toBeNull();
      fireEvent.press(screen.getAllByTestId("filter item")[1]);
      await waitFor(() => expect(screen.getByTestId("Yesterday checkmark")).toBeOnTheScreen());
      fireEvent.press(screen.getAllByTestId("filter item")[0]);
      await waitFor(() => expect(screen.getByTestId("Today checkmark")).toBeOnTheScreen());
      expect(onPress).toBeCalledWith(true);
    });
    it("should unselect a filter item when it is pressed again", async () => {
      const filterItem = screen.getAllByTestId("filter item")[1];
      expect(screen.queryByText("Completed checkmark")).toBeNull();
      fireEvent.press(filterItem);
      await waitFor(() => expect(screen.getByTestId("Completed checkmark")).toBeOnTheScreen());
      fireEvent.press(filterItem);
      await waitFor(() => expect(screen.queryByText("Completed checkmark")).toBeNull());
      expect(onPress).toBeCalledWith(false);
    });
  });

  describe("<CustomModal />: ", () => {
    beforeEach(() => {
      render(
        <CustomModal isVisible={true}>
          <Text>test modal content</Text>
        </CustomModal>
      );
    });
    it("should render correctly", () => {
      expect(screen.getByTestId("custom modal")).toBeOnTheScreen();
    });
    it("should render the children correctly", () => {
      expect(screen.getByText("test modal content")).toBeOnTheScreen();
    });
  });

  describe("<CustomPopupModal />: ", () => {
    const handleModal = jest.fn();
    beforeEach(() => {
      render(
        <CustomPopupModal showModal={true} setShowModal={handleModal}>
          <Text>test modal content</Text>
        </CustomPopupModal>
      );
    });
    it("should render correctly", () => {
      expect(screen.getByTestId("custom popup modal")).toBeOnTheScreen();
    });
    it("should render the children correctly", () => {
      expect(screen.getByText("test modal content")).toBeOnTheScreen();
    });
    it("should close the modal when the modal closer bar is pressed", () => {
      const modalCloser = screen.getByTestId("modal closer");
      fireEvent.press(modalCloser);
      expect(handleModal).toBeCalledWith(false);
    });
  });

  describe("<StarRating />: ", () => {
    it("should render correctly", () => {
      render(<StarRating rating={3} />);
      expect(screen.getByTestId("star rating")).toBeOnTheScreen();
    });
    it("should render the correct number of full stars", () => {
      render(<StarRating rating={3} />);
      expect(screen.getAllByTestId("ios-star")).toHaveLength(3);
    });
    it("should render the correct number of half stars", () => {
      render(<StarRating rating={3.5} />);
      expect(screen.getAllByTestId("ios-star-half")).toHaveLength(1);
    });
    it("should render the correct number of empty stars", () => {
      render(<StarRating rating={3.5} />);
      expect(screen.getAllByTestId("ios-star-outline")).toHaveLength(1);
    });
  });
});
