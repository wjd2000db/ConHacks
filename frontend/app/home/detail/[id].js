import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useUserStore from "../../useUserStore";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { member } = useUserStore();

  // ID에 해당하는 멤버 찾기
  const user = member?.find((m) => m.id === id);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <Text style={styles.text}>User not found</Text>
      </View>
    );
  }

  // 알약 버튼 클릭 핸들러
  const handleMedicationPress = (medication) => {
    alert(`You clicked on the medication: ${medication}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}'s 💊</Text>
      {/* 사용자에게 알약이 있는지 확인하고, 있을 경우 버튼을 렌더링 */}
      {user.medications && user.medications.length > 0 ? (
        user.medications.map((med, index) => (
          <TouchableOpacity
            key={index}
            style={styles.medicationButton}
            onPress={() => handleMedicationPress(med)}
          >
            <Text style={styles.medicationText}>💊 {med}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.text}>No medications</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  medicationButton: {
    backgroundColor: "#4CAF50", // 버튼 배경 색상
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  medicationText: {
    fontSize: 16,
    color: "#fff", // 텍스트 색상
  },
});
