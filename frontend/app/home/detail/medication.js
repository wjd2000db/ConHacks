import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createMedication } from "../../utils/route";

const MedicationScreen = () => {
  const [mediName, setMediName] = useState(""); 
  const [purpose, setPurpose] = useState(""); 
  const [commonSideEffects, setCommonSideEffects] = useState(""); 
  const [seriousSideEffects, setSeriousSideEffects] = useState(""); 
  const [interactionWarnings, setInteractionWarnings] = useState(""); 
  const [respon, setRespon] = useState(""); 

  const handleSubmit = async () => {
    try {
      const response = await createMedication(mediName); // 약 이름만 보내기
      setRespon(response);
      if (response) {
        // 응답에서 각 데이터를 추출하여 상태로 설정
        setPurpose(response.purpose || "");
        setCommonSideEffects(response.common_sideeffects || "");
        setSeriousSideEffects(response.serious_sideeffects || "");
        setInteractionWarnings(response.interaction_warnings || "");
      }
    } catch (error) {
      console.error("Error submitting medication:", error);
      setPurpose("Error creating medication");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medication</Text>
      {/* Ensure the response is a string or extract string data from the object */}
      <Text>{JSON.stringify(respon)}</Text>  {/* You can stringify the whole response object to check it */}
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={mediName}
        onChangeText={setMediName}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {/* 응답 메시지들 각각 출력, ensure these are strings */}
      <Text style={styles.responseMessage}>{String(purpose)}</Text>
      <Text style={styles.responseMessage}>{String(commonSideEffects)}</Text>
      <Text style={styles.responseMessage}>{String(seriousSideEffects)}</Text>
      <Text style={styles.responseMessage}>{String(interactionWarnings)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  responseMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
});

export default MedicationScreen;
