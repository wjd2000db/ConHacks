import React from "react";
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


const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};


const getEmojiByGenderAndAge = (gender, dateOfBirth) => {
  const age = calculateAge(dateOfBirth);


  if (gender !== "male" && gender !== "female") {
    return "🌈";
  }

  if (age < 6) {

    return gender === "male" ? "👶♂️" : "👶♀️";
  } else if (age >= 6 && age <= 18) {

    return gender === "male" ? "👦" : "👧";
  } else {
   
    return gender === "male" ? "👨" : "👩";
  }
};

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

  // 이모티콘 가져오기
  const emoji = getEmojiByGenderAndAge(user.gender, user.dateOfBirth);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userInfoContainer}
        onPress={handleMedication}
      >
    
        <Text style={styles.emoji}>{emoji}</Text>

   
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {user.name}
          </Text>
          <Text style={styles.dob}>{user.dateOfBirth}</Text>
        </View>

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
    width: "95%",
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    height: 60,
    marginBottom:10
  },
  emoji: {
    fontSize: 24, 
    marginRight: 10, 
  },
  textContainer: {
    flex: 1,
    flexDirection: "row", 
    justifyContent: "space-between",
  },
  name: {
    fontSize: 22,
    fontWeight: "semibold",
    color: "#333",
  },
  dob: {
    fontSize: 16,
    color: "#555",
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
