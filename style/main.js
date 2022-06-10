import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, FONT_TYPES } from './theme';

export default StyleSheet.create({
  container: {
    flex:            1,
    padding:         20,
    backgroundColor: COLORS.WHITE
  },
  flexRow: {
    flexDirection: 'row'
  },
  title: {
    marginVertical: 30,
    fontSize:       FONT_SIZES.MEDIUM,
    fontFamily:     FONT_TYPES.BOLD,
    color:          COLORS.BLACK
  },
  gitText: {
    fontSize:   FONT_SIZES.BIG,
    fontFamily: FONT_TYPES.REGULAR,
    color:      COLORS.BLACK
  },
  dataText: {
    fontSize:   FONT_SIZES.BIG,
    fontFamily: FONT_TYPES.REGULAR,
    color:      COLORS.LIGHT_GREY
  },
  defaultText: {
    fontSize:   FONT_SIZES.MEDIUM,
    fontFamily: FONT_TYPES.REGULAR
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
