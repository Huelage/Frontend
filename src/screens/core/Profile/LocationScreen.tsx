import { useAppSelector } from "@api/app/appHooks";
import { getEntity } from "@api/slices/globalSlice";
import { LocationElement, LocationInput } from "@components/core/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserNavigationProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, showError } from "@utils";
import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LocationScreen = () => {
  const { color } = useAppTheme();
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserNavigationProps>();
  const handleLocation = (data: GooglePlaceData) => {
    const datas = {
      id: data.place_id,
      name: data.description,
    };
  };
  const removeLocation = (id: string) => {
    console.log(id);
  };
  const onError = (error: string) => showError(error);

  const locations = [
    { id: "123", name: "Moremi Hall, Tafawa Balewa Way, Unilag101245, Lagos" },
    { id: "1234", name: "Sodeinde Hall, Dan Fodio St, Akoka , Lagos" },
    { id: "12345", name: "Honours Hall, DLI ,University of Lagos." }
  ];
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="location screen">
      <View style={styles.headerBox}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Locations</Text>
      </View>
      <View style={[styles.headerUnderline, { backgroundColor: color.mainGreen }]} />
      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Add a new location"
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, components: 'country:ng' }}
        onPress={handleLocation}
        onFail={onError}
        enablePoweredByContainer={false}
        textInputProps={{
          InputComp: LocationInput,
          selectionColor: color.mainGreen
        }}
        styles={{
          container: styles.googlePlacesContainer,
          row: { backgroundColor: color.searchBg },
          listView: [styles.googlePlacesListView, { backgroundColor: color.searchBg }],
          description: { color: color.mainText }
        }}
      />
      <FlatList
        contentContainerStyle={styles.locationList}
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LocationElement location={item} removeLocation={removeLocation} />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.locationBody}
        testID="location list"
      />
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  headerBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  headerUnderline: {
    height: 2
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
  },
  locationBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  locationList: {
    gap: 40
  },
  googlePlacesContainer: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    zIndex: 1
  },
  googlePlacesListView: {
    borderRadius: 5,
    left: 20,
    marginHorizontal: 8,
    position: "absolute",
    top: 95
  }
});