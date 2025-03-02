import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';  

export default function Member({user}) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false); 
  const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 }); 

  const handleIconPress = (event) => {
    const { pageY, pageX } = event.nativeEvent;
    setModalPosition({
      top: pageY + 20,  
      left: pageX - 80, 
    });
    setModalVisible(true);
  };
  const handleEdit = () => {
    setModalVisible(false);
    router.push({
      pathname: '/home/edit', // 절대 경로 사용
      params: {
        name: user?.name || 'Unknown',
        dob: user?.dob || new Date().toISOString().split('T')[0], // 기본값으로 오늘 날짜 사용
        gender: user?.gender || 'other', // 기본값으로 'other' 사용
      },
    });
  };

  const handleMedication = () => {
    router.push({
      pathname: '/home/medication',
      params: { name: user.name },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleMedication}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{user.name}</Text> 
        <Text style={styles.dob}>{user.dateOfBirth}</Text>

        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalBackdrop, { top: modalPosition.top, left: modalPosition.left }]}>
          <View style={styles.modalContent}>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 80,
  },
  name: {
    fontSize: 22,
    fontWeight: 'semibold',
    color: '#333',
    padding: 10,
  },
  dob: {
    fontSize: 16,
    color: '#555',
    marginLeft: 100,
  },
  modalBackdrop: {
    position: 'absolute',
    padding: 10,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    width: 100,
    alignItems: 'center',
  },
});
