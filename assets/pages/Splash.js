import React,{useEffect} from 'react';
import {View, Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const {userToken, expirationTime} = userData;
        if (userToken && expirationTime) {
          const currentTime = new Date().getTime();
          if (currentTime <= expirationTime) {
            setTimeout(() => {
              navigation.replace('Main');
            }, 1000);
          } else {
            setTimeout(() => {
              navigation.replace('Login');
            }, 1000);
          }
        } else {
          setTimeout(() => {
            navigation.replace('Login');
          }, 1000);
        }
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      }
  };
  return (
    <View style={{ justifyContent: 'center',alignSelf: 'center' }}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/694/694693.png' }} height={100} width={100}/>
    </View>
  );
};
export default Splash;