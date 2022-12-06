import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-paper";
import { authentication } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const db = getFirestore();
  function RegisterUser() {
    try {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(
          authentication,
          email.trim(),
          password.trim()
        )
          .then((re) => {
            console.log("User has successfully logged in");
          })
          .then(async () => {
            await addDoc(collection(db, "users"), {
              firstName: firstName,
              lastName: lastName,
              email: email.toLowerCase().trim(),
              timeStamp: Date.now(),
            });
          });
      } else {
        console.log("passwords did not match");
      }
    } catch (error) {
      console.error(error);
    }
    // try {
    //   if (password === confirmPassword) {
    //     createUserWithEmailAndPassword(
    //       authentication,
    //       email.trim(),
    //       password.trim()
    //     )
    //       .then((re) => {
    //         console.log(re);
    //       })
    //       // .then(async ({ user }) => {
    //       //   await firestore().collection("users").doc(user.uid).set({
    //       //     id: user.uid,
    //       //     firstName: data.firstName,
    //       //     lastName: data.lastName,
    //       //     email: data.email.toLowerCase().trim(),
    //       //     //   isTestUser: __DEV__,
    //       //     //   timeStamp: Date.now(),
    //       //     //   hasOnboarded: false,
    //       //   });
    //       //   await analytics().logEvent("user_created");
    //       //   console.log("User account created & signed in!");
    //       // })
    //       .catch((error) => {
    //         if (error.code === "auth/email-already-in-use") {
    //           console.log("That email address is already in use!", error);
    //         }
    //         if (error.code === "auth/invalid-email") {
    //           console.log("That email address is invalid!", error);
    //         }
    //       });
    //   } else {
    //     setError("passwordConfirmed", { msg: "Passwords don't match" });
    //   }
    // } catch (err) {
    //   console.error(err.code);
    // }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/aswarelogoblue.png")}
        />
      </View>
      <View>
        <TextInput
          style={styles.emailInput}
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.emailInput}
          label="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
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
        <TextInput
          style={styles.width}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <View>
        <Button title="Create Account" onPress={RegisterUser} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    // top: 50,
  },
  textContainer: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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
