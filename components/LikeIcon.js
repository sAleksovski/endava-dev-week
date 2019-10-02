import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Lottie from 'lottie-react-native';

export default class LikeIcon extends React.Component {
  componentDidUpdate(prevProps) {
    if(prevProps.liked === false && this.props.liked) {
      this.animation.play();
    }
  }

  render() {
    const { liked, onLikeToggle } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onLikeToggle}>
        <Lottie
          style={{ height: 40, width: 40 }}
          loop={false}
          progress={liked ? 1 : 0}
          ref={animation => {
            this.animation = animation;
          }}
          source={require('./like.json')}
        />
      </TouchableWithoutFeedback>
    );
  }
}