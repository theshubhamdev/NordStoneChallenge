import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {CustomButton, CustomInput} from '../Components';
import {useForm} from 'react-hook-form';

const Message = () => {
  const {control} = useForm<{message: string}>();

  const renderItem = ({item}: {item: string}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  const onSubmit = () => {};
  return (
    <View style={styles.root}>
      <FlatList data={['Hello', 'World']} renderItem={renderItem} />
      <CustomInput
        name="message"
        control={control}
        placeholder="Enter your text"
      />
      <CustomButton text="Send" onPress={onSubmit} />
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
});

export default Message;
