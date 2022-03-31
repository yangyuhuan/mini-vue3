function foo() {
  console.log(this)
}

foo.bind({})()

Function.prototype.hBind = function (thisArg, ...argArray) {
  let fn = this
  thisArg = thisArg !== undefined && thisArg !== null ? Object(thisArg) : window
  return function (...args) {
    thisArg.fn = fn
    var finalArgs = [...argArray, ...args]
    var result = thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }
}

var bar = foo.hBind("abc")
bar()