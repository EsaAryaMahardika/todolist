import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Home2, User, More} from 'iconsax-react-native';
const NavIcon = ({ isFocused, onPress, label }) => {
  const Icon = () => {
    if (label === "Home") return isFocused ? <View style={styles.selected}><Home2 color='#FFFFFF' size={18} /></View> : <Home2 color='#252525' size={20} />
    if (label === "Profile") return isFocused ? <View style={styles.selected}><User color='#FFFFFF' size={18} /></View> : <User color='#252525' size={20} />
    if (label === "More") return isFocused ? <View style={styles.selected}><More color='#FFFFFF' size={18} /></View> : <More color='#252525' size={20} />
    return <Home2 />
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon />
    </TouchableOpacity>
  )
}
export default NavIcon
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    padding: 2,
    backgroundColor: '#143b85',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 10,
  },
})