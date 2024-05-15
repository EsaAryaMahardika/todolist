import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {fontType} from '../theme';
const More = () => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.box}>
                <Text style={styles.title}>About</Text>
            </TouchableOpacity>
        </View>
    );
}
export default More;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        color: '#252525',
        fontSize: 18,
        fontFamily: fontType['Pjs-Bold'],
    },
    box: {
        width: '100%',
        height: 50,
        padding: 10,
        justifyContent: 'center',
        borderColor: '#58626C',
        borderWidth: 1,
    }
})