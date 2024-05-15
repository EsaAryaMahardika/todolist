import React, { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image} from "react-native";
import { DirectLeft, GalleryImport, Add } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../theme";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Edit = ({route}) => {
  const {ID} = route.params;
  const [Post, setPost] = useState({
    name: "",
    image: "",
    location: "",
    PostAt: ""
  });
  const handleChange = (key, value) => {
    setPost({
      ...Post,
      [key]: value,
    });
  };
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [PrevImg, setPrevImg] = useState(null);
  useEffect(() => {
    const subscriber = firestore()
      .collection('post')
      .doc(ID)
      .onSnapshot(documentSnapshot => {
        const Post = documentSnapshot.data();
        setPost({
          name: Post.name,
          image: Post.image,
          location: Post.location,
          PostAt: Post.PostAt,
        });
        setPrevImg(Post.image);
        setImage(Post.image);
      });
    return () => subscriber();
  }, [ID]);
  const UploadImg = async () => {
    ImagePicker.openPicker()
      .then(image => {
        setImage(image.path);
      })
  };
  const Update = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    filename = Date.now() + '.' + extension;
    const reference = storage().ref(`blogimages/${filename}`);
    if (image !== PrevImg && PrevImg) {
      const PrevImage = storage().refFromURL(PrevImg);
      await PrevImage.delete();
    }
    if (image !== PrevImg) {
      await reference.putFile(image);
    }
    const url = image !== PrevImg ? await reference.getDownloadURL() : PrevImg;
    await firestore().collection('post').doc(ID).update({
      name: Post.name,
      image: url,
      location: Post.location,
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
            placeholder="Location"
            value={Post.location}
            onChangeText={text => handleChange("location", text)}
            placeholderTextColor={colors.blue(0.6)}
            multiline
            style={styles.title}
          />
        </View>
        {image ? (
          <View style={{position: 'relative'}}>
            <Image
              style={{width: '100%', height: 150}}
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: '#1D60CC',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add size='20' variant='Linear' color='#FFFFFF' style={{transform: [{rotate: '45deg'}]}}/>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={UploadImg}>
            <View style={styles.imageUpload}>
              <GalleryImport size="32" color="#1D60CC"/>
              <Text style={styles.label}>Add Your Photo Here</Text>
            </View>
          </TouchableOpacity>
        )}
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