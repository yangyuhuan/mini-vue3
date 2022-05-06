const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = (err) => {
      throw err;
    };
    onRejected = onRejected || defaultOnRejected;

    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    return new HYPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          });
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          });
      }
    });
  }

  catch (onRejected) {
    return this.then(undefined, onRejected);
  } 
  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }

  static resolve(value){
    return new HYPromise(resolve => {
      resolve(value)
    })
  }
  
  static reject(reason){
    return new HYPromise( (resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises){
    return new HYPromise((resolve, reject) =>{
      let results = []
      promises.forEach(promise => {
        promise.then(value => {
          results.push(value)
          if(results.length === promises.length){
            resolve(results)
          }
        },err=>{
          reject(err)
        })

      })
    })
  }

  static allSettled(promises){
    return new HYPromise((resolve) =>{
      let results = []
      promises.forEach(promise => {
        promise.then(value => {
          results.push({
            status: PROMISE_STATUS_FULFILLED,
            value
          })
          if(results.length === promises.length){
            resolve(results)
          }
        },err=>{
          results.push({
            status: PROMISE_STATUS_REJECTED,
            value: err
          })
          if(results.length === promises.length){
            resolve(results)
          }
        })

      })
    })
  }

  static race(promises){
    return new HYPromise((resolve, reject) =>{
      promises.forEach(promise => {
        promise.then(resolve,reject)
      })
    })
  }

  static any(promises){
    //resolve 必须有一个成功的结果
    //reject 所有的都失败了才执行失败
    return new HYPromise((resolve, reject) =>{
      let reasons = []
      promises.forEach(promise => {
        promise.then(resolve,err=>{
          reasons.push(err)
          if(reasons.length === promises.length){
            reject(new AggregateError(reasons))
          }
         
        })

      })
    })


  }

}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending");
  //resolve(1111)
  reject(2222);
});

promise
  .then(
    (res) => {
      console.log("res1:", res);
    },
    (err) => {
      console.log("err1", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  })
  .finally(() => {
    console.log("finally");
  });

//promise.then(res => {
//   console.log("res2:", res)
//   return res
// }, err => {
//   console.log("err2:", err)
// }).then(res => {
//   console.log("res3:", res)
// })

const p1 = new HYPromise((resolve, reject) => {
  setTimeout(() => { reject(1111) }, 3000)
})
const p2 = new HYPromise((resolve, reject) => {
  setTimeout(() => { reject(2222) }, 2000)
})
const p3 = new HYPromise((resolve, reject) => {
  setTimeout(() => { reject(3333) }, 3000)
})


// HYPromise.race([p1, p2, p3]).then(res => {
//   console.log("res:", res)
// }).catch(err => {
//   console.log("err:", err)
// })

HYPromise.any([p1, p2, p3]).then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err.errors)
})