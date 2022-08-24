import {View, StyleSheet, Alert, Text} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../Components';
import {useForm} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import {calculate} from '../Utils/calculate';

type IFormProps = {
  number1: number;
  number2: number;
};
const Calculator = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(0);

  const items = [
    {label: 'Multiply', value: 'multiplication'},
    {label: 'Add', value: 'addition'},
    {label: 'Subtract', value: 'subtraction'},
  ];
  const {control, getValues} = useForm<IFormProps>();

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    if (!value || !getValues().number1 || !getValues().number2) {
      Alert.alert('Error', 'Please enter valid inputs');
      return;
    }
    setLoading(true);
    try {
      const response = await calculate(
        value,
        getValues().number1,
        getValues().number2,
      );
      setAnswer(response);
    } catch (error) {
      Alert.alert('Error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.root}>
      <CustomInput
        name="number1"
        control={control}
        placeholder="Enter a number"
      />
      <CustomInput
        name="number2"
        control={control}
        placeholder="Enter a number"
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
      />
      <CustomButton
        text={loading ? 'Calculating...' : 'Calculate'}
        onPress={handleSubmit}
      />
      <Text style={styles.answer}>{answer}</Text>
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
  answer: {
    fontSize: 20,
    color: 'white',
  },
});

export default Calculator;
