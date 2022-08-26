import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CustomButton, CustomInput} from '../Components';
import {useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../Contexts/AuthContext';

interface IMessageType {
  id: string;
  userId: string;
  message: string;
}

const Message = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const {control, getValues, handleSubmit, setValue} = useForm<{
    message: string;
  }>();

  const {user} = useAuthContext();

  const fetchPosts = useCallback(async () => {
    try {
      const list: IMessageType[] = [];
      await firestore()
        .collection('messages')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, message} = doc.data();
            list.push({
              id: doc.id,
              userId,
              message,
            });
          });
        });
      setMessages(list);
      if (loading) {
        setLoading(false);
      }
      console.log('Message: ', messages);
    } catch (e) {
      console.log(e);
    }
  }, [loading, messages]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({item}: {item: IMessageType}) => {
    return (
      <View>
        <Text style={styles.text}>{item.message}</Text>
      </View>
    );
  };
  const onSubmit = () => {
    try {
      firestore().collection('messages').add({
        userId: user?.uid,
        message: getValues().message,
      });
      fetchPosts();
      setValue('message', '');
    } catch (error) {
      Alert.alert('Something went wrong', error);
    }
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={messages.filter(msg => user?.uid === msg.userId)}
        renderItem={renderItem}
      />
      <CustomInput
        name="message"
        control={control}
        placeholder="Enter your text"
        rules={{
          minLength: {
            value: 1,
            message: 'Text must be entered before sending',
          },
        }}
      />
      <CustomButton
        text={loading ? 'Sending' : 'Send'}
        onPress={handleSubmit(onSubmit)}
      />
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
  text: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 5,
  },
});

export default Message;
