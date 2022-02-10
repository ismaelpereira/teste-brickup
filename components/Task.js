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

const Task = ({id, createdAt, taskTitle}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text>
          {createdAt}- {taskTitle}
        </Text>
      </View>

      <View style={styles['container-buttons']}>
        <View style={styles.margin1}>
          <Button
            title="Eye"
            color="lightgrey"
            onPress={() =>
              navigation.navigate('Details', {
                id: id,
                createdAt: createdAt,
                title: taskTitle,
              })
            }
          />
        </View>
        <View style={styles.margin1}>
          <Button title="Pencil" color="green" />
        </View>
        <Button title="Trash" color="red" />
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
});

export default Task;
