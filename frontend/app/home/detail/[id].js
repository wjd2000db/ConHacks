import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import useUserStore from "../../useUserStore";
import { addMedicationToMember, createMedication } from "../../utils/route";
import { useRouter } from "expo-router";

export default function Detail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { member,setMedication } = useUserStore();

  const [newMedication, setNewMedication] = useState(""); // 새 약물 이름을 입력할 상태
  const [isAdding, setIsAdding] = useState(false); // 약물 추가 중 상태

  const user = member?.find((m) => m.id === id);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <Text style={styles.text}>User not found</Text>
      </View>
    );
  }

  const handleMedicationPress = (medication) => {
    setMedication(medication); 
    router.push("/home/detail/medication"); 
  };

  const handleAddMedication = async () => {
    if (!newMedication) {
      Alert.alert("Medication name is required.");
      return;
    }

    try {
      setIsAdding(true); 

      const createResponse = await createMedication(newMedication); 
      if (!createResponse) {
        throw new Error("Failed to create medication");
      }

      const addResponse = await addMedicationToMember(id, newMedication);
      if (addResponse) {
        Alert.alert("Medication added successfully!");
        setNewMedication(""); 
      }

    } catch (error) {
      console.error("Error adding medication:", error);
      Alert.alert("Failed to add medication.");
    } finally {
      setIsAdding(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}'s 💊</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Enter medication name"
        value={newMedication}
        onChangeText={setNewMedication}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddMedication}
        disabled={isAdding}
      >
        <Text style={styles.addButtonText}>
          {isAdding ? "Adding..." : "Add Medication"}
        </Text>
      </TouchableOpacity>
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
    backgroundColor:"#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1, 
    borderColor: "#2196F3", 
  },
  medicationText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 500,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#2196F3", 
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
