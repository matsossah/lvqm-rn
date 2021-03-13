import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import MapView from "react-native-maps";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const RoomScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.listing}>
        <View style={styles.cover}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.photos.map((photo) => (
              <View style={styles.carousselItem} key={photo.picture_id}>
                <Image style={styles.coverImage} source={{ uri: photo.url }} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.priceBox}>
            <Text style={{ color: "white" }}>{data.price} €</Text>
          </View>
        </View>

        <View style={styles.desc}>
          <Text>{data.title}</Text>
          <Text>{data.user.account.photo.url}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "purple",
  },
  listing: {
    height: screenHeight / 2.5,
    width: "auto",
  },
  cover: {
    flex: 3,
  },
  coverImage: {
    flex: 3,
    resizeMode: "cover",
  },
  carousselItem: {
    width: 400,
    marginRight: 5,
  },
  priceBox: {
    backgroundColor: "black",
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 100,
  },
  desc: {
    flex: 1,
  },
});

export default RoomScreen;
