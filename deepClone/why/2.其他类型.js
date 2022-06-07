function isObject(value){
  return value != null && (typeof value == 'object' || typeof value == 'function')
}

function deepClone(originObj){

  if(originObj instanceof Set){
    return new Set([...originObj])
  }

  if(originObj instanceof Map){
    return new Map([...originObj])
  }

  if(typeof originObj === 'symbol'){
    return Symbol(originObj.description)
  }

  if(typeof originObj === 'function'){
    return originObj
  }


  if(!isObject(originObj)) return originObj

  let newObj = Array.isArray(originObj)? []: {}

  for(var key in originObj){
    newObj[key] = deepClone(originObj[key])
  }

  
  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originObj)
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepClone(originObj[sKey])
    console.log(deepClone(originObj[sKey]))
  }

  return newObj
  


}

// 测试代码
let s1 = Symbol("aaa")
let s2 = Symbol("bbb")

const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  },
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function(m, n) {
    console.log("foo function")
    console.log("100代码逻辑")
    return 123
  },
  // Symbol作为key和value
   [s1]: "abc",
   s2: s2,
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([["aaa", "abc"], ["bbb", "cba"]])
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)
console.log(obj)
// console.log(newObj.s2 === obj.s2)