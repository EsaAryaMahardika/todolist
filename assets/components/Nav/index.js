import { StyleSheet, View } from 'react-native';
import React from 'react';
import NavIcon from './NavIcon';

const Nav = ({ state, descriptors, navigation }) => {
    if (!state || !state.routes || state.routes.length === 0) {
        return null;
    }
    return (
        <View style={styles.navbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };
                return (
                    <NavIcon
                        key={index}
                        label={label}
                        isFocused={isFocused}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
};

export default Nav;

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#1D60CC',
        borderRadius: 20,
        height: 50,
        width: '50%',
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
    },
});
