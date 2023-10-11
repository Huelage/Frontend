import { CustomModal, StarRating } from "@components/misc";
import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

describe("When Testing Miscellaneous Components: ", () => {
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

  describe("<StarRating />: ", () => {
    it("should render correctly", () => {
      render(<StarRating rating={3} />);
      expect(screen.toJSON()).toMatchSnapshot();
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