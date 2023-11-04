import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const CustomModal = ({ isVisible, children }: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      testID="custom modal"
      backdropOpacity={0}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <BlurView intensity={9.5} style={styles.modalContainer}>
        <View style={styles.modalChildrenWrapper}>
          {children}
        </View>
      </BlurView>
    </RNModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  modalContainer: {
    alignItems: "center",
    height: hp("100%"),
    justifyContent: "center",
    width: wp("100%"),
  },
  modalChildrenWrapper: {
    alignItems: "center",
    height: hp("100%"),
    justifyContent: "center",
    width: wp("100%"),
    backgroundColor: "rgba(0, 0, 0, .7)"
  }
});