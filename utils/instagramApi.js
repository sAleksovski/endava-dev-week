import { Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default instagramApi = (query) => {
  const url = `https://www.instagram.com/explore/tags/${query || 'cats'}/?__a=1`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const topPosts = response.graphql.hashtag.edge_hashtag_to_top_posts.edges;
      const edges = response.graphql.hashtag.edge_hashtag_to_media.edges;
      return [...topPosts, ...edges].map(({ node }) => ({
        id: node.id,
        photo: node.display_url,
        dimensions: {
          height: Math.floor((node.dimensions.height / node.dimensions.width) * WINDOW_WIDTH),
          width: WINDOW_WIDTH,
        },
        description: node.edge_media_to_caption.edges.length > 0 ? node.edge_media_to_caption.edges[0].node.text.split('\n')[0] : '',
        timestamp: node.taken_at_timestamp,
        likes: node.edge_liked_by.count || Math.floor(Math.random() * 1000000), // edge.node.edge_liked_by.count,
        userLikes: Math.random() < .3,
      }));
    });
}
