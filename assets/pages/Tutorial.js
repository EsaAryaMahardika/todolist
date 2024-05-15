import React from 'react';
import {StyleSheet, View, ScrollView, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {DirectLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType} from '../theme';
import {TutorialData} from '../../content';
const TutorialTemplate = ({item}) => {
    return (
        <View style={style.box}>
            <ImageBackground source={item.image} style={style.image}>
                <View style={style.column}>
                    <Text style={style.name}>{item.title}</Text>
                    <View style={style.button}>
                        <Text style={style.caption}>Learn it</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
const Tutorial = () => {
    const navigation = useNavigation();
    const goMain = () => {
        navigation.navigate('Main');
    };
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={style.title}>Tutorial</Text>
                </View>
                {TutorialData.map(item => (
                    <TutorialTemplate key={item.id} item={item} />
                ))}
            </ScrollView>
            <TouchableOpacity style={style.header} onPress={goMain}>
                <DirectLeft size="20" color="#FFFFFF"/>
            </TouchableOpacity>
        </View>
    );
  };
export default Tutorial;
const style = StyleSheet.create({
    column: {
        alignItems: 'flex-end',
        padding: 20,
    },
    header : {
        backgroundColor: '#1D60CC',
        width: '15%',
        height : 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        top: 10,
        left: 10,
        position: 'absolute',
    },
    box: {
        margin: 15,
        width: '90%',
        height: 150,
    },
    name: {
        color: '#252525',
        fontSize: 20,
        fontFamily: fontType['Pjs-Bold'],
    },
    caption: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: fontType['Pjs-Light'],
    },
    title: {
        color: '#252525',
        fontSize: 24,
        fontFamily: fontType['Pjs-ExtraBold'],
        width: '45%',
        margin: 20,
    },
    button: {
        borderRadius: 10,
        width: 70,
        height: 30,
        backgroundColor: '#1D60CC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});
