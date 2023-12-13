import { useAppDispatch, useAppSelector } from "@api/app/appHooks";
import { EDIT_LOCATIONS, GET_KNOWN_LOCATIONS } from "@api/graphql";
import { getEntity, setCredentials } from "@api/slices/globalSlice";
import { useMutation, useQuery } from "@apollo/client";
import { LocationElement } from "@components/core/Profile";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

const LocationList = () => {
  const entity = useAppSelector(getEntity);
  if (!entity) return null;
  const dispatch = useAppDispatch();
  const initialMode = useRef<boolean>(true);
  const { data: locations } = useQuery(GET_KNOWN_LOCATIONS, { fetchPolicy: "network-only" });
  const [deleteLocation, { data: removed }] = useMutation(EDIT_LOCATIONS);

  const removeLocation = async (locationId: string) => {
    try {
      await deleteLocation({ variables: { input: { locationId } } });
    } catch {}
  };

  useEffect(() => { initialMode.current = false; }, []);
  useEffect(() => {
    if (locations) {
      const newEntity = { ...entity, knownLocation: locations.getUserProfile.knownLocation.locations };
      dispatch(setCredentials({ entity: newEntity }));
    }
  }, [locations]);
  useEffect(() => {
    if (removed) {
      const newEntity = { ...entity, knownLocation: removed.editUserLocation.knownLocation.locations };
      dispatch(setCredentials({ entity: newEntity }));
    }
  }, [removed]);
  return (
    <Animated.FlatList
      contentContainerStyle={styles.locationList}
      data={entity.knownLocation}
      keyExtractor={item => item.locationId}
      itemLayoutAnimation={Layout.springify().delay(150)}
      renderItem={({ item, index }) => (
        <LocationElement location={item} initialMode={initialMode} idx={index} removeLocation={removeLocation} />
      )}
      showsVerticalScrollIndicator={false}
      style={styles.locationBody}
      testID="location list"
    />
  );
};

export default LocationList;

const styles = StyleSheet.create({
  locationBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  locationList: {
    gap: 30,
    paddingBottom: 60
  },
});