import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

interface ICustomButton {
  onPress: () => void;
  text: string;
}

const CustomButton = ({onPress, text}: ICustomButton) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Text style={[styles.text]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default CustomButton;
