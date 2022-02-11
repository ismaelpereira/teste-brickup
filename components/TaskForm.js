/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useRoute, useNavigation} from '@react-navigation/native';
import {addTask, getTasks, updateTask} from '../db/Realm';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {taskStore} from '../db/Storage';

const TaskForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [uri, setUri] = useState('');

  let formValues = {
    title: '',
    description: '',
  };

  const {createdAt, id, title, description, type} = route.params;

  formValues.title = title;
  formValues.description = description;
  console.log(type);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: formValues.title,
      description: formValues.description,
    },
  });

  const imagePicker = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        setUri(response.assets[0].uri);
      }
    });
  };

  const onSubmit = data => {
    console.log(data);
    console.log(uri);
    data.uri = uri;
    console.log(data);
    if (type === 'update') {
      taskStore.updateTask(data);
    } else {
      taskStore.addTask(data);
    }
    let tasks = getTasks();
    console.log(tasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles['container-form']}>
        <View>
          <Text style={styles.label}>Título*</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
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
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles['input-textarea']}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={10}
              />
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
          <MaterialIcons.Button
            name="camera-alt"
            style={styles['button-camera-inside']}
            onPress={() => imagePicker()}
          />
        </View>
      </View>
      <View style={styles['container-actions']}>
        <View style={styles['button-container']}>
          <Button
            title="Salvar"
            color="green"
            onPress={handleSubmit(onSubmit)}
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
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 2,
  },
  'input-textarea': {
    margin: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    color: 'black',
    textAlignVertical: 'top',
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
    marginTop: 180,
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
  'button-camera-inside': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 0,
    paddingRight: -15,
  },
  'error-message': {
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TaskForm;
