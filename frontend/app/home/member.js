import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../useUserStore";

export default function Member({ user }) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 });

  const handleIconPress = (event) => {
    const { pageY, pageX } = event.nativeEvent;
    setModalPosition({
      top: pageY + 20,
      left: pageX - 80,
    });
    setModalVisible(true);
  };

  const handleEdit = () => {
    setModalVisible(false);
    router.push({
      pathname: "home/edit",
      params: { name: user.name, dob: user.dob },
    });
  };

  const handleMedication = () => {
    router.push(`/home/detail/${user.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userInfoContainer}
        onPress={handleMedication}
      >
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.dob}>{user.dateOfBirth}</Text>

        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.modalBackdrop,
            { top: modalPosition.top, left: modalPosition.left },
          ]}
        >
          <View style={styles.modalContent}>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    height: 80,
  },
  name: {
    fontSize: 22,
    fontWeight: "semibold",
    color: "#333",
    flex: 1,
  },
  dob: {
    fontSize: 16,
    color: "#555",
    marginLeft: 100,
  },
  modalBackdrop: {
    position: "absolute",
    padding: 10,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: 100,
    alignItems: "center",
  },
});
