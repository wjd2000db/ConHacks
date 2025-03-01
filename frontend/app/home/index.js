// app/home.js
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import HealthNews from './news';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: LOGO IMAGE */}
      <Text style={styles.appName}>MediSense</Text>
      <Text style={styles.news}>Health News of the Day</Text>
      <HealthNews />
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 40
  },
  news: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});