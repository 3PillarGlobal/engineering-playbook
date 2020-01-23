import { PROFILE, IOS_ANALYTICS_KEY, ANDROID_ANALYTICS_KEY } from 'react-native-dotenv';

export default {
  PROFILE,
  ANALYTICS_KEY: Platform.select({
    ios: IOS_ANALYTICS_KEY,
    android: ANDROID_ANALYTICS_KEY,
  }),
};