import moment from 'moment';

export const formatLikes = (number) =>
  number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

export const formatTimeAgo = (timestamp) =>
  moment.unix(timestamp).fromNow();
