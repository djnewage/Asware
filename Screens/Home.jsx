import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";

export default function Home() {
  const [data, setData] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const storage = getStorage();
  const auth = getAuth();
  const db = getFirestore();

  const handleUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setPdfs([...pdfs, file]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("Users:", user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setData(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        // User is signed out
        // ...
      }
    });
  }, [auth]);

  console.log("+++++++", data);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/aswarelogoblue.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>
            Welcome, {data.firstName}, {data.lastName}{" "}
          </Text>
        </View>
        <View>
          <FlatList
            data={pdfs}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
            keyExtractor={(item) => item.uri}
          />
          <TouchableOpacity onPress={handleUpload}>
            <Image source={require("../assets/upload.png")} />
          </TouchableOpacity>
        </View>
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
