import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SignUpScreen from '../screens/SignUpScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginError, setLoginError] = useState(''); 

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/login', {
          name,
          password,
        });
        // Kiểm tra phản hồi
        if (response.status === 200) {
          navigation.navigate("Screen_01", { user: response.data.user });
      } else {
        setLoginError(response.data.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập: ", error);
      setLoginError('Có lỗi xảy ra, vui lòng thử lại!');
      setModalVisible(true);
    }
  };
  

  const toggleShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon}/>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo}/>
      </View>

      <Text style={styles.title}>Hello Again!</Text>
      <Text style={styles.subtitle}>Log into your account</Text>

      <View style={[styles.inputContainer, nameFocused && styles.inputContainerFocused]}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#aaa"
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          onChangeText={setName} // Cập nhật name
        />
      </View>

      <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword} // Cập nhật password
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="gray" style={styles.eyeIcon}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.forgotPassword}>No Account?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{loginError}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.orContainer}>
        <View style={styles.line}/>
        <Text style={styles.orText}>or</Text>
        <View style={styles.line}/>
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/google.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/face.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/apple.png')} style={styles.socialIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainerFocused: {
    borderColor: '#6C63FF',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    outlineWidth: 0,
  },
  eyeIcon: {
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#0ad4fa',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#0ad4fa',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    padding: 3,
  },
  socialIcon: {
    width: 50,
    height: 44,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#0ad4fa',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
