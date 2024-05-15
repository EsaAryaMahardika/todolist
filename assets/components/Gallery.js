import React, { useEffect, useState, useCallback } from "react";
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import { MoreSquare } from "iconsax-react-native";
import {fontType} from '../theme';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const GalleryTemplate = ({item}) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const navigation = useNavigation();
  const [thisPost, setthisPost] = useState(null);
  const toggleOverflow = () => {
    setIsOverflowed(!isOverflowed);
  };
  const Edit = () => {
    navigation.navigate('Edit', {ID:item.id})
  }
  const Delete = async () => {
    await firestore()
      .collection('post')
      .doc(item.id)
      .delete()
    if (thisPost?.image) {
      const image = storage().refFromURL(thisPost?.image);
      await image.delete();
    }
    setthisPost(null);
    navigation.navigate('Home');
  }
  return (
    <View style={Layout.box}>
      <View style={Layout.row}>
        <View>
          <Text style={Layout.name}>{item.judul}</Text>
          <Text style={Layout.caption}>{item.deskripsi}</Text>
          <Text style={Layout.date}>{item.PostAt}</Text>
        </View>
        <View style={Layout.more}>
          <TouchableOpacity onPress={toggleOverflow}>
            <View style={Layout.overflowButton}>
              <MoreSquare size="30" color="#1D60CC"/>
            </View>
          </TouchableOpacity>
          {isOverflowed && (
            <View style={Layout.overflow}>
              <TouchableOpacity style={Layout.choice} onPress={Delete}>
                <Text style={{ color:'red' }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Layout.choice} onPress={Edit}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const Gallery = () => {
  const [Post, setPost] = useState([]);
  const [fresh, setfresh] = useState(false);
  const onfresh = useCallback(() => {
    setfresh(true);
    setTimeout(() => {
      firestore()
        .collection('post')
        .onSnapshot(querySnapshot => {
          const posts = [];
          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setPost(posts);
        });
      setfresh(false);
    }, 1500);
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('post')
      .onSnapshot(querySnapshot => {
        const Posts = [];
        querySnapshot.forEach(documentSnapshot => {
          Posts.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setPost(Posts);
      });
    return () => subscriber();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={fresh} onRefresh={onfresh} />
      }
    >
      <Text style={Layout.header}>To Do List!</Text>
      {Post.map(item => (
        <GalleryTemplate key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};
export default Gallery;
const Layout = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  more: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  photo: {
    width: '100%',
    height: 175,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginVertical: 5,
  },
  box: {
    marginBottom: 5,
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
  date: {
    color: '#252525',
    fontSize: 12,
    fontFamily: fontType['Pjs-ExtraLight'],
  },
  header: {
    color: '#252525',
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    borderBottomWidth: 3,
    width: '50%',
    marginVertical: 20,
  },
  overflowButton: {
    paddingVertical: 15,
  },
  overflow: {
    width: 100,
    height: 70
  },
  choice: {
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
