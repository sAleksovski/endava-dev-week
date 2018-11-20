import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InstagramFeed from '../components/InstagramFeed';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <InstagramFeed />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
