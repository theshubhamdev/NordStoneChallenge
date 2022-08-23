import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {CustomButton} from '../Components';

const Upload = () => {
  const handleUploadImage = () => {};
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}} />
      <CustomButton text="Upload Image" onPress={handleUploadImage} />
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
  },
});

export default Upload;
