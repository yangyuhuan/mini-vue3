//数组去重的方法
const user = ['lily', 'lucy','yummy','lily','lucy']
const user2 = [
  {
    uid: 1, uname: '用户1',
  },
  {
    uid: 2, uname: '用户2',
  },
  {
    uid: 3, uname: '用户3',
  },
  {
    uid: 4, uname: '用户4',
  },
  {
    uid: 1, uname: '用户1',
  },
]

/*
* 数组中存放基本类型的数据的去重方法1
*/
function unique(originArr){
  return [...new Set(originArr)]
}
console.log(unique(user))

/*
* 数组中存放基本类型的数据的去重方法2
*/
function unique2(originArr){
  let uniqueArr = []
  for(const item of originArr){
    if(!uniqueArr.includes(item)){
      uniqueArr.push(item)
    }
  }
  return uniqueArr
}
console.log(unique2(user))

/*
* 数组中存放基本类型的数据的去重方法3
*/
function unique3(arr) {
  // 如果当前元素的下标和indexOf的下标不相同，则证明数组前面已经有相同的元素了，所以将当前元素排除掉。
  return arr.filter((item, index) => arr.indexOf(item) === index)
}
console.log(unique3(user))

/*
* 数组中存放复杂类型的数据的去重方法1
*/
function unique4(arr, unique_key) {
  return Object.values(
    arr.reduce((acc, cur) => (acc[cur[unique_key]] = cur, acc) , {})
  )
}
console.log(unique4(user2, 'uid'))

/*
* 数组中存放复杂类型的数据的去重方法2
*/
function unique5(arr){
  let obj = {}
  return arr.filter(item => {
    let newItem = item + JSON.stringify(item)
    return obj.hasOwnProperty(newItem)? false: obj[newItem] = true
  })
}

console.log(unique5(user2))









