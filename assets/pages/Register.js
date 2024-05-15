import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {colors, fontType} from '../theme';
import {Eye, EyeSlash} from 'iconsax-react-native';
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSignupDisabled, setSignupDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(60);
  const navigation = useNavigation();
  const handleRegister = async () => {
    let errorMessage = '';
    if (password !== confirmPassword) {
      errorMessage = 'Password dan konfirmasi password tidak cocok.';
    }
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }
    setLoading(true);
    await auth().createUserWithEmailAndPassword(email, password);
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set({
        fullName,
        email,
        photoUrl: `https://jefferson.rps205.com/uploaded/faculty/profile.png`,
        createdAt: new Date()
      })
    setLoading(false);
    navigation.navigate('Login');
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const updateSignupButtonStatus = () => {
    if (
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      setSignupDisabled(false);
    } else {
      setSignupDisabled(true);
    }
  };
  useEffect(() => {
    updateSignupButtonStatus();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setPaddingVertical(0);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingVertical(60);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fullName, email, password, confirmPassword]);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {paddingVertical}]}>
          <View>
            <Text style={styles.header}>Sign up</Text>
            <View style={styles.form}>
              <View>
                <View style={styles.field}>
                  <TextInput
                    placeholder="Enter Your Full Name"
                    placeholderTextColor={colors.grey(0.6)}
                    value={fullName}
                    onChangeText={text => {
                      setFullName(text);
                      updateSignupButtonStatus();
                    }}
                    style={styles.text}
                  />
                </View>
              </View>
              <View>
                <View style={styles.field}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={colors.grey(0.6)}
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                      updateSignupButtonStatus();
                    }}
                    inputMode="email"
                    keyboardType="email-address"
                    style={styles.text}
                  />
                </View>
              </View>
              <View>
                <View style={[styles.field,{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',gap: 10}]}>
                  <TextInput
                    placeholder="Enter password"
                    placeholderTextColor={colors.grey(0.6)}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      updateSignupButtonStatus();
                    }}
                    secureTextEntry={!passwordVisible}
                    style={[styles.text, {flex: 1}]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <EyeSlash variant="Linear" color={colors.grey(0.6)} size={20}/>
                    ) : (
                      <Eye variant="Linear" color={colors.grey(0.6)} size={20}/>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View style={[styles.field,{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',gap: 10}]}>
                  <TextInput
                    placeholder="Re-type password"
                    placeholderTextColor={colors.grey(0.6)}
                    value={confirmPassword}
                    onChangeText={text => {
                      setConfirmPassword(text);
                      updateSignupButtonStatus();
                    }}
                    secureTextEntry={!confirmPasswordVisible}
                    style={[styles.text, {flex: 1}]}
                  />
                  <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    {confirmPasswordVisible ? (
                      <EyeSlash variant="Linear" color={colors.grey(0.6)} size={20}/>
                    ) : (
                      <Eye variant="Linear" color={colors.grey(0.6)} size={20}/>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{gap: 10}}>
            <TouchableHighlight
              style={[
                styles.bfield,
                {
                  backgroundColor: isSignupDisabled
                    ? colors.blue(0.5)
                    : colors.blue(),
                },
              ]}
              underlayColor={colors.blue(0.9)}
              onPress={handleRegister}
              disabled={isSignupDisabled}>
              {loading ? (
                <ActivityIndicator color={colors.white()} />
              ) : (
                <Text style={styles.blabel}>SIGN UP</Text>
              )}
            </TouchableHighlight>
            <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
              <Text style={[styles.blabel, {color: colors.black()}]}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.blabel, {color: colors.blue()}]}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 32,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  form: {
    gap: 20,
  },
  label: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.grey(0.6),
    marginBottom: 5,
  },
  field: {
    backgroundColor: colors.grey(0.05),
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    paddingVertical: 0,
    color: colors.black(),
    fontFamily: fontType['Pjs-Regular'],
  },
  bfield: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  blabel: {
    color: colors.white(),
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
  },
});