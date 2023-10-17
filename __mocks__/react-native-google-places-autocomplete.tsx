import React, { LegacyRef } from "react";
import { TextInput, View } from "react-native";

export type GooglePlacesAutocompleteRef = {
  setAddressText(address: string): void;
  getAddressText(): string;
  getCurrentLocation(): void;
  clear(): void;
} & TextInput;
const data = { place_id: "123", description: "123 Main St", structured_formatting: { main_text: "Main St" } };
interface GooglePlacesAutocompleteProps {
  onPress: (data: { place_id: string, description: string, structured_formatting: { main_text: string; }; }) => void;
  onFail: (error: string) => void;
}
export const GooglePlacesAutocomplete = React.forwardRef((props: GooglePlacesAutocompleteProps, ref: LegacyRef<GooglePlacesAutocompleteRef>) => (
  <View
    {...props}
    ref={ref}
    onTouchStart={() => props.onPress(data)}
    onTouchCancel={() => props.onFail("test error")}
    testID="places autocomplete"
  />
));
