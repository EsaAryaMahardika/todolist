/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import {DirectLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType} from '../theme';
import {BoardData} from '../../content';
const BoardTemplate = ({item}) => {
    return (
        <View style={style.box}>
            <View style={style.row}>
                <Image style={style.photo} source={item.image} />
                <View style={style.column}>
                    <Text style={style.name}>{item.title}</Text>
                    <Text style={style.caption}>{item.descript}</Text>
                </View>
            </View>
        </View>
    );
};
const Board = () => {
    const navigation = useNavigation();
    const goMain = () => {
        navigation.navigate('Main');
    };
    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={style.title}>Board List</Text>
            </View>
                {BoardData.map(item => {
                    return (
                        <BoardTemplate
                            key={item.id}
                            item={item}
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
export default Board;
const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        width: '30%',
        height: 100,
        marginVertical: 15,
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
