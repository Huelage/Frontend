import { StarRating } from '@components/misc';
import { useAppTheme } from '@hooks';
import { RestaurantInterface, UserTabProps } from '@interfaces';
import { useNavigation } from '@react-navigation/native';
import { Box, BoxShadow, Canvas, SkRRect, rect, rrect } from '@shopify/react-native-skia';
import { fonts } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface RestaurantProps extends RestaurantInterface {
  testRect?: SkRRect; /* for testing only */
}

const RestaurantCard = ({ name, imgUrl, rating, location, testRect }: RestaurantProps) => {
  const { color } = useAppTheme();
  const { navigate } = useNavigation<UserTabProps>();
  const containerRect = testRect || rrect(rect(6, 6, (wp('60%') - 20), 210), 15, 15);
  return (
    <View style={styles.container} testID='restaurant card'>
      <Canvas style={styles.resBox}>
        <Box box={containerRect} color={color.cardBg}>
          <BoxShadow dx={2} dy={4} blur={4} color="rgba(76, 175, 80, 0.61)" />
        </Box>
      </Canvas>
      <Image testID='restuarant image' style={styles.resImage} source={{ uri: imgUrl }} />
      <TouchableWithoutFeedback onPress={() => navigate("Vendors", { screen: "ItemDetail", params: { itemId: "43435" } })}>
        <View style={styles.detailsBox}>
          <Text style={[styles.resName, { color: color.mainText }]}>{name}</Text>
          <StarRating rating={rating} />
          <Text style={[styles.resLocation, { color: color.mainGreen }]}>{location}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    height: 230,
    marginLeft: 10,
    width: wp("60%")
  },
  resBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 230,
    width: wp("60%")
  },
  resImage: {
    borderRadius: 15,
    height: 100,
    left: 6,
    width: wp('60%') - 20
  },
  detailsBox: {
    gap: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 22
  },
  resName: {
    fontFamily: fonts.I_700,
    fontSize: 16,
    textAlign: 'center'
  },
  resLocation: {
    color: '#38742A',
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: 'center'
  }
});