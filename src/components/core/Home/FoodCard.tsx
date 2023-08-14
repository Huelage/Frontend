import { CustomImage, CustomModal } from '@components/misc';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
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
  const { color } = useAppTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(isFavourite);
  const containerRect = rrect(rect(6, 6, (wp('60%') - 20), 135), 10, 10);
  return (
    <>
      <View style={styles.container}>
        <Canvas style={styles.foodBox}>
          <Box box={containerRect} color={color.cardBg}>
            <BoxShadow dx={2} dy={4} blur={4} color="rgba(76, 175, 80, 0.61)" />
          </Box>
        </Canvas>
        <View style={styles.foodDetails}>
          <View style={styles.foodIntro}>
            <View style={styles.foodRatingBox}>
              <Ionicons name="star" size={14} color="#47CA4C" />
              <Text style={[styles.foodRating, { color: color.mainText }]}>{rating.toFixed(1)}</Text>
            </View>
            <CustomImage imgUrl={imgUrl} imgSize={110} imgPad={5} style={styles.foodImageContainer} />
            <CheckBox
              checked={isFav}
              onPress={() => setIsFav(!isFav)}
              checkedIcon="heart"
              uncheckedIcon="heart-o"
              checkedColor="red"
              uncheckedColor={color.mainText}
              containerStyle={{ backgroundColor: color.cardBg, padding: 0, margin: 0 }}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
            <Text style={[styles.foodName, { color: color.mainText }]}>{name}</Text>
            <View style={styles.foodCalories}>
              <MaterialCommunityIcons name="fire" size={22} color="#47CA4C" />
              <Text style={[styles.foodCaloriesText, { color: color.mainText }]}>{cals} KCal</Text>
            </View>
            <Text style={[styles.foodPrice, { color: color.mainText }]}>
              <MaterialCommunityIcons name="currency-ngn" size={12} color={color.mainText} />
              {price}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <CustomModal isVisible={showModal}>
        <FoodModalContent close={setShowModal} imgUrl={imgUrl} name={name} desc={desc} />
      </CustomModal>
    </>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    height: 155,
    marginLeft: 10,
    marginTop: 51,
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
    left: (wp('60%') - 140) / 2,
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
    paddingTop: 1
  }
});