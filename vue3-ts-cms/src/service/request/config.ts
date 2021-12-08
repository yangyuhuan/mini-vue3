let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://coderwhy.org/dev'
  BASE_NAME = 'coderWhy'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
  BASE_NAME = 'kobe'
} else {
  BASE_URL = 'http://coderwhy.org/test'
  BASE_NAME = 'james'
}

export { BASE_URL, BASE_NAME }
