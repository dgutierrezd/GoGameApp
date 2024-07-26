import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: Colors.white},
});
