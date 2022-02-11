/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import Task from './Task';
import {useNavigation} from '@react-navigation/native';
import {getTasks} from '../db/Realm';
import {Observer} from 'mobx-react';
import {taskStore} from '../db/Storage';

const TaskList = () => {
  const navigation = useNavigation();
  const tasks = getTasks();
  console.log(tasks);

  // const list = (
  //   <Observer>
  //     {() => {
  //       taskStore.tasks.map((task, i) => (
  //         <View style={styles['tasks-container']}>
  //           <Task
  //             createdAt={task.createdAt.toLocaleString('pt-BR')}
  //             taskTitle={task.title}
  //             description={task.description}
  //             id={task._id}
  //             uri={task.uri}
  //             key={i}
  //           />
  //         </View>
  //       ));
  //     }}
  //     );
  //   </Observer>
  // );
  return (
    <View style={styles.container}>
      <Observer>
        {() => {
          taskStore.tasks.map((task, i) => (
            <View style={styles['tasks-container']} key={i}>
              <Task
                createdAt={task.createdAt.toLocaleString('pt-BR')}
                taskTitle={task.title}
                description={task.description}
                id={task._id}
                uri={task.uri}
                key={i}
              />
            </View>
          ));
        }}
        );
      </Observer>
      <View style={styles['button-add-container']}>
        <Button
          title="Adicionar"
          color="grey"
          onPress={() =>
            navigation.navigate('Add', {
              type: 'create',
            })
          }
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
    marginBottom: 5,
  },

  'button-add-container': {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    width: '100%',
  },
});

export default TaskList;
