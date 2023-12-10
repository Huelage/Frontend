import { ImageUploader } from "@containers/Misc";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { showError } from "@utils";
import { MOCK_UPLOAD_IMAGE } from "__tests__/gql.mocks";
import { launchImageLibraryAsync } from "expo-image-picker";
import { extension, lookup } from "react-native-mime-types";
import uuid from "react-native-uuid";
import { act } from "react-test-renderer";
import { renderApollo } from "../testhelpers";

describe("When Testing Miscellanous Containers: ", () => {
  describe("<ImageUploader />: ", () => {
    const onUpload = jest.fn();
    beforeEach(() => {
      renderApollo(<ImageUploader onUpload={onUpload} />, []);
    });
    // Testing UI
    it("should render the component", () => {
      expect(screen.getByTestId("image uploader")).toBeOnTheScreen();
    });
    it("should render the user image alt by default", () => {
      expect(screen.getByTestId("user image alt")).toBeOnTheScreen();
    });
    it("should render the image if an image is provided", () => {
      renderApollo(<ImageUploader prevImage="123" onUpload={onUpload} />, []);
      const image = screen.getByTestId("user image");
      expect(image).toBeOnTheScreen();
      expect(image.props.source[0].uri).toBe("123");
    });
    it("should render the add image button", () => {
      expect(screen.getByTestId("add image button")).toBeOnTheScreen();
    });
    it("should not render the upload button initially", () => {
      expect(screen.queryByTestId("upload button")).toBeNull();
    });
    // Testing Functionality
    it("should add an image when the add image button is pressed", async () => {
      (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123" }] })));
      renderApollo(<ImageUploader onUpload={onUpload} />, []);
      await act(() => fireEvent.press(screen.getByTestId("add image button")));
      const image = screen.getByTestId("user image");
      expect(image).toBeOnTheScreen();
      expect(image.props.source[0].uri).toBe("123");
    });
    it("should call showError if image size is larger than 10mb", async () => {
      (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123", fileSize: 100000000 }] })));
      renderApollo(<ImageUploader onUpload={onUpload} />, []);
      await act(() => fireEvent.press(screen.getByTestId("add image button")));
      expect(showError).toBeCalledWith("Image shouldn't be greater than 10mb");
    });
    it("should call showError if image selection is cancelled", async () => {
      (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: true, assets: [{ uri: "123" }] })));
      renderApollo(<ImageUploader onUpload={onUpload} />, []);
      await act(() => fireEvent.press(screen.getByTestId("add image button")));
      expect(showError).toBeCalledWith("Image selection cancelled");
    });
    it("should render the upload button if an image is selected", async () => {
      (launchImageLibraryAsync as jest.Mock).mockImplementation(() => Promise.resolve(({ canceled: false, assets: [{ uri: "123" }] })));
      (lookup as jest.Mock).mockReturnValue("");
      (extension as jest.Mock).mockReturnValue("");
      jest.spyOn(uuid, "v4").mockReturnValue("123");
      renderApollo(<ImageUploader onUpload={onUpload} />, MOCK_UPLOAD_IMAGE);
      await act(() => fireEvent.press(screen.getByTestId("add image button")));
      const upload = screen.getByTestId("upload button");
      fireEvent.press(upload);
      await waitFor(() => expect(screen.queryByTestId("upload button")).toBeNull());
    }, 10000);
  });
});