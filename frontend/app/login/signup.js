import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const [gender, setGender] = useState('');
  const [isFemale, setFemale] = useState(false);
  const [isMale, setMale] = useState(false);

  const router = useRouter();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGenderChange = (gender) => {
    setFemale(gender === 'female');
    setMale(gender === 'male');
    setGender(gender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <View style={styles.datePickerContainer}>
        <View style={styles.datePickerBox}>
          <Text style={styles.dateLabel}>Date of Birth</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox 
            value={isFemale}
            onValueChange={() => handleGenderChange('female')}
            color={isFemale ? '#0060bf' : undefined}
          />
          <Text style={styles.checkboxText}>Female</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox 
            value={isMale}
            onValueChange={() => handleGenderChange('male')}
            color={isMale ? '#0060bf' : undefined}
          />
          <Text style={styles.checkboxText}>Male</Text>
        </View>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      
      <Button title="Sign Up" onPress={handleSignUp} />

      <TouchableOpacity onPress={() => router.push('/login')}>
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
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateLabel: {
    marginRight: 10,
  },
  datePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  loginText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20,
  },
  checkboxText: {
    marginLeft: 10,
  },
});
