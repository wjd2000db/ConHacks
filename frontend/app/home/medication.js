import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function Medication() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/home/create")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
  },
});
