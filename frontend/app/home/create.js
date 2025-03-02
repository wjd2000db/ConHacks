// app/home/create.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// 성별 버튼 스타일 함수
const genderButtonStyle = (selectedGender, gender) => ({
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  borderWidth: 1,
  backgroundColor: selectedGender === gender ? '#28a745' : '#f0f0f0', // 선택된 경우 초록색 배경
  borderColor: selectedGender === gender ? '#28a745' : '#ccc', // 선택된 경우 초록색 테두리
});

export default function CreateMember() {
  const [selectedGender, setSelectedGender] = useState(null); // 선택된 성별
  const [name, setName] = useState(''); // 이름 입력값
  const router = useRouter();

  // 이름 입력 완료 시 다음 페이지로 이동
  const handleNameSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name.'); // 이름이 비어있을 경우 경고
      return;
    }
    if (!selectedGender) {
      Alert.alert('Error', 'Please select a gender.'); // 성별이 선택되지 않았을 경우 경고
      return;
    }
    router.push({
      pathname: '/home/birthday',
      params: { name, gender: selectedGender }, // 이름과 성별 데이터를 다음 페이지로 전달
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS에서 키보드 피하기
    >
      {/* 상단 여백 */}
      <View style={styles.topSpacer} />

      {/* 화면 제목 */}
      <Text style={styles.title}>Add New Member</Text>

      {/* 성별 선택 버튼 */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={genderButtonStyle(selectedGender, 'male')}
          onPress={() => setSelectedGender('male')}
        >
          <Text style={styles.genderButtonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={genderButtonStyle(selectedGender, 'female')}
          onPress={() => setSelectedGender('female')}
        >
          <Text style={styles.genderButtonText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={genderButtonStyle(selectedGender, 'other')}
          onPress={() => setSelectedGender('other')}
        >
          <Text style={styles.genderButtonText}>Other</Text>
        </TouchableOpacity>
      </View>

      {/* 이름 입력 필드 */}
      <View style={styles.inputContainer}>
        <View style={styles.nameInputWrapper}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name" // 플레이스홀더 추가
            placeholderTextColor="#aaa" // 연한 회색으로 설정
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus={true} // 자동으로 커서 활성화
            keyboardType="default" // 기본 키보드
            onSubmitEditing={handleNameSubmit} // "완료" 버튼 클릭 시 호출
            returnKeyType="next" // 키보드의 "완료" 버튼을 "다음"으로 변경
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  genderButtonText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  nameInputWrapper: {
    flexDirection: 'row', // "Name:"과 입력 필드를 가로로 나란히 배치
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, // "Name:"과 입력 필드 사이의 간격
  },
  input: {
    flex: 1, // 남은 공간을 차지하도록 설정
    height: 50, // 높이를 조금 더 크게 설정
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});