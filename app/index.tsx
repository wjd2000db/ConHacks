import { Text, View } from "react-native";
import '../global.css'
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUDGgwxh9E2rPfxUw_o4X-Qcbbb6L8TdE",
  authDomain: "conhacks-47acb.firebaseapp.com",
  projectId: "conhacks-47acb",
  storageBucket: "conhacks-47acb.firebasestorage.app",
  messagingSenderId: "211651582321",
  appId: "1:211651582321:web:7da6f0526a39598f5cfed0"
};

const app = initializeApp(firebaseConfig);

export default function Index() {


  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <View className="w-50 h-10 bg-blue-500 justify-center items-center">
        <Text className="text-white text-lg">Welcome to Conhacks!</Text>
      </View>
    </View>
  );
}
