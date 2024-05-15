import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Edit } from "iconsax-react-native";
import {fontType} from '../theme';
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const More = () => {
    const logout = async () => {
          await auth().signOut();
          await AsyncStorage.removeItem('userData');
          navigation.replace('Login');
      };
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={require('../img/Profile/Profile.jpg')} style={styles.image}/>
                <Text style={styles.title}>Esa Mahardika</Text>
                <TouchableOpacity style={styles.logout} onPress={logout}>
                    <Text style={{ color:'#FFFFFF' }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.upload} onPress={() => navigation.navigate("Upload")}>
                <Edit color='#FFFFFF' variant="Linear" size={20} />
            </TouchableOpacity>
        </View>
    );
}
export default More;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: '#252525',
        fontSize: 24,
        fontFamily: fontType['Pjs-Bold'],
    },
    box: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '30%',
        height: 100,
        borderRadius: 50,
    },
    upload: {
        backgroundColor: '#1D60CC',
        padding: 15,
        position: 'absolute',
        bottom: 100,
        right: 24,
        borderRadius: 10,
    },
    logout: {
        margin: 10,
        padding: 10,
        backgroundColor: '#1D60CC',
        borderRadius: 15
    }
});