import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@hooks';
import { SettingOptionInterface } from '@interfaces';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingOptionItem = ({ title, isToggle, initVal, disabled, danger, onPress }: SettingOptionInterface) => {
  const { color } = useAppTheme();
  const [isToggleEnabled, setIsToggleEnabled] = useState<boolean | undefined>(initVal);
  const toggleSwitch = () => {
    setIsToggleEnabled(!isToggleEnabled);
    onPress();
  };
  return (
    <TouchableOpacity disabled={isToggle} onPress={onPress} testID={`${title} setting option item`}>
      <View style={styles.container}>
        <Text style={[styles.textStyle, { color: danger ? color.danger : color.mainText }]}>{title}</Text>
        {isToggle ? (
          <Switch
            disabled={disabled}
            trackColor={{ false: 'rgba(188, 181, 181, .3)', true: color.mainGreenOpaque }}
            thumbColor={isToggleEnabled ? color.mainGreen : "rgb(188, 181, 181)"}
            ios_backgroundColor="rgba(188, 181, 181, .3)"
            onValueChange={toggleSwitch}
            value={isToggleEnabled}
            style={styles.switchStyle}
            testID={`${title} toggle switch`}
          />
        ) : (
          <MaterialCommunityIcons testID='chevron icon' name="chevron-right" size={30} color={danger ? color.danger : color.mainText} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SettingOptionItem);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 10
  },
  textStyle: {
    fontFamily: fonts.I_400,
    fontSize: 18
  },
  switchStyle: {
    transform: [{ scale: .8 }]
  }
});