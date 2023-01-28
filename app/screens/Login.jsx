import { Image, Input, Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { auth } from '../firebase';
function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../../assets/app-logo.png')}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />

      <View style={styles.inputContainer}>
        <Input
          textContentType="emailAddress"
          placeholder="email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          textContentType="password"
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button title="login" containerStyle={styles.button} onPress={signIn} />
      <Button
        title="register"
        type="outline"
        containerStyle={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      />
      <View style={{ height: 100 }}></View>
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
    marginTop: 10,
    width: 200,
  },
});
export default Login;
