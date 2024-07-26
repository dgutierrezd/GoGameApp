import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {fontSize: 16, fontWeight: '500'},
  radioButton: {
    width: 20,
    height: 20,
    borderColor: Colors.gray,
    borderRadius: 20,
    borderWidth: 1,
  },
});
