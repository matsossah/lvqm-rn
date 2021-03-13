import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = (props) => {
  const { userToken } = props;
  const [image, setImage] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const [uploading, setUploading] = useState(false);

  const handleImagePicked = async (imageResponse) => {
    let uploadResponse, uploadResult;
    try {
      if (!imageResponse.cancelled) {
        setUploading(true);
        const uri = imageResponse.uri;
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        const formData = new FormData();
        formData.append("photo", {
          uri: uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`, // la clé type doit être obligatoirement précisée en React Native
        });

        console.log("1", userToken);
        uploadResponse = await axios.put(
          // Ici, il faut envoyer l'id du user en query
          // id rentré en dur dans l'exemple, mais doit être dynamique dans votre code
          "https://express-airbnb-api.herokuapp.com/user/upload_picture?id=604cc14a4edbd00017d03b53",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          Array.isArray(uploadResponse.data.photo) === true &&
          uploadResponse.data.photo.length > 0
        ) {
          setImage(uploadResponse.data.photo[0].url);
          setUploading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGalleryPressed = async () => {
    const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      handleImagePicked(pickerResult);
    } else {
      alert("Please grant permission to access Library");
    }
  };

  const handleCameraPressed = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
    } else {
      alert("Please grant permission to access Library");
    }
  };

  return (
    <View style={styles.container}>
      {uploading && (
        <View style={[StyleSheet.absoluteFill, styles.uploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <TouchableHighlight onPress={handleGalleryPressed}>
        <Text>Gallery</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleCameraPressed}>
        <Text>Camera</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
});

export default ProfileScreen;
