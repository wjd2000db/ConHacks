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

// 나이 계산 함수
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

// 이모티콘 선택 함수
const getEmojiByGenderAndAge = (gender, dateOfBirth) => {
  const age = calculateAge(dateOfBirth);

  if (age < 6) {
    // 6세 이전
    return gender === "male" ? "👶♂️" : gender === "female" ? "👶♀️" : "🌈";
  } else if (age >= 6 && age <= 18) {
    // 6세 ~ 18세
    return gender === "male" ? "👦" : gender === "female" ? "👧" : "🌈";
  } else {
    // 18세 이상
    return gender === "male" ? "👨" : gender === "female" ? "👩" : "🌈";
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
        {/* 이모티콘을 왼쪽 끝에 배치 */}
        <Text style={styles.emoji}>{emoji}</Text>

        {/* 이름과 생년월일을 flex로 배치, 이름은 한 줄로 표시 */}
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
    width: "90%",
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row", // 요소들을 가로로 배치
    alignItems: "center", // 세로 정렬
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    height: 80,
  },
  emoji: {
    fontSize: 24, // 이모티콘 크기
    marginRight: 10, // 텍스트와의 간격
  },
  textContainer: {
    flex: 1, // 나머지 공간을 차지하게 함
    flexDirection: "column", // 이름과 생년월일을 세로로 배치
    justifyContent: "center", // 텍스트를 세로로 가운데 정렬
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
