import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function LoginUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/aswarelogoblue.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.emailInput}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            title="Login"
            onPress={() => {
              LoginUser();
              navigation.navigate("Home");
            }}
          />
          <Button
            title="Dont have an account sign up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    top: 50,
  },
  textContainer: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    top: 200,
  },
  emailInput: {
    marginBottom: 10,
  },
  logo: {
    height: 80,
    width: 300,
  },
});
