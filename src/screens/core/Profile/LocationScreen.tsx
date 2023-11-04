import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { EDIT_LOCATIONS } from "@api/graphql";
import { getEntity, setCredentials } from "@api/slices/globalSlice";
import { useMutation } from "@apollo/client";
import { LocationInput } from "@components/core/Profile";
import { LocationList } from "@containers/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { UserProfileTabProps } from "@interfaces";
import { useNavigation } from "@react-navigation/native";
import { fonts, showError } from "@utils";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlaceData, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LocationScreen = () => {
  const { color } = useAppTheme();
  const dispatch = useAppDispatch();
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const [addLocation, { data: added }] = useMutation(EDIT_LOCATIONS);
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation<UserProfileTabProps>();

  const handleLocation = async (data: GooglePlaceData) => {
    const location = entity.knownLocation?.find(location => location.locationId === data.place_id);
    if (location) {
      showError(`${data.structured_formatting.main_text} is already a known location`);
    } else {
      const input = { locationId: data.place_id, name: data.description };
      await addLocation({ variables: { input } });
    }
  };
  const onError = (error: string) => showError(error);

  useEffect(() => {
    if (added) {
      const newEntity = { ...entity, knownLocation: added.editUserLocation.knownLocation.locations };
      dispatch(setCredentials({ entity: newEntity }));
    }
  }, [added]);
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: color.mainBg }]} testID="location screen">
      <View style={[styles.headerBox, { borderColor: color.mainGreen }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} testID="go back">
          <MaterialCommunityIcons name="chevron-left" size={35} color={color.mainText} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: color.mainText }]}>Locations</Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Add a new location"
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, components: "country:ng" }}
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
      <LocationList />
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
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 10
  },
  backButton: {
    position: "absolute",
    top: -5,
    left: 10
  },
  headerText: {
    fontFamily: fonts.I_500,
    fontSize: 20
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