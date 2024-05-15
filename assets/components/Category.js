/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {fontType, colors} from '../theme';
import {CategoryData} from '../../content';
// Membuat Template Category
const CategoryTemplate = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity style={[{backgroundColor: backgroundColor}, category.item]} onPress={onPress}>
      <Text style={[{color: textColor}, category.title]}>{item.categoryName}</Text>
    </TouchableOpacity>
  );
};
// Data untuk Category dan perubahan style ketika ditekan
const Category = () => {
  const [selectedId, setSelectedId] = useState();
  return (
    <View style={category.item}>
      {CategoryData.map(item => {
        const backgroundColor = item.id === selectedId ? colors.blue(0.3) : '#FFFFFF';
        const color = item.id === selectedId ? '#252525' : '#1D60CC';
        return (
          <CategoryTemplate
            key={item.id}
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      })}
    </View>
  );
};
// Menjalankan seluruh file Category.js
export default Category;
// Style seluruh file ini
const category = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
  },
});
