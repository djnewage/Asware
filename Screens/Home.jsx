import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/aswarelogoblue.png")}
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
