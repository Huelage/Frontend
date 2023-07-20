import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNModal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  [x: string]: any;
}

const CustomModal = ({ isVisible, children, close, ...props }: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={() => close(false)}>
        <BlurView intensity={9.5} style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            {children}
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  modalContainer: {
    alignItems: 'center',
    height: hp('100%'),
    justifyContent: 'center',
    width: wp('100%'),
  },
  childrenContainer: {

  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
});