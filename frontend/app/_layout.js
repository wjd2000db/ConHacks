// app/_layout.js
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Authenticated User
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="/home" options={{ headerShown: false }}/>
      <Stack.Screen name="/home/create" options={{ headerShown: false }}/>
      <Stack.Screen name="/home/edit" options={{title: 'Edit User'}}/>
      <Stack.Screen name="/home/medication" options={{ headerShown: false }}/>

      <Stack.Screen name="/login/index" options={{ headerShown: false }} />
      <Stack.Screen name="/login/signup" options={{ headerShown: false }} />

    </Stack>
  );
}
