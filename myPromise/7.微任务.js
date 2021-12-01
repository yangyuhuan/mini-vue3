/**
 * 实现then方法是微任务
 */
class MyPromise{
    //构造方法
    constructor(executor){
        //初始化值
        this.initValue()
        //初始化this指向
        this.initBind()
        //执行传进来的函数
        try {
            executor(this.resolve, this.reject)
        } catch(e){
            //捕捉到错误直接执行reject
            this.reject(e)
        }
       
    }

    initBind(){
        //初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    initValue(){
        //初始化值
        this.PromiseResult = null      //终值
        this.PromiseState = 'pending'  //状态
        this.onFulFilledCallbacks = [] //保存成功回调
        this.onRejectedCallbacks = []  //保存失败回调
    }

    resolve(value){
        //state是不可变的
        if(this.PromiseState !== 'pending') return

        //如果执行resolve,状态变成fulfilled
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value

        //执行保存的成功回调
        while(this.onFulFilledCallbacks.length){
            // !!! shift移除数组的第一项,改变原数组,返回值是被移除的项目
            this.onFulFilledCallbacks.shift()(this.PromiseResult)
        }
    }

    reject(reason){
        //state是不可变的
        if(this.PromiseState !== 'pending') return

        //如果执行reject,状态变为rejected
        this.PromiseState = 'rejected'
        //终值为传进来的reason
        this.PromiseResult = reason

        //执行保存的失败回调
        while(this.onRejectedCallbacks.length){
            this.onRejectedCallbacks.shift()(this.PromiseResult)
        }
    }

    then(onFulFilled, onRejected){
        //接收两个回调 onFulFilled, onRejected
        
        //参数校验,确保一定是函数
        onFulFilled = typeof onFulFilled === 'function'? onFulFilled: val => val
        onRejected = typeof onRejected === 'function'? onRejected: reason => { throw reason}

        var thenPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = cb => {
                setTimeout(()=>{
                    try {
                        const x = cb(this.PromiseResult)
                        if(x === thenPromise){
                            //不能返回自身哦
                            throw new Error('不能返回自身')
                        }
    
                        if(x instanceof MyPromise){
                            //如果返回值是promise
                            //如果返回值是promise对象,返回值为成功,新的promise就是成功
                            //如果返回值是promise对象,返回值为失败,新的promise就是失败
                            //谁知道返回的promise是失败成功?只有then知道
                            x.then(resolve,reject)
                        }else{
                            
                            //非promise就直接成功
                            resolve(x)
                        }
                    }catch( err){
                        reject(err)
                    }
                })
            }

            if(this.PromiseState === 'fulfilled'){
                //如果当前为成功状态,执行第一个回调
                //onFulFilled(this.PromiseResult)
                resolvePromise(onFulFilled)
            }else if(this.PromiseState === 'rejected'){
                //如果当前为失败状态,执行第二个回调
                //onRejected(this.PromiseResult)
                resolvePromise(onRejected)
            }else if(this.PromiseState === 'pending'){
                //如果状态为待定状态,暂时保存两个回调
                this.onFulFilledCallbacks.push(onFulFilled.bind(this))
                this.onRejectedCallbacks.push(onRejected.bind(this))
            }
        })
        return thenPromise
   
    }

}

const test4 = new MyPromise((resolve, reject) => {
    resolve(1)
}).then(res => console.log(res), err => console.log(err))

console.log(2)