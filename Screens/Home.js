import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, complete } = doc.data();
        todos.push({
          id: doc.id,
          heading,
          complete,
        });
      });
      setTodos(todos);
    });
    return () => unsubscribe();
  }, []);

  const deleteTodo = (todo) => {
    todoRef
      .doc(todo.id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Bạn đã xóa thành công!',
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        complete: false,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();

          Toast.show({
            type: 'success',
            text1: 'Bạn đã thêm thành công!',
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const toggleComplete = (todo) => {
    todoRef
      .doc(todo.id)
      .update({
        complete: !todo.complete,
      })
      .then(() => {
        // Handle completion
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Todo" />
      </Appbar.Header>
      
      <FlatList
        style={{}}
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            
          </View>
        )}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        
      </View >
      <View>
      <Pressable style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 45,
    flex: 0.75
  },
  itemHeading: {
    fontWeight: 'bold',
    alignItems: "centre",
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 50,
    // flex:1,
    borderRadius: 5,
    backgroundColor: 'green',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  Icon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 10,
    flex:0.15
  },
  deleteIcon: {
    marginTop: 5,
    fontSize: 20,
    flex:0.1,
    // marginLeft: 5,
  },
});

export default Home;
