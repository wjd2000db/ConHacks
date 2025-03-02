import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { createUser } from '../utils/route';

// 나이 계산 함수
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// 이모티콘 선택 함수
const getEmojiByGenderAndAge = (gender, dateOfBirth) => {
  const age = calculateAge(dateOfBirth);

  if (age < 6) {
    // 6세 이전
    return gender === "male" ? "👶♂️" : gender === "female" ? "👶♀️" : "🌈";
  } else if (age >= 6 && age <= 18) {
    // 5세 ~ 18세
    return gender === "male" ? "👦" : gender === "female" ? "👧" : "🌈";
  } else {
    // 18세 이상
    return gender === "male" ? "👨" : gender === "female" ? "👩" : "🌈";
  }
};

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [date, setDate] = useState(new Date()); // 날짜 상태
  const [showDatePicker, setShowDatePicker] = useState(false); // 달력 표시 여부

  const [gender, setGender] = useState("");
  const [isFemale, setFemale] = useState(false);
  const [isMale, setMale] = useState(false);
  const [isOthers, setOthers] = useState(false);

  const router = useRouter();

  // 날짜 변경 핸들러
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // 날짜 선택 후 달력 숨기기
  };

  // 회원가입 핸들러
  const handleSignUp = async () => {
    if (!email || 
        !password || 
        !confirmPassword || 
        !firstName || 
        !lastName || 
        !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await createUser({
        firstName,
        lastName,
        dateOfBirth: date.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
        gender,
        email,
      });

      Alert.alert('Welcome to MediSense', 'Account created successfully!');
      router.replace('/');
      
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // 성별 변경 핸들러
  const handleGenderChange = (gender) => {
    setFemale(gender === "female");
    setMale(gender === "male");
    setOthers(gender === "Others");

    setGender(gender);
  };

  // 이모티콘 가져오기
  const emoji = getEmojiByGenderAndAge(gender, date);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {/* 이름 입력 */}
      <TextInput
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      {/* 생년월일 선택 */}
      <TouchableOpacity
        style={styles.datePickerBox}
        onPress={() => setShowDatePicker(true)} // 달력 표시
      >
        <Text style={styles.dateLabel}>
          {emoji} {date.toISOString().split("T")[0]} {/* 이모티콘 + 선택된 날짜 표시 */}
        </Text>
      </TouchableOpacity>

      {/* 조건부로 달력 표시 */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* 성별 선택 */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>Gender</Text>

        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxRow}>
            <Checkbox
              value={isFemale}
              onValueChange={() => handleGenderChange("female")}
              color={isFemale ? "#0060bf" : undefined}
            />
            <Text style={styles.checkboxText}>Female</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={isMale}
              onValueChange={() => handleGenderChange("male")}
              color={isMale ? "#0060bf" : undefined}
            />
            <Text style={styles.checkboxText}>Male</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={isOthers}
              onValueChange={() => handleGenderChange("Others")}
              color={isOthers ? "#0060bf" : undefined}
            />
            <Text style={styles.checkboxText}>Others</Text>
          </View>
        </View>
      </View>

      {/* 이메일 및 비밀번호 입력 */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      {/* 회원가입 버튼 */}
      <Button title="Sign Up" onPress={handleSignUp} />

      {/* 로그인 링크 */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 13,
  },
  datePickerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 13,
    width: "100%",
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
  },
  loginText: {
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxText: {
    marginLeft: 5,
  },
});