import { useAppTheme } from '@hooks';
import { shadowStyle } from '@utils';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
interface CustomPinInputInterface {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
};

const CustomPinInput = ({ value, onChange, onSubmit }: CustomPinInputInterface) => {
  const { color } = useAppTheme();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue: onChange });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      testID='custom pin input'
      onChangeText={onChange}
      cellCount={CELL_COUNT}
      rootStyle={styles.inputRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      onEndEditing={onSubmit}
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          testID={`pin input ${index}`}
          style={[styles.inputCell, isFocused && (styles.activeInputCell, { borderColor: color.mainGreen }), { color: color.mainText }]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

export default CustomPinInput;

const styles = StyleSheet.create({
  inputRoot: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    width: '100%'
  },
  inputCell: {
    alignItems: 'center',
    borderColor: '#93b1a4',
    borderRadius: 11,
    borderWidth: 2,
    fontSize: 28,
    height: 65,
    justifyContent: 'center',
    paddingVertical: 14,
    textAlign: 'center',
    width: 65
  },
  activeInputCell: {
    ...shadowStyle
  }
});