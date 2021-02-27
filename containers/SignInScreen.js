import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const SignInScreen = ({ setToken, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTextChange = (text, input) => {
    if (input === "EMAIL") {
      setEmail(text);
    } else if (input === "PASSWORD") {
      setPassword(text);
    }
  };

  const handleSignIn = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          setToken(response.data.token);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Merci de renseigner tous les champs");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Image
          style={[StyleSheet.absoluteFill]}
          source={require("../assets/stars.png")}
        />
        <View style={styles.banner}>
          <Animated.View style={[{ alignItems: "center" }]}>
            <Image
              source={require("../assets/lvqm-logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>LVQM</Text>
          </Animated.View>
        </View>
        <View style={styles.form}>
          <View style={styles.textInput}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              style={styles.input}
              type="EMAIL"
              secureTextEntry={false}
              onChangeText={(text) => handleTextChange(text, "EMAIL")}
              value={email}
              autoCapitalize="none"
              placeholder="Email"
            />
          </View>
          <View style={styles.textInput}>
            <MaterialIcons name="vpn-key" size={24} color="black" />
            <TextInput
              style={styles.input}
              type="EMAIL"
              secureTextEntry={true}
              onChangeText={(text) => handleTextChange(text, "PASSWORD")}
              value={password}
              autoCapitalize="none"
              placeholder="Mot de passe"
            />
          </View>
          <TouchableOpacity onPress={handleSignIn}>
            <View
              style={[
                styles.textInput,
                { backgroundColor: "red", justifyContent: "center" },
              ]}
            >
              <Text style={{ color: "white", fontSize: 20 }}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text>Devenir membre LVQM</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  banner: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  logo: {
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    width: 320,
    height: 50,
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default SignInScreen;
