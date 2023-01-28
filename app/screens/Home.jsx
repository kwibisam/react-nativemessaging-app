import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Image } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import CustomListItem from '../components/CustomListItem';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const authUser = auth.currentUser;
    if (authUser !== null) {
      setUser(authUser);
    }
    const unsubscribe = onSnapshot(
      collection(db, 'chats'),
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      },
      (error) => {
        alert(error.message);
      }
    );
    return unsubscribe;
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        alert('error signout', error);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Messenger',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',

      headerLeft: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={logOut}>
            <Avatar
              rounded
              source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
            />
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  console.log('USERS LOGGED', user.displayName);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName, //key and value are the same name
    });
  };
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default Home;
