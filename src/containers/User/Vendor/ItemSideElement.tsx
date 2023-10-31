import { SideOptionElement } from '@components/core/Vendor';
import { useAppTheme } from '@hooks';
import { SideInterface, extraInterface } from '@interfaces';
import { fonts } from '@utils';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface ItemSideElementInterface extends SideInterface {
  extras: extraInterface[];
  setExtras: React.Dispatch<React.SetStateAction<extraInterface[]>>;
}

const ItemSideElement = ({ description, options, isMultiple, isRequired, extras, setExtras }: ItemSideElementInterface) => {
  const { color } = useAppTheme();

  const increaseExtra = useCallback((extra: extraInterface) => {
    let newExtras = extras;
    if (!isMultiple) {
      const singleExtra = newExtras.find(ext => ext.groupId === extra.groupId);
      if (singleExtra) newExtras = newExtras.filter(ext => ext.groupId !== extra.groupId);
    }
    if (extras.find(ext => ext.name === extra.name))
      newExtras = newExtras.filter(ext => ext.name !== extra.name);
    newExtras = [...newExtras, extra];
    setExtras(newExtras);
  }, [extras]);
  const decreaseExtra = useCallback((extra: extraInterface) => {
    let newExtras = extras;
    let actualExtra = extras.find(ext => ext.name === extra.name);
    if (!actualExtra) return;
    if (!actualExtra.quantity || actualExtra.quantity === 1) {
      newExtras = newExtras.filter(ext => ext.name !== extra.name);
    } else {
      newExtras = newExtras.map(ext => {
        if (ext.name === actualExtra?.name) return { ...actualExtra, quantity: (actualExtra.quantity ?? 0) - 1 };
        return ext;
      });
    }
    setExtras(newExtras);
  }, [extras]);

  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color: color.mainText }]}>{`${description} ${isRequired ? "(Required)" : ""}`}</Text>
      <FlatList
        style={styles.optionList}
        data={options}
        keyExtractor={(_, idx) => idx.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <SideOptionElement {...item} optionSelected={!!extras.find(ext => ext.name === item.name)} increase={increaseExtra} decrease={decreaseExtra} />
        )}
      />
    </View>
  );
};

export default ItemSideElement;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 20
  },
  description: {
    fontFamily: fonts.I_600,
    fontSize: 20
  },
  optionList: {
    gap: 10
  }
});