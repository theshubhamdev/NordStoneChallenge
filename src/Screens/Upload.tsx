import {View, StyleSheet, Image, Alert, Text} from 'react-native';
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
import {useAuthContext} from '../Contexts/AuthContext';

const Upload = () => {
  const [image, setImage] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState<number | undefined>(undefined);

  const {user, fetchUser} = useAuthContext();
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
        setImage(source || []);
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
        setImage(source || []);
      }
    });
  };

  const updateUserImage = async () => {
    const url = await handleUploadImage();
    await user?.updateProfile({
      photoURL: url,
    });
    if (fetchUser) {
      fetchUser();
    }
  };

  const handleUploadImage = async () => {
    if (!image || !image[0].uri) {
      return;
    }
    const uploadUri = image[0].uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage([]);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.root}>
      {(image.length || user?.photoURL) && (
        <Image
          style={styles.image}
          source={{uri: image[0]?.uri || user?.photoURL || ''}}
        />
      )}
      <View>
        <CustomButton text="Open Camera" onPress={openCamera} />
        <CustomButton text="Open Gallery" onPress={selectImage} />
        <CustomButton
          text={uploading ? 'Uploading...' : 'Upload'}
          onPress={updateUserImage}
        />
        {uploading ? (
          <Text style={{fontSize: 20, color: 'white'}}>
            {transferred}% Completed
          </Text>
        ) : (
          <></>
        )}
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
