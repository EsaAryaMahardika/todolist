/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import {DirectLeft, Heart} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType} from '../theme';
import {BeachData} from '../../content';
const BeachTemplate = ({item, onPress, variant}) => {
    return (
        <View style={style.box}>
            <Image style={style.photo} source={item.image} />
            <View style={style.row}>
                <View style={style.column}>
                    <Text style={style.name}>{item.location}</Text>
                    <Text style={style.caption}>{item.difficult}</Text>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Heart size="32" color="#1D60CC" variant={variant}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Beach = () => {
    const [selectedId, setSelectedId] = useState();
    const navigation = useNavigation();
    const goMain = () => {
        navigation.navigate('Main');
    };
    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={style.title}>Best Beach</Text>
            </View>
                {BeachData.map(item => {
                    const variant = item.id === selectedId ? 'Bold' : 'Linear';
                    return (
                        <BeachTemplate
                            key={item.id}
                            item={item}
                            onPress={() => setSelectedId(item.id)}
                            variant={variant}
                        />
                    );
                })}
            </ScrollView>
            <TouchableOpacity style={style.header} onPress={goMain}>
                <DirectLeft size="20" color="#FFFFFF"/>
            </TouchableOpacity>
        </View>
    );
};
export default Beach;
const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
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
    photo: {
        width: '100%',
        height: 175,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        marginVertical: 5,
      },
    box: {
        marginBottom: 10,
        marginHorizontal: 20,
    },
    name: {
        color: '#252525',
        fontSize: 20,
        fontFamily: fontType['Pjs-Bold'],
    },
    caption: {
        color: '#252525',
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
});
