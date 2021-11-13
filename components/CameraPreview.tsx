import React from 'react';
import { ImageBackground } from 'react-native';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

interface Styles {
  container: ViewStyle;
  previewButtion: ViewStyle;
  previewButtonContainer: ViewStyle;
  text: TextStyle;
}

interface Props {
  retakePhoto?: any;
  savePicture?: any;
  photo?: {
    uri: string;
  };
}

const CameraPreview = ({ photo, retakePhoto, savePicture }: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: photo?.uri }}
        style={{
          flex: 1
        }}
        testID="image"
      />
      <View style={styles.previewButtonContainer}>
        <TouchableOpacity onPress={retakePhoto} style={styles.previewButtion}>
          <Text style={styles.text} testID="retake-photo">
            Retake Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={savePicture} style={styles.previewButtion}>
          <Text style={styles.text} testID="save-photo">
            Save Photo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  previewButtion: {
    backgroundColor: '#BB0A21',
    width: 130,
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    alignItems: 'center'
  },
  previewButtonContainer: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    margin: 20
  },
  text: {
    fontSize: 18,
    color: '#fff'
  }
});

export default CameraPreview;
