import { CustomImage, CustomModal } from '@components/misc';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodInterface } from '@interfaces';
import { CheckBox } from '@rneui/themed';
import { Box, BoxShadow, Canvas, rect, rrect } from '@shopify/react-native-skia';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FoodModalContent from './FoodModalContent';

const FoodCard = ({ imgUrl, name, price, rating, cals, isFavourite, desc }: FoodInterface) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(isFavourite);
  const containerRect = rrect(rect(6, 6, (wp('60%') - 20), 135), 10, 10);
  return (
    <>
      <View style={styles.container}>
        <Canvas style={styles.foodBox}>
          <Box box={containerRect} color="rgb(240, 255, 240)">
            <BoxShadow dx={6} dy={6} blur={4} color="rgba(0, 0, 0, .4)" />
          </Box>
        </Canvas>
        <View style={styles.foodDetails}>
          <View style={styles.foodIntro}>
            <View style={styles.foodRatingBox}>
              <Ionicons name="star" size={24} color="#47CA4C" />
              <Text style={styles.foodRating}>{rating.toFixed(1)}</Text>
            </View>
            <CustomImage imgUrl={imgUrl} imgSize={110} imgPad={5} style={styles.foodImageContainer} />
            <CheckBox
              checked={isFav}
              onPress={() => setIsFav(!isFav)}
              checkedIcon="heart"
              uncheckedIcon="heart-o"
              checkedColor="red"
              uncheckedColor='black'
              containerStyle={{ backgroundColor: '#F0FFF0', padding: 0, margin: 0 }}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
            <Text style={styles.foodName}>{name}</Text>
            <View style={styles.foodCalories}>
              <MaterialCommunityIcons name="fire" size={22} color="#47CA4C" />
              <Text style={styles.foodCaloriesText}>{cals} KCal</Text>
            </View>
            <Text style={styles.foodPrice}>
              <MaterialCommunityIcons name="currency-ngn" size={12} color="black" />
              {price}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomModal isVisible={showModal} close={setShowModal}>
        <FoodModalContent imgUrl={imgUrl} name={name} desc={desc} />
      </CustomModal>
    </>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 65,
    paddingBottom: 5,
    width: wp("60%")
  },
  foodBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 155,
    width: wp("60%"),
  },
  foodDetails: {
    paddingHorizontal: 12,
    paddingVertical: 15
  },
  foodIntro: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 35
  },
  foodImageContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 120,
    justifyContent: 'center',
    left: 52,
    position: 'absolute',
    top: -hp("8%"),
    width: 120,
    zIndex: 2
  },
  foodCalories: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center'
  },
  foodCaloriesText: {
    fontFamily: fonts.I_400,
    fontSize: 12
  },
  foodName: {
    fontFamily: fonts.I_700,
    fontSize: 14,
    textAlign: 'center'
  },
  foodPrice: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.I_500,
    fontSize: 14,
    textAlign: 'center'
  },
  foodRatingBox: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center'
  },
  foodRating: {
    fontFamily: fonts.I_400,
    fontSize: 14,
    paddingTop: 6
  }
});