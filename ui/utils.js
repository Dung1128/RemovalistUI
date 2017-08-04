import { Platform } from 'react-native'

// we define available font weight and styles for each font here
const font = {
  weights: {
    Black: '900',
    ExtraBold: '800',
    Bold: '700',
    SemiBold: '600',
    Medium: '500',
    Normal: '400',
    Light: '300',
    ExtraLight: '200',
    Thin: '100',
  },
  styles: {
    Italic: 'italic',
  },
}

export const fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign({
    weight: null,
    style: null,
    backgroundColor: 'transparent'
  }, options)

  const { weights, styles } = font

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : ''
    style = styles[style] ? style : ''

    const suffix = weight + style

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : '')
    }
  } else {
    weight = weights[weight] || weights.Normal
    style = styles[style] || 'normal'
    // by default custom font can have background color
    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style,
      backgroundColor: 'transparent',
      paddingTop: 5
    }
  }
}