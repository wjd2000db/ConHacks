import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import useUserStore from '../../useUserStore';

export default function Detail() {
  const { id } = useLocalSearchParams(); 
  const { member } = useUserStore(); 

  const user = member?.find((m) => m.id === id);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <Text style={styles.text}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}'s 💊</Text>
      {user.medications?.length > 0 ? (
        user.medications.map((med, index) => (
          <Text key={index} style={styles.medicationText}>
            💊{med}
          </Text>
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
  medicationText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
