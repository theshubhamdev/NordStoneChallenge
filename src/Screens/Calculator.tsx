import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput} from '../Components';
import {useForm} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';

type IFormProps = {
  number1: number;
  number2: number;
  operator: 'Multiply' | 'Add' | 'Subtract';
};
const Calculator = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const items = [
    {label: 'Multiply', value: 'Multiply'},
    {label: 'Add', value: 'Add'},
    {label: 'Subtract', value: 'Subtract'},
  ];
  const {control} = useForm<IFormProps>();

  const handleSubmit = () => {};
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
      <CustomButton text="Calculate" onPress={handleSubmit} />
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

export default Calculator;
