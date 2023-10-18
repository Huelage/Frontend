import { useAppDispatch } from '@api/app/appHooks';
import { switchTheme } from '@api/slices/globalSlice';
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@hooks";
import { fonts } from "@utils";
import ToggleSwitch from "@containers/User/Profile/ToggleSwitch";
import { useState } from "react";



const GeneralSetting = () => {
    const { color, theme } = useAppTheme();
    const dispatch = useAppDispatch();
    const [isActive, setActive] = useState(theme || 'light');

    const handleMatchDeviceSettingToggle = () => {
        //setActiveMode(device);

    };
    const handleDarkModeToggle = () => {
        if (isActive !== 'dark') {
            dispatch(switchTheme("dark"));
            setActive("dark");

        }

    };
    const handleLightModeToggle = () => {
        if (isActive !== 'light') {
            dispatch(switchTheme("light"));
            setActive("light");
        }

    };


    return (
        <View style={styles.container} testID="General Settings">
            <View style={styles.mainBox}>
                <View style={styles.innerBox}>
                    <MaterialCommunityIcons name="cog" size={30} color={color.mainGreen} ></MaterialCommunityIcons>
                    <Text style={[styles.headerText, { color: color.mainText }]}> {""} General </Text>
                </View>
                <View style={styles.setTheme}>
                    <Text style={[styles.textStyle, { color: color.mainText }]}> {""} Theme</Text>

                    <ToggleSwitch
                        label="Match device settings"
                        initialValue={isActive === 'light'}
                        onValueChange={handleMatchDeviceSettingToggle}
                    />


                    <ToggleSwitch
                        label="Dark Mode"
                        initialValue={isActive === 'dark'}
                        onValueChange={handleDarkModeToggle}
                    />

                    <ToggleSwitch
                        label="Light Mode"
                        initialValue={isActive === 'light'}
                        onValueChange={handleLightModeToggle}
                    />
                </View>
            </View>


        </View >
    );
};

export default GeneralSetting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainBox: {
        gap: 10,
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column"

    },
    innerBox: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    headerText: {
        fontSize: 25,
        fontFamily: fonts.I_500,
        fontWeight: "700",
    },
    setTheme: {
        marginTop: 2,
        marginHorizontal: 55,
        gap: 5,
        justifyContent: "space-between",
        width: "100%"
    },
    textStyle: {
        fontSize: 20,
        fontFamily: fonts.I_500,
        fontWeight: "500",
    },
    subText: {
        fontSize: 22,
        fontFamily: fonts.I_400,
        fontWeight: "500",
    }
});