import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from '@rneui/base';
import { async } from '@firebase/util';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
function AddChat({ navigation }) {
  const [input, setInput] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add new chat',
    });
  }, [navigation]);

  const createChat = async () => {
    const docRef = await addDoc(collection(db, 'chats'), {
      chatName: input,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="enter a chat name "
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Button title="create new chat" onPress={createChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});

export default AddChat;
