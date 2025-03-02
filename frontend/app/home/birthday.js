// app/home/birthday.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useRouter, useSearchParams } from 'expo-router';

export default function Birthday() {
  const { name, gender } = useSearchParams(); // 이전 페이지에서 전달된 이름과 성별 데이터
  const [birthday, setBirthday] = useState(new Date()); // 선택된 생년월일 (초기값: 현재 날짜)
  const router = useRouter();

  // 저장 버튼 클릭 시
  const handleSave = () => {
    if (!birthday) {
      Alert.alert('Error', 'Please select a birthday.'); // 생년월일이 비어있을 경우 경고
      return;
    }
    console.log('Name:', name);
    console.log('Gender:', gender);
    console.log('Birthday:', birthday.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 출력
    Alert.alert('Success', 'Member added successfully!', [
      { text: 'OK', onPress: () => router.push('/home') }, // 확인 후 홈 화면으로 이동
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 상단 여백 */}
      <View style={styles.topSpacer} />

      {/* 화면 제목 */}
      <Text style={styles.title}>Add New Member</Text>

      {/* 이름과 성별 표시 */}
      <Text style={styles.subTitle}>Name: {name}</Text>
      <Text style={styles.subTitle}>Gender: {gender}</Text>

      {/* 달력 */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Birthday:</Text>
        <DatePicker
          date={birthday}
          onDateChange={setBirthday}
          mode="date"
          androidVariant="nativeAndroid"
          style={styles.datePicker}
        />
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        {/* Return 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.returnButton]}
          onPress={() => router.back()} // 이전 화면으로 돌아가기
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>

        {/* Save 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topSpacer: {
    height: 40, // 상단 여백 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  datePickerContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  returnButton: {
    backgroundColor: '#ccc', // 회색 배경
  },
  saveButton: {
    backgroundColor: '#28a745', // 초록색 배경
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});