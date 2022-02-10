/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Button, TextInput, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {addTask} from '../db/Realm';
import {useNavigation} from '@react-navigation/native';

const TaskForm = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = data => {
    addTask(data.title, data.description);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles['container-form']}>
        <View>
          <Text style={styles.label}>Título*</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onchange, onblur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onblur}
                onChangeText={onchange}
              />
            )}
          />

          {errors.title && (
            <Text style={styles['error-message']}>
              Por favor, insira um título
            </Text>
          )}
        </View>

        <View>
          <Text style={styles['label-textarea']}>Descrição*</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onchange, onblur, value}}) => (
              <TextInput style={styles['input-textarea']} focusable={true} />
            )}
            name="description"
          />

          {errors.title && (
            <Text style={styles['error-message']}>
              Por favor, insira uma descrição
            </Text>
          )}
        </View>

        <View style={styles['button-camera']}>
          <Button title={'CAMERA'} />
        </View>
      </View>
      <View style={styles['container-actions']}>
        <View style={styles['button-container']}>
          <Button
            title="Salvar"
            color="green"
            onPress={() => handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles['button-container']}>
          <Button
            title="Voltar"
            color="grey"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  'form-title': {
    marginTop: '0.2em',
    marginLeft: '0.7em',
  },
  'container-form': {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1em',
  },
  input: {
    margin: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 3,
    marginTop: 2,
    color: 'black',
  },
  'input-textarea': {
    margin: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 100,
    padding: 0,
    color: 'black',
  },
  label: {
    marginBottom: 2,
    marginLeft: 1,
  },
  'label-textarea': {
    marginBottom: 2,
    marginLeft: 2,
  },
  'container-actions': {
    marginTop: 350,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'column',
  },

  'button-container': {
    marginBottom: 5,
  },
  button: {
    margin: '1em',
    marginLeft: '1em',
    marginRight: '1em',
  },

  'button-camera': {
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 5,
  },
  'error-message': {
    marginLeft: '1em',
    color: 'red',
    fontWeight: 'bold',
  },
  'error-message-textarea': {
    marginLeft: '2em',
    marginBottom: '1em',
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TaskForm;