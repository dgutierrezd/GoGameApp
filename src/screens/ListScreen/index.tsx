import React, {useState} from 'react';
import {Button, FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import CustomButton from '../../components/Button';
import Colors from '../../utils/Colors';
import ToDoItem from '../../components/ToDoItem';
import FormModal from '../../components/FormModal';
import {MODAL_ADD_TODO} from '../../utils/constants';
import {SheetManager} from 'react-native-actions-sheet';
import {logOut} from '../../utils/manageStorage';
import {useNavigation} from '@react-navigation/native';
import {ToDoInterface} from '../../interfaces/todo';

const ListScreen = ({route}) => {
  const [todos, setTodos] = useState<ToDoInterface[]>(route.params?.todos);

  const navigation = useNavigation();

  const handleSignOut = () => {
    logOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthScreen'}],
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>To Do</Text>
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
        <FlatList
          contentContainerStyle={{height: '100%'}}
          data={todos?.filter(t => !t.completed)}
          keyExtractor={item => item.id?.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ToDoItem item={item} setTodos={setTodos} todos={todos} />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{width: '100%', height: 1, backgroundColor: Colors.gray}}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 100,
              }}>
              <Image
                source={require('../../assets/images/emptyState.jpg')}
                style={{width: 250, height: 250}}
              />
              <Text style={{fontWeight: '600', fontSize: 20}}>
                There are no items to do
              </Text>
              <Text>Add new items and complete them</Text>
            </View>
          )}
        />
      </View>
      <CustomButton
        text="Add item"
        style={{position: 'absolute', bottom: 40, left: 30, right: 30}}
        onPress={() => SheetManager.show(MODAL_ADD_TODO)}
      />
      <FormModal setTodos={setTodos} />
    </SafeAreaView>
  );
};

export default ListScreen;
