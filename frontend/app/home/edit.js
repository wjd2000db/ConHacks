import { useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function EditPage() {
  const router = useRouter();
  const { name, dob } = useLocalSearchParams();

  if (!name || !dob) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Edit Page</Text>
      <Text>Name: {name}</Text>
      <Text>Date of Birth: {dob}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
