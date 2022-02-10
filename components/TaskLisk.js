/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import Task from './Task';
import {useNavigation} from '@react-navigation/native';

const TaskList = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/*TaskCards*/}
      <View style={styles['tasks-container']}>
        <Task createdAt={'04/02/2022'} taskTitle={'Capina'} id={1} />
      </View>
      {/*AddNewTaskButton*/}
      <View style={styles['button-add-container']}>
        <Button
          title="Adicionar"
          color="grey"
          onPress={() => navigation.navigate('Add')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 5,
  },
  'tasks-container': {
    height: '90%',
  },

  'button-add-container': {
    margin: 5,
    textAlign: 'center',
  },
});

export default TaskList;
