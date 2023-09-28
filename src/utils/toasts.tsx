import { showMessage } from "react-native-flash-message";
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

export const showError = (message: string) => {
  showMessage({
    message,
    type: 'danger',
    duration: 3000,
    icon: () => <MaterialIcons name="error" size={24} color="black" />,
    style: styles.error
  });
};

const styles = StyleSheet.create({
  error: {
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center'
  }
});