function isObject(value){
  return value != null && typeof value == 'object' || typeof value == 'function'
}

function deepClone(originObj){
  if(!isObject(originObj)) return originObj

  let newObj = Array.isArray(originObj)? []: {}

  for(var key in originObj){
    if(isObject(originObj[key])){
      newObj[key] = deepClone(originObj[key])
    }else{
      newObj[key] = originObj[key]
    }
  }

  return newObj
  


}

// 测试代码
const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  }
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)

console.log(obj)