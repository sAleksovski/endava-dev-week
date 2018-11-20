import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default Loading = () => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    <ActivityIndicator animating={true} size="large" />
  </View>
);
