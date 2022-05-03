const entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      ee: 'adee'
    },
    f: 'af'
  }
}


function recurse(obj, keyString, result = {}) {

  for (var key in obj) {
    if (typeof obj[key] === 'object') {
      recurse(obj[key], keyString + key + '.', result)
    } else {
      result[`${keyString}${key}`] = obj[key]
    }
  }

  return result
}

console.log(recurse(entry, ''))