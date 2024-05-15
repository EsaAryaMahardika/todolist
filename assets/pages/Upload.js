import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image} from "react-native";
import { DirectLeft, GalleryImport, Add } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../theme";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const Upload = () => {
  const [Post, setPost] = useState({
    judul: "",
    deskripsi: "",
    PostAt: "",
  });
  const Tanggal = () => {
    var Now = new Date();
    var date = Now.getDate();
    var month = Now.getMonth();
    var year = Now.getFullYear();
    var monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    var monthName = monthNames[month];
    return monthName + ' ' + date + ', ' + year;
  }
  const handleChange = (key, value) => {
    setPost({
      ...Post,
      [key]: value,
    });
  };
  const navigation = useNavigation();
  const UploadPost = async () => {
    await firestore().collection('post').add({
      judul: Post.judul,
      deskripsi: Post.deskripsi,
      PostAt: Tanggal(),
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
        <View style={styles.borderDashed}>
          <TextInput
            placeholder="Ada agenda apa nih?"
            value={Post.judul}
            onChangeText={(text) => handleChange("judul", text)}
            placeholderTextColor={colors.blue(0.6)}
            multiline
            style={styles.title}
          />
        </View>
        <View style={styles.borderDashedDes}>
          <TextInput
            placeholder="Deskripsi"
            value={Post.deskripsi}
            onChangeText={(text) => handleChange("deskripsi", text)}
            placeholderTextColor={colors.blue(0.6)}
            multiline
            style={styles.title}
          />
        </View>
      </ScrollView>
        <TouchableOpacity style={styles.button} onPress={UploadPost}>
            <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Upload;

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
  borderDashed: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.blue(0.4),
  },
  borderDashedDes: {
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