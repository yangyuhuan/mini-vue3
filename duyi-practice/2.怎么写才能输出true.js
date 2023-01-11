// ? 位置应该怎么写才能输出true
// var a = ?
// console.log(
//   a == 1 &&
//   a == 2 &&
//   a == 3
// )

var a = {
  c: 1,
  valueOf(){
    return this.c++
  }
}
console.log(
  a == 1 &&
  a == 2 &&
  a == 3
)

/*
* == 比较总结:
* 1.特殊情况 undefined == null ; NaN != NaN
* 2.类型相同: 比较值
* 3.类型不同
*   a.均为原始类型,转换成数字比较
*   b.一端原始,一端对象: 对象转原始后比较(先调用valueOf,若无法转换成原始,则调用* *     toString)
**/ 
let obj = {}
console.log(obj.valueOf())     // {}
console.log(obj.toString())    //'[object Object]'
console.log(obj == '[object Object]') // true