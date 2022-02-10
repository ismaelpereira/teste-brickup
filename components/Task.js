/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {deleteTask, updateTask} from '../db/Realm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Task = ({id, createdAt, taskTitle, description}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {createdAt} - {taskTitle}
        </Text>
      </View>

      <View style={styles['container-buttons']}>
        <View style={styles.margin1}>
          <MaterialCommunityIcons.Button
            name="eye"
            style={styles['button-view']}
            onPress={() =>
              navigation.navigate('Details', {
                id: id,
                createdAt: createdAt,
                title: taskTitle,
                description: description,
              })
            }
          />
        </View>
        <View style={styles.margin1}>
          <MaterialCommunityIcons.Button
            name="pencil"
            style={styles['button-edit']}
            onPress={() =>
              navigation.navigate('Add', {
                id: id,
                createdAt: createdAt,
                title: taskTitle,
                description: description,
                type: 'update',
              })
            }
          />
        </View>
        <MaterialCommunityIcons.Button
          name="delete"
          style={styles['button-delete']}
          onPress={() => deleteTask(id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    padding: 5,
    backgroundColor: 'white',
  },

  'container-buttons': {
    display: 'flex',
    flexDirection: 'row',
  },

  margin1: {
    marginRight: 8,
  },

  'button-view': {
    backgroundColor: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 45,
    paddingRight: -5,
  },
  'button-edit': {
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: -5,
  },
  'button-delete': {
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: -5,
  },
});

export default Task;
