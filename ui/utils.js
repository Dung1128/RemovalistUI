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


var arr = [];
var charCodeCache = [];

export const leven = (a, b) => {
  if (a === b) {
    return 0;
  }

  var swap = a;

  // Swapping the strings if `a` is longer than `b` so we know which one is the
  // shortest & which one is the longest
  if (a.length > b.length) {
    a = b;
    b = swap;
  }

  var aLen = a.length;
  var bLen = b.length;

  // Performing suffix trimming:
  // We can linearly drop suffix common to both strings since they
  // don't increase distance at all
  // Note: `~-` is the bitwise way to perform a `- 1` operation
  while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
    aLen--;
    bLen--;
  }

  // Performing prefix trimming
  // We can linearly drop prefix common to both strings since they
  // don't increase distance at all
  var start = 0;

  while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
    start++;
  }

  aLen -= start;
  bLen -= start;

  if (aLen === 0) {
    return bLen;
  }

  var bCharCode;
  var ret;
  var tmp;
  var tmp2;
  var i = 0;
  var j = 0;

  while (i < aLen) {
    charCodeCache[i] = a.charCodeAt(start + i);
    arr[i] = ++i;
  }

  while (j < bLen) {
    bCharCode = b.charCodeAt(start + j);
    tmp = j++;
    ret = j;

    for (i = 0; i < aLen; i++) {
      tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
      tmp = arr[i];
      ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
    }
  }

  return ret;
};

export const levenSearch = (searchWord, haystack, valueExtractor=item=>item, limit = 5) => {
  if(searchWord) {
      const searchedData = haystack.map(item=>{
          const compareWord = valueExtractor(item)
          const longest = Math.max(searchWord.length, compareWord.length)
          const distance = leven(searchWord, compareWord)
          const point = (longest-distance)/longest
          // console.log(distance + ':'+ longest, searchWord, compareWord)     
          return {
              item,
              point,
          }
      })
      return searchedData.sort((a,b)=>b.point-a.point)
          .slice(0, limit).map(c=>c.item)          
  } else {
      return haystack
  } 
}