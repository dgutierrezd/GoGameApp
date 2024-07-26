import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import TextField from '../TextField';
import Button from '../Button';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {getLocalStorage} from '../../utils/manageStorage';
import {AUTH_KEY, MODAL_ADD_TODO} from '../../utils/constants';
import {ToDoInterface} from '../../interfaces/todo';
import {styles} from './style';

interface FormModalProps {
  setTodos: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
}

const FormModal = ({setTodos}: FormModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const username = getLocalStorage(AUTH_KEY);

  const {mutate, isPending, isSuccess, data} = useMutation({
    mutationFn: newTodo => {
      return axios.post('http://localhost:3000/api/todos', {
        title,
        description,
        completed: false,
        username: 'dgutierrezd',
      });
    },
  });

  const onSave = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setTodos(prev => [...prev, {...data.data}]);
      SheetManager.hide(MODAL_ADD_TODO);
    }
  }, [isSuccess]);

  return (
    <ActionSheet
      id={MODAL_ADD_TODO}
      statusBarTranslucent
      closeOnTouchBackdrop
      gestureEnabled
      defaultOverlayOpacity={0.6}
      containerStyle={styles.containerModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Create To Do</Text>
        <TextField
          placeholder="Title"
          style={{marginBottom: 10}}
          value={title}
          onChangeText={setTitle}
        />
        <TextField
          placeholder="Description"
          style={{marginBottom: 20}}
          value={description}
          onChangeText={setDescription}
        />
        <Button text="Save" onPress={onSave} loading={isPending} />
      </View>
    </ActionSheet>
  );
};

export default FormModal;
