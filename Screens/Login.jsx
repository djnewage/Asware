import React from "react";
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
          <TextInput style={styles.emailInput} label="Email" />
          <TextInput style={styles.width} label="Password" />
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
