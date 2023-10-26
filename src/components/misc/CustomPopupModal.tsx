import { useAppTheme } from '@hooks';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RNModal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomPopupModal = ({ children, showModal, setShowModal }: CustomModalProps) => {
  const { color } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <RNModal
      isVisible={showModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={1000}
      style={styles.modal}
      testID='custom popup modal'
    >
      <View style={[styles.filterBox, { backgroundColor: color.cardBg2, paddingBottom: insets.bottom }]}>
        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.boxCloser} testID='modal closer'>
          <View style={styles.boxCloserButton} />
        </TouchableOpacity>
        {children}
      </View>
    </RNModal>
  );
};

export default CustomPopupModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  filterBox: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 0,
    padding: 15,
    position: 'absolute',
    width: wp('100%'),
  },
  boxCloser: {
    paddingVertical: 10
  },
  boxCloserButton: {
    alignSelf: 'center',
    backgroundColor: "#BCB5B5",
    borderRadius: 5,
    height: 5,
    marginBottom: 10,
    width: 50
  }
});