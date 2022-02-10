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

  const {createdAt, id, title, description} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles['title-container']}>
        <Text style={styles.title}>
          {id} - {title}
        </Text>
        <Text style={styles.details}>{createdAt}</Text>
      </View>

      <View>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles['button-container']}>
        <Button
          title="Voltar"
          onPress={() => navigation.navigate('Home')}
          color={'grey'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  'title-container': {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    margin: 5,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 24,
    margin: 5,
  },
  description: {
    fontSize: 18,
    margin: 5,
  },
  'button-container': {
    marginTop: 500,
    marginLeft: 5,
    marginRight: 5,
  },
});
export default TaskDetails;
