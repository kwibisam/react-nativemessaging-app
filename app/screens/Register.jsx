import { Button, Input, Text } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            alert('profile created');
          })
          .catch((error) => {
            console.log(error);
            alert('error creating profile', error);
          });
      })
      .catch((error) => {
        alert('error', error.message);
      });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create your Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          textContentType="name"
          placeholder="username"
          autoFocus={true}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          textContentType="emailAddress"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="register"
        raised
        onPress={register}
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default Register;
