import React from "react";
import { View, Image } from "react-native";

export const ProfileImage = ({ source, size }) => {
  const uploadIcon = require("../assets/upload.png");
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 1,
        borderStyle: "dotted",
      }}
    >
      <Image
        source={source ? { uri: source } : uploadIcon}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};
