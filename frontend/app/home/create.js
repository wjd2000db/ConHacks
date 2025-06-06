import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { createMember } from '../utils/route';
import useUserStore from '../useUserStore'; 


const genderButtonStyle = (selectedGender, gender) => ({
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  borderWidth: 1,
  backgroundColor: selectedGender === gender ? '#63c3eb' : '#f0f0f0', 
  borderColor: selectedGender === gender ? '#63c3eb' : '#ccc', 
});

export default function CreateMember() {
  const [selectedGender, setSelectedGender] = useState(null); 
  const [name, setName] = useState(''); 
  const [birthday, setBirthday] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const router = useRouter();

  // 저장 버튼 클릭 시
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name.');
      return;
    }
    if (!selectedGender) {
      Alert.alert('Error', 'Please select a gender.');
      return;
    }
    if (!birthday) {
      Alert.alert('Error', 'Please select a birthday.');
      return;
    }

    // 모든 정보를 다음 페이지로 전달
    console.log({
      name,
      gender: selectedGender,
      medications: [] 
    });
    
    Alert.alert('Success', 'Member added successfully!', [
      { text: 'OK', onPress: () => router.push('/home') },
    ]);
  };


  const handleCancel = () => {
    Alert.alert('Confirm', 'Are you sure you want to cancel?', [
      { text: 'No', style: 'cancel' }, 
      { text: 'Yes', onPress: () => router.push('/home') }, 
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.topSpacer} />

 
        <Text style={styles.title}>Add New Member</Text>


        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.genderButtons}>
            <TouchableOpacity
              style={genderButtonStyle(selectedGender, "male")}
              onPress={() => setSelectedGender("male")}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={genderButtonStyle(selectedGender, "female")}
              onPress={() => setSelectedGender("female")}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={genderButtonStyle(selectedGender, "other")}
              onPress={() => setSelectedGender("other")}
            >
              <Text style={styles.genderButtonText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 이름 입력 필드 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus={true}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>

        {/* 생년월일 선택 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birthday:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.birthdayText}>
              {birthday.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setBirthday(selectedDate);
                }
              }}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  topSpacer: {
    height: 40, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  genderContainer: {
    marginBottom: 30,
  },
  genderButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  genderButtonText: {
    fontSize: 16,
    color: "#000",
  },
  birthdayText: {
    fontSize: 16,
    color: "#000",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc', 
  },
  saveButton: {
    backgroundColor: '#63c3eb', 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
