import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, getFirestore, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-paper";
import { authentication, storage, firebase } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ProfileImage } from "../components/ProfileImage";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const db = getFirestore();

  const uploadImage = async (user) => {
    const storage = getStorage();
    const storageRef = ref(storage, `${user.user.uid}/ProfileImg`);
    const img = await fetch(image);
    const bytes = await img.blob();
    const data = await uploadBytes(storageRef, bytes);
    console.log("test data:", data);
  };

  const getImage = async (user) => {
    try {
      const storage = getStorage();
      const url = await getDownloadURL(
        ref(storage, `${user.user.uid}/ProfileImg`)
      );

      return url;
    } catch (error) {
      console.log(error);
    }
  };

  function RegisterUser() {
    try {
      if (
        !password ||
        !firstName ||
        !lastName ||
        !email ||
        !image ||
        !confirmPassword
      ) {
        setErrors({ allFieldsAreRequired: "All Fields Are Required" });
      }
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(
          authentication,
          email.trim(),
          password.trim()
        )
          .then(async (user) => {
            await uploadImage(user);
            const url = await getImage(user);
            await setDoc(doc(db, "users", user.user.uid), {
              firstName: firstName,
              lastName: lastName,
              email: email.toLowerCase().trim(),
              image: url,
              timeStamp: Date.now(),
            });
          })
          .then((re) => {
            navigation.navigate("Home");
            console.log("User has successfully logged in");
          });
      } else {
        setErrors({ passwordsDoNotMatch: "Passwords did not match " });
        console.log("passwords did not match");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.canceled) {
      try {
        await setImage(result.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={pickImage}>
          <ProfileImage source={image} size={100} />
        </TouchableOpacity>
        <Text>Upload photo</Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/aswarelogoblue.png")}
        />
      </View> */}
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
        {errors.allFieldsAreRequired && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {errors.allFieldsAreRequired}
          </Text>
        )}
        {errors.passwordsDoNotMatch && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {errors.passwordsDoNotMatch}
          </Text>
        )}
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
    display: "flex",
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
