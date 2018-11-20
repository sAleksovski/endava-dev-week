import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import LikeIcon from './LikeIcon';

import { formatLikes, formatTimeAgo } from '../utils/formatters';

const DOUBLE_TAP_INTERVAL = 500;

export default class Post extends React.Component {
  state = {
    lastTap: 0,
  };

  handleImageTap = () => {
    const timestamp = new Date().getTime();
    if (timestamp - this.state.lastTap < DOUBLE_TAP_INTERVAL) {
      this.props.onLikeToggle(this.props.post.id);
      this.setState({
        lastTap: 0,
      });
    } else {
      this.setState({
        lastTap: timestamp,
      });
    }
  }

  render() {
    const { post: { id, photo, description, timestamp, likes, userLikes, dimensions }, onLikeToggle } = this.props;

    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableWithoutFeedback onPress={this.handleImageTap}>
          <Image
            style={{ ...dimensions }}
            source={{ uri: photo }}
          />
        </TouchableWithoutFeedback>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <LikeIcon liked={userLikes} onLikeToggle={() => onLikeToggle(id)} />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>{formatLikes(likes)} likes</Text>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text>{description}</Text>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={{ color: 'rgba(96,100,109, 0.8)' }}>{formatTimeAgo(timestamp)}</Text>
          </View>
        </View>
      </View>
    );
  }
}