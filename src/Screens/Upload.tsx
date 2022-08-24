import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../Components';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
  launchCamera,
  CameraOptions,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Upload = () => {
  const [image, setImage] = useState<Asset[] | undefined>(undefined);
  const [uploading, setUploading] = useState(false);

  const openCamera = () => {
    const cameraoptions: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    launchCamera(cameraoptions, response => {
      if (response.didCancel) {
        Alert.alert('Error', 'User cancelled image picker');
      } else if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Error', 'Camera Unavailable');
      } else if (response.errorCode === 'permission') {
        Alert.alert('Error', 'Permission not granted');
      } else if (response.errorCode === 'others') {
        Alert.alert('Error', 'Unknown error');
      } else {
        const source = response.assets;
        setImage(source);
      }
    });
  };

  const selectImage = () => {
    const galleryoptions: ImageLibraryOptions = {
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo',
    };
    launchImageLibrary(galleryoptions, response => {
      if (response.didCancel) {
        Alert.alert('Error', 'User cancelled image picker');
      } else if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Error', 'Camera Unavailable');
      } else if (response.errorCode === 'permission') {
        Alert.alert('Error', 'Permission not granted');
      } else if (response.errorCode === 'others') {
        Alert.alert('Error', 'Unknown error');
      } else {
        const source = response.assets;
        setImage(source);
      }
    });
  };

  const handleUploadImage = async () => {
    if (uploading) {
      return;
    }
    if (image && image[0].uri) {
      setUploading(true);
      const task = await storage().ref(image[0].fileName).putFile(image[0].uri);
      console.log('task', task);
      setUploading(false);
    } else {
      Alert.alert('Uploading failed', 'Select an Image');
    }
  };

  return (
    <View style={styles.root}>
      {image && <Image style={styles.image} source={{uri: image[0].uri}} />}
      <View>
        <CustomButton text="Open Camera" onPress={openCamera} />
        <CustomButton text="Open Gallery" onPress={selectImage} />
        <CustomButton
          text={uploading ? 'Uploading' : 'Upload'}
          onPress={handleUploadImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 10,
  },
});

export default Upload;
