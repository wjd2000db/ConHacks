import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getMedication } from "../../utils/route";
import useUserStore from "../../useUserStore";

const MedicationScreen = () => {
  const medication = useUserStore((state) => state.medication);

  const [purpose, setPurpose] = useState("");
  const [commonSideEffects, setCommonSideEffects] = useState("");
  const [seriousSideEffects, setSeriousSideEffects] = useState("");
  const [interactionWarnings, setInteractionWarnings] = useState("");

  useEffect(() => {
    const fetchMedicationData = async () => {
      if (!medication) return;

      try {
        const response = await getMedication(medication);
        if (response) {
          setPurpose(response.purpose || "No information available");
          setCommonSideEffects(response.common_sideeffects || "No information available");
          setSeriousSideEffects(response.serious_sideeffects || "No information available");
          setInteractionWarnings(response.interaction_warnings || "No information available");
        }
      } catch (error) {
        console.error("Error fetching medication:", error);
        setPurpose("Error fetching medication data");
      }
    };

    fetchMedicationData();
  }, [medication]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 {medication} 💊</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>📌 Purpose:</Text>
        <Text style={styles.value}>{purpose}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>⚠️ Common Side Effects:</Text>
        <Text style={styles.value}>{commonSideEffects}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>🚨 Serious Side Effects:</Text>
        <Text style={[styles.value, styles.warning]}>{seriousSideEffects}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>⚡ Interaction Warnings:</Text>
        <Text style={[styles.value, styles.caution]}>{interactionWarnings}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff", // Blue for section titles
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  warning: {
    color: "#dc3545", // Red for serious side effects
  },
  caution: {
    color: "#fd7e14", // Orange for interaction warnings
  },
});

export default MedicationScreen;
