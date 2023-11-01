import { CustomBox } from '@components/misc';
import { useAppTheme } from '@hooks';
import { SideOptionsInterface, extraInterface } from '@interfaces';
import { fonts, numberToCurrency } from '@utils';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { QuantityController } from '../Cart';

interface SideOptionElementInterface extends SideOptionsInterface {
  optionSelected: boolean;
  increase: (extra: extraInterface) => void;
  decrease: (extra: extraInterface) => void;
}

const SideOptionElement = ({ name, price, isSingle, groupId, optionSelected, increase, decrease }: SideOptionElementInterface) => {
  const { color } = useAppTheme();
  const [quantity, setQuantity] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const handleExtra = () => {
    if (selected) {
      decrease({ name, price, groupId });
      setQuantity(0);
    } else {
      increase(isSingle ? { name, price, groupId } : { name, price, groupId, quantity: 1 });
      setQuantity(1);
    }
  };
  const increaseExtra = () => {
    increase({ name, price, groupId, quantity: quantity + 1 });
    setQuantity(quantity + 1);
  };
  const decreaseExtra = () => {
    decrease({ name, price, groupId, quantity: quantity - 1 });
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (quantity > 0) setSelected(true);
    else setSelected(false);
  }, [quantity]);
  useEffect(() => {
    if (optionSelected) setQuantity(1);
    else setQuantity(0);
  }, [optionSelected]);
  return (
    <View style={styles.container} testID='side option element'>
      <CustomBox bgColor={color.cardBg2} width={wp('100%') - 30} height={95} pad={6} r={10} left={-4} />
      <Text style={[styles.mainText, { color: color.mainText }]}>
        {name}
        <Text style={[styles.accentText, { color: color.mainGreen }]}> +{numberToCurrency(price * (quantity || 1))}</Text>
      </Text>
      {isSingle || quantity < 1 ? (
        <TouchableOpacity onPress={handleExtra} style={[styles.radioButton, { borderColor: color.mainGreen }]} testID={`${name} radio button`}>
          <View style={[styles.radioButtonInner, { backgroundColor: selected ? color.mainGreen : color.cardBg2 }]} />
        </TouchableOpacity>
      ) : (
        <QuantityController quantity={quantity} increase={increaseExtra} decrease={decreaseExtra} />
      )}
    </View>
  );
};

export default SideOptionElement;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30
  },
  mainText: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  accentText: {
    fontFamily: fonts.I_500,
    fontSize: 18
  },
  radioButton: {
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 2,
    height: 26,
    justifyContent: 'center',
    width: 26
  },
  radioButtonInner: {
    borderRadius: 10,
    height: 16,
    width: 16
  }
});