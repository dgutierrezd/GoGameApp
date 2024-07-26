import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Colors from '../../utils/Colors';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {getLocalStorage, saveLocalStorage} from '../../utils/manageStorage';
import {AUTH_KEY} from '../../utils/constants';
import {styles} from './style';

const AuthScreen = () => {
  const [username, setUsername] = useState('');
  const [enabledFetch, setEnabledFetch] = useState(false);

  const navigation = useNavigation();

  const {data, isLoading} = useQuery({
    queryKey: ['fetchUserTodo'],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/todos/${username}`,
      );
      return response;
    },
    enabled: enabledFetch,
  });

  const handlePersisted = async () => {
    const authItem = await getLocalStorage(AUTH_KEY);
    if (authItem) {
      setUsername(authItem);
      setEnabledFetch(true);
    }
  };

  useEffect(() => {
    handlePersisted();
  }, []);

  useEffect(() => {
    if (data && username) {
      console.log('entra');
      saveLocalStorage(AUTH_KEY, username);
      setUsername('');
      navigation.navigate('ListScreen', {
        todos: data.data,
      });
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <Text style={styles.title}>To Do App</Text>
        <TextField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{marginVertical: 20}}
        />
        <Button
          text="Authenticate"
          disabled={!username}
          loading={isLoading}
          onPress={() => setEnabledFetch(true)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
