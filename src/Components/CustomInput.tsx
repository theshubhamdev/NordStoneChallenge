import React from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardType} from 'react-native';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

interface ICustomInput<T extends FieldValues> {
  control: Control<T, object>;
  name: Path<T>;
  rules?: {};
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: KeyboardType;
}

function CustomInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = '',
  secureTextEntry = false,
  type,
}: ICustomInput<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={'gray'}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={type}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
    color: '#000000',
  },
});

export default CustomInput;
