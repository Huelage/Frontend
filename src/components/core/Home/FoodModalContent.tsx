import restuarants from '@api/mock/mockRestaurants';
import { CustomImage } from '@components/misc';
import { Ionicons } from '@expo/vector-icons';
import { FoodInterface } from '@interfaces';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FoodModalResCard from './FoodModalResCard';

interface ModalInterface extends Partial<FoodInterface> {
  imgUrl: string;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const FoodModalContent = ({ imgUrl, name, desc, close }: ModalInterface) => {
  return (
    <View style={styles.container}>
      <View style={styles.foodImageBox}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => close(false)}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <CustomImage imgUrl={imgUrl} imgSize={wp('65%')} imgPad={0} style={styles.foodImage} shadowBlur={8} shadowHeight={10} shadowColor='rgba(76, 175, 80, 0.4)' />
      </View>
      <View style={styles.foodDetailsBox}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodDesc}>{desc}</Text>
      </View>
      <Text style={styles.foodBuyFromTitle}>Buy From</Text>
      <FlatList
        data={restuarants}
        renderItem={({ item }) => (
          <FoodModalResCard resId={item.id} />
        )}
        contentContainerStyle={styles.foodBuyFromSection}
      />
    </View>
  );
};
export default FoodModalContent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: hp("70%"),
    justifyContent: 'center',
    width: wp("90%")
  },
  foodImageBox: {
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    width: '100%'
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  foodImage: {
    flex: 1,
    height: wp('65%'),
    position: 'absolute',
    top: -50,
    width: wp('65%')
  },
  foodDetailsBox: {
    gap: 10,
    marginTop: 100,
    padding: 20
  },
  foodName: {
    fontFamily: fonts.I_700,
    fontSize: 25,
    textAlign: 'center'
  },
  foodDesc: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontFamily: fonts.I_500I,
    fontSize: 13,
    textAlign: 'center'
  },
  foodBuyFromSection: {
    gap: 10,
    padding: 20,
    paddingTop: 0,
    width: wp("90%")
  },
  foodBuyFromTitle: {
    fontFamily: fonts.I_700,
    fontSize: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'left',
    width: '100%'
  }
});