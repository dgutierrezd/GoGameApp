import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Colors from '../../utils/Colors';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {ToDoInterface} from '../../interfaces/todo';
import {styles} from './style';

interface ToDoItemProps {
  item: ToDoInterface;
  setTodos: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
  todos: ToDoInterface[];
}

const ToDoItem = ({item, setTodos, todos}: ToDoItemProps) => {
  const [isCompleted, setIsCompleted] = useState(item.completed);

  const itemOpacity = useSharedValue(1);

  const fadeOut = () => {
    itemOpacity.value = withTiming(0, {
      duration: 1000,
      easing: Easing.linear,
    });
    setTimeout(() => {
      const newTodos = todos?.filter(t => t.id !== item.id);
      setTodos(newTodos);
    }, 1200);
  };

  const onComplete = () => {
    mutate();
    setIsCompleted(!isCompleted);
    fadeOut();
  };

  const itemStyle = useAnimatedStyle(() => ({
    opacity: itemOpacity.value,
  }));

  const {mutate} = useMutation({
    mutationFn: () => {
      return axios.put(`http://localhost:3000/api/todos/${item.id}`, {
        completed: true,
      });
    },
  });

  return (
    <Animated.View style={[styles.container, itemStyle]}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={1}>{item.description}</Text>
      </View>
      <Pressable style={{padding: 10}} onPress={onComplete}>
        <View
          style={[
            styles.radioButton,
            {backgroundColor: isCompleted ? 'green' : 'white'},
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};

export default ToDoItem;
