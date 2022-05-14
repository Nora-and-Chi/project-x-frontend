import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import CameraPreview from './CameraPreview';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { View, ViewStyle, Text, TextStyle, TouchableOpacity, StyleSheet } from 'react-native';

interface Styles {
  container: ViewStyle;
  camera: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
  cameraSwitch: ViewStyle;
  flashMode: ViewStyle;
  footerWrapper: ViewStyle;
  footerContainer: ViewStyle;
  takePictureContainer: ViewStyle;
  takePicture: ViewStyle;
}

type FlashModeType = 'off' | 'on' | 'auto';

type CapturedImageType = {
  uri: string;
} | null;

export default function CameraComponent() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImageType>(null);
  const [flashMode, setFlashMode] = useState<FlashModeType>('off');
  const [cameraType, setCameraType] = useState<'front' | 'back'>(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<string | boolean | null>(null);

  let camera: any = Camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const __retakePhoto = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __savePicture = async () => {
    const uri = capturedImage?.uri;
    if (uri) {
      await MediaLibrary.saveToLibraryAsync(uri);
    }
    __retakePhoto();
  };

  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} retakePhoto={__retakePhoto} savePicture={__savePicture} />
      ) : (
        <Camera
          flashMode={flashMode}
          type={cameraType}
          style={{ flex: 1 }}
          ref={r => {
            camera = r;
          }}
        >
          <View style={styles.footerWrapper}>
            <View style={styles.footerContainer}>
              <View style={styles.takePictureContainer}>
                <TouchableOpacity onPress={__takePicture} style={styles.takePicture} />
              </View>
              <TouchableOpacity onPress={__handleFlashMode} style={styles.flashMode}>
                <Ionicons name={flashMode === 'on' ? 'flash' : 'flash-off'} size={50} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={__switchCamera} style={styles.cameraSwitch}>
                <Ionicons name="ios-camera-reverse" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
}
const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  cameraSwitch: {
    position: 'absolute',
    right: '12%',
    top: '50%'
  },
  flashMode: {
    position: 'absolute',
    left: '12%',
    top: '50%'
  },
  text: {
    fontSize: 18,
    color: '#fff'
  },
  footerWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  takePictureContainer: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  takePicture: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
});
