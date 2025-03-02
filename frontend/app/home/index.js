import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  View, // Added View wrapper for members to handle styling
} from "react-native";
import { useRouter } from "expo-router";
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
  const { user, setUser, setMember } = useUserStore();
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
      setMember(membersData);
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
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.news}>Health News of the Day</Text>
      <HealthNews />

      {/* Wrap members list with ScrollView */}
      <ScrollView style={styles.membersList}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          members.map((member) => (
            <View key={member.id} style={styles.memberWrapper}>
              <Member user={member} style={styles.member} />
            </View>
          ))
        )}
      </ScrollView>

      <Add />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  news: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  membersList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10, // Add padding to ensure no content is cut off
  },
  memberWrapper: {
    width: "100%", // Ensure member takes up the full width
    paddingVertical: 5, // Add vertical spacing between members
  },
  member: {
    width: "100%", // Ensure member takes up full available width
    marginBottom: 10, 
  },
});
