import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { fonts, shadowStyle } from '@utils';

interface ControllerInterface {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityController = ({ quantity, setQuantity }: ControllerInterface) => {
  const { color } = useAppTheme();
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => { if (quantity > 1) setQuantity(quantity - 1); };
  return (
    <View style={[styles.container, { backgroundColor: color.cardBg }]}>
      <TouchableOpacity
        onPress={decrease}
        style={[styles.buttonBox, { backgroundColor: color.mainGreen }]}
      >
        <AntDesign name="minus" size={12} color="white" />
      </TouchableOpacity>
      <Text style={[styles.quantity, { color: color.mainText }]}>{quantity}</Text>
      <TouchableOpacity
        onPress={increase}
        style={[styles.buttonBox, { backgroundColor: color.mainGreen }]}
      >
        <AntDesign name="plus" size={12} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityController;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    ...shadowStyle
  },
  buttonBox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  quantity: {
    fontFamily: fonts.I_600,
    fontSize: 16
  }
});