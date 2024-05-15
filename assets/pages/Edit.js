import React, { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image} from "react-native";
import { DirectLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../theme";
import firestore from '@react-native-firebase/firestore';

const Edit = ({route}) => {
  const {ID} = route.params;
  const [Post, setPost] = useState({
    judul: "",
    deskripsi: "",
    PostAt: ""
  });
  const handleChange = (key, value) => {
    setPost({
      ...Post,
      [key]: value,
    });
  };
  const navigation = useNavigation();
  useEffect(() => {
    const subscriber = firestore()
      .collection('post')
      .doc(ID)
      .onSnapshot(documentSnapshot => {
        const Post = documentSnapshot.data();
        setPost({
          judul: Post.judul,
          deskripsi: Post.deskripsi,
          PostAt: Post.PostAt,
        });
      });
    return () => subscriber();
  }, [ID]);
  const Update = async () => {
    await firestore().collection('post').doc(ID).update({
      judul: Post.judul,
      deskripsi: Post.deskripsi,
      PostAt: Post.PostAt,
    });
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <DirectLeft color='#1D60CC' variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <View style={styles.border}>
          <TextInput
            placeholder="Ada agenda apa nih?"
            value={Post.judul}
            onChangeText={text => handleChange("judul", text)}
            placeholderTextColor={colors.blue(0.6)}
            multiline
            style={styles.title}
          />
        </View>
        <View style={styles.borderDes}>
          <TextInput
            placeholder="Deskripsi"
            value={Post.deskripsi}
            onChangeText={text => handleChange("deskripsi", text)}
            placeholderTextColor={colors.blue(0.6)}
            multiline
            style={styles.title}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={Update}>
        <Text style={styles.buttonLabel}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    height: 52,
  },
  button: {
    backgroundColor: '#1D60CC',
    padding: 10,
    position: 'absolute',
    bottom: 40,
    right: 24,
    borderRadius: 15,
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType["Pjs-SemiBold"],
    color: '#FFFFFF',
  },
  label: {
    fontSize: 12,
    fontFamily: fontType["Pjs-ExtraLight"],
    color: '#1D60CC',
  },
  border: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.blue(0.4),
  },
  borderDes: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.blue(0.4),
    height: 300
  },
  title: {
    fontSize: 16,
    fontFamily: fontType["Pjs-SemiBold"],
    color: '#252525',
    padding: 0,
  },
  imageUpload: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.blue(0.4),
  }
});