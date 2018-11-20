import React from 'react';
import { SafeAreaView, FlatList, Divider } from 'react-native';
import instagramApi from '../utils/instagramApi';
import { MaterialIcons } from '@expo/vector-icons';

import Post from './Post';
import Loading from './Loading';
import { Searchbar } from 'react-native-paper';

export default class InstagramFeed extends React.Component {
  state = {
    posts: [],
    loading: true,
    searchValue: '',
  };

  componentDidMount() {
    this.search('cats');
  }

  onLikeToggle = (postId) => {
    this.setState({
      posts: this.state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            userLikes: !post.userLikes,
            likes: post.likes + (post.userLikes ? -1 : 1),
          }
        }

        return post;
      })
    });
  }

  search = (query) => {
    this.setState({ loading: true });
    instagramApi(query).then(response => {
      this.setState({ posts: response, loading: false });
    })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Searchbar
          icon={() => <MaterialIcons size={28} name="search" />}
          placeholder="Search"
          onChangeText={(query) => {
            this.setState({ searchQuery: query });
            this.search(query);
          }}
          value={this.state.searchQuery}
        />
        { this.state.loading ?
          <Loading />
          :
          <FlatList
            data={this.state.posts}
            ItemSeparatorComponent={Divider}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Post post={item} onLikeToggle={this.onLikeToggle} />}
          />
        }
      </SafeAreaView>
    );
  }
}