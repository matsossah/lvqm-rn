import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        if (response.data) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <View style={styles.listing}>
            <View style={styles.cover}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {item.photos.map((photo) => (
                  <View style={styles.carousselItem} key={photo.picture_id}>
                    <Image
                      style={styles.coverImage}
                      source={{ uri: photo.url }}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={styles.priceBox}>
                <Text style={{ color: "white" }}>{item.price} €</Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <View style={styles.desc}>
                <Text>{item.title}</Text>
                <Text>{item.user.account.photo.url}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  listing: {
    height: 300,
    width: 400,
    marginTop: 10,
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

export default HomeScreen;
