var o = (function(){
  var obj = {
    a: 1,
    b: 2
  }
  return {
    get: function(k){
      return obj[k]
    }
  }
})()
//如何在不修改上面代码的情况下修改obj的值

//Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
Object.defineProperty(Object.prototype, 'abc', {
  get(){
    return this
  }
})
let obj1 = o.get('abc')
obj1.c = 3
console.log(o.get('abc'))
console.log(o.get('c'))

//如何防止修改obj的值
//1.判断是不是自身的属性
// var o = (function(){
//   var obj = {
//     a: 1,
//     b: 2
//   }
//   return {
//     get: function(k){
//       if(obj.hasOwnProperty(k)){
//         return obj[k]
//       }
//       return undefined
//     }
//   }
// })()
//

  //2.如果obj不需要用到原型上热河东西,可以把原型设置为null
  //Object.setPrototypeOf(obj,null)