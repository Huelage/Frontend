import { CustomBox } from '@components/misc';
import { useAppTheme } from '@hooks';
import { SettingOptionsInterface } from '@interfaces';
import { fonts } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SettingOptionItem from './SettingOptionItem';

const SettingOptionBox = ({ description, options }: SettingOptionsInterface) => {
  const { color } = useAppTheme();
  const height = options.length * 52 + 20;
  const width = wp('100%') - 80;
  return (
    <View style={styles.container} testID='setting option box'>
      {!!description ? <Text style={[styles.description, { color: color.accentText }]}>{description}</Text> : null}
      <View style={styles.optionsBox}>
        <CustomBox width={width} height={height} r={10} pad={6} left={-6} />
        <FlatList
          data={options}
          scrollEnabled={false}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <SettingOptionItem {...item} />}
          testID='setting options list'
        />
      </View>
    </View>
  );
};

export default React.memo(SettingOptionBox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3
  },
  description: {
    fontFamily: fonts.I_300,
    fontSize: 16,
    left: 10
  },
  optionsBox: {
    paddingVertical: 10
  },
  separator: {
    backgroundColor: 'rgba(136, 136, 136, 0.3)',
    height: 1,
    marginHorizontal: 20
  }
});