function foo(arg) {
  console.log('this', this)
  //console.log('arg', arg)
}

// 给所有的函数添加一个hApply的方法
Function.prototype.hApply = function (thisArg, argArray) {
  // 在这里可以去执行调用的那个函数(foo)
  // 问题: 得可以获取到是哪一个函数执行了hApply
  // 1.获取需要被执行的函数
  let fn = this

  // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
  thisArg = thisArg != undefined && thisArg != null ? Object(thisArg) : window
  argArray = argArray || []
  // 3.调用需要被执行的函数
  thisArg.fn = fn
  let result = thisArg.fn(...argArray)
  delete thisArg.fn

  // 4.将最终的结果返回出去
  return result
}

foo.call('123', [12])
foo.hApply('123', [12])