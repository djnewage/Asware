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
import { useForm, Controller } from "react-hook-form";
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  function LoginUser() {
    if (user && user.uid) {
      navigation.navigate("Home");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(async (error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrors({
            emailInUse: "That email address is already in use!",
          });
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/user-not-found") {
          setErrors({
            userNotFound: "This user does not exist please sign up",
          });
          console.log("This user does not exist");
        }

        if (error.code === "auth/invalid-email") {
          setErrors({ inValidEmail: "That email address is invalid!" });
          console.log("That email address is invalid!");
        }

        if (error.code === "auth/wrong-password") {
          setErrors({ authPassword: "Wrong email or password" });
        }
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
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <>
                <TextInput
                  style={styles.emailInput}
                  rules={{ required: true }}
                  label="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </>
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.emailInUse && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errors.emailInUse}
            </Text>
          )}
          <TextInput
            style={styles.emailInput}
            rules={{ required: true }}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {errors.authPassword && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errors.authPassword}
            </Text>
          )}
          {errors.required && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errors.required}
            </Text>
          )}
          {errors.userNotFound && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errors.userNotFound}
            </Text>
          )}
          {errors.inValidEmail && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errors.inValidEmail}
            </Text>
          )}
          <Button
            title="Login"
            onPress={() => {
              if (!email || !password) {
                setErrors({
                  required: "Email and password fields are required",
                });
              } else {
                LoginUser();
              }
            }}
          />
          <Button
            title="Don't have an account? Sign up"
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
