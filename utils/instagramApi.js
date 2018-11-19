import { Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default instagramApi = (query) => {
  const url = `https://www.instagram.com/explore/tags/${query || 'cats'}/?__a=1`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const edges = response.graphql.hashtag.edge_hashtag_to_media.edges;
      return edges.map((edge) => ({
        id: edge.node.id,
        photo: edge.node.display_url,
        dimensions: {
          height: Math.floor((edge.node.dimensions.height / edge.node.dimensions.width) * WINDOW_WIDTH),
          width: WINDOW_WIDTH,
        },
        description: edge.node.edge_media_to_caption.edges.length > 0 ? edge.node.edge_media_to_caption.edges[0].node.text.split('\n')[0] : '',
        timestamp: edge.node.taken_at_timestamp,
        likes: Math.floor(Math.random() * 1000000), // edge.node.edge_liked_by.count,
        userLikes: Math.random() < .3,
      }));
    });
}