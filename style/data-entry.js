import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, FONT_TYPES } from './theme';

export default StyleSheet.create({
  container: {
    flex:            1,
    padding:         20,
    backgroundColor: COLORS.WHITE
  },
  textInput: {
    width:             '100%',
    fontSize:          FONT_SIZES.MEDIUM,
    fontFamily:        FONT_TYPES.REGULAR,
    borderBottomColor: COLORS.BLACK,
    borderBottomWidth: 2
  },
  submitButton: {
    position: 'absolute',
    bottom:   30,
    right:    30
  },
  submitText: {
    color:         COLORS.BLACK,
    fontSize:      FONT_SIZES.BIG,
    fontFamily:    FONT_TYPES.BOLD,
    textTransform: 'uppercase'
  }
});
