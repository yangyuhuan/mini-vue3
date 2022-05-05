const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_REJECTED = 'reject'

class HYPromise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PROMISE_STATUS_PENDING
    this.onFulfilledFn = []
    this.onRejectedFn = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {

        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFn.forEach(fn => {
            fn(this.value)
          })
        })
      }

    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {

        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFn.forEach(fn => {
            fn(this.reason)
          })
        })
      }

    }

    executor(resolve, reject)
  }


  then(onFulFilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = value => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled
    
    return new HYPromise((resolve, reject) => {
      //如果在then的时候状态已经确认下来,就直接调用
      if (this.status === PROMISE_STATUS_FULFILLED && onFulFilled) {
        const value = onFulFilled(this.value)
        resolve(value)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        const reason = onRejected(this.reason)
        reject(reason)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFn.push(() => {
          const value = onFulFilled(this.value)
          resolve(value)
        })
        this.onRejectedFn.push(() => {
          const reason = onRejected(this.reason)
          reject(reason)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

}


const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  //resolve(1111)
  reject(2222)
})

promise.then(res => {
  console.log("res1:", res)
  // return '222'
}).catch(err => {
  console.log("catch", err)
})

//promise.then(res => {
//   console.log("res2:", res)
//   return res
// }, err => {
//   console.log("err2:", err)
// }).then(res => {
//   console.log("res3:", res)
// })