import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  BASE_URL: 'https://server-parking.vercel.app',
  BASE_URL_FLASK: 'http://neuralparking.online',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
