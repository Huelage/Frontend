import { useAppTheme } from '@hooks';
import { fonts } from '@utils';
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';


interface ToggleSwitchProps {
    label: string;
    initialValue: boolean;
    onValueChange: (value: boolean) => void;
}

const ToggleSwitch = ({ label, initialValue, onValueChange }: ToggleSwitchProps) => {


    const [isEnabled, setIsEnabled] = useState(initialValue);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        onValueChange(!isEnabled);
    };
    const { color } = useAppTheme();
    return (
        <View style={styles.container}>
            <View style={styles.mainBox}>
                <Text style={[styles.textStyle, { color: color.mainText }]}>{label}</Text>
                <View>
                    <Switch
                        trackColor={{ false: '#767577', true: color.mainGreen }}
                        thumbColor={isEnabled ? color.mainGreen : color.mainGreen}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    />
                </View>
            </View>
        </View>

    );
};
export default ToggleSwitch;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "80%",
        alignItems: "flex-start"

    },
    textStyle: {
        fontSize: 20,
        fontFamily: fonts.I_400,
        fontWeight: "400",
    },

});


