import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ToastAndroid, Platform } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World!!</Text>
        <Text>Powered by React Native</Text>
        <Button
          title="Press me!"
          style={styles.button}
          onPress={this.onButtonPress} />
      </View>
    );
  }

  onButtonPress() {
    if (Platform.OS === "ios") {
      Alert.alert("Hola");
    } else {
      ToastAndroid.show("Hola", ToastAndroid.SHORT);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16
  },
  button: {

  }
});
