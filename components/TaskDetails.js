/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const TaskDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params);

  const {createdAt, id, title} = route.params;

  console.log(createdAt);
  console.log(id);
  console.log(title);

  return (
    <View>
      <View>
        <Text>Details</Text>
      </View>
      <View>
        <Text>
          {createdAt} - {title}
        </Text>
      </View>
      <View>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default TaskDetails;
