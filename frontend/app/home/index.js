import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import HealthNews from "./news";
import Add from "./add";
import Member from "./member";
import { fetchMembers } from "../utils/route";
import useUserStore from "../useUserStore";

export default function Home() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMembers(user.id);
    } else {
      router.replace("/login");
    }
  }, [user]);

  const loadMembers = async (userId) => {
    setLoading(true);
    const membersData = await fetchMembers(userId);
    if (membersData) {
      setMembers(membersData);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: LOGO IMAGE */}

      <Text style={styles.appName}>MediSense</Text>
      <Text style={styles.news}>Health News of the Day</Text>
      <HealthNews />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        members.map((member) => <Member key={member.id} user={member} />)
      )}
      <Add />
      {/* <Button title="Logout" onPress={handleLogout} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 40,
  },
  news: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
