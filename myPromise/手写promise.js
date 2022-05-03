const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch (err) {
    reject(err)
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled) this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        if (onRejected) this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch (onRejected) {
    this.then(undefined, onRejected)
  } finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HYPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new HYPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new HYPromise((resolve, reject) => {
      let values = []
      promises.forEach(promise => {
        promise.then(res => {
          values.push(res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, err => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    let values = []
    return new HYPromise(resolve => {
      promises.forEach(promise => {
        promise.then(res => {
          values.push({
            value: res,
            status: PROMISE_STATUS_FULFILLED
          })
          if (values.length === promises.length) {
            resolve(values)
          }
        }, err => {
          values.push({
            value: err,
            status: PROMISE_STATUS_REJECTED
          })

          if (values.length === promises.length) {
            resolve(values)
          }
        })
      })

    })
  }

  static race(promises) {
    return new HYPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    let reason = []
    return new HYPromise((resolve, reject) => {

      promises.forEach(promise => {
        promise.then(resolve, err => {
          reason.push(err)
          if (reason.length === promises.length) {
            reject(new AggregateError(reason).errors)
          }
        })
      })
    })
  }




}

//第一步基本结构
// const promise = new HYPromise((resolve, reject) => {
//   console.log("状态pending")
//   resolve(1111)
//   //reject(2222)
// })

// //then方法的设计
// promise.then(res => {
//   console.log('res1', res)
//   // throw new Error("err message")
// }, err => {
//   console.log('err', err)
// }).then(res => {
//   console.log('res2', res)
// }).finally(() => {
//   console.log('finally')
// })


// promise.then(res => {
//   console.log("res2:", res)
// }, err => {
//   console.log("err2:", err)
// })

// HYPromise.resolve("Hello World").then(res => {
//   console.log("res:", res)
// })

// HYPromise.reject("Error Message").catch(err => {
//   console.log("err:", err)
// })


const p1 = new HYPromise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1111)
    reject(1111)
  }, 1000)
})
const p2 = new HYPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2222)
    //resolve(3333)
  }, 2000)
})
const p3 = new HYPromise((resolve, reject) => {
  setTimeout(() => {
    //resolve(3333)
    reject(3333)
  }, 3000)
})


HYPromise.any([p1, p2, p3]).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})