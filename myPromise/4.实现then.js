/**
 * then
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
        this.PromiseResult = null
        this.PromiseState = 'pending'
    }

    resolve(value){
        //state是不可变的
        if(this.PromiseState !== 'pending') return

        //如果执行resolve,状态变成fulfilled
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value
    }

    reject(reason){
        //state是不可变的
        if(this.PromiseState !== 'pending') return

        //如果执行reject,状态变为rejected
        this.PromiseState = 'rejected'
        //终值为传进来的reason
        this.PromiseResult = reason
    }

    then(onFulFilled, onRejected){
        //接收两个回调 onFulFilled, onRejected
        //参数校验,确保一定是函数
        onFulFilled = typeof onFulFilled === 'function'? onFulFilled: val => val
        onRejected = typeof onRejected === 'function'? onRejected: reason => { throw reason}

        if(this.PromiseState === 'fulfilled'){
            //如果当前为成功状态,执行第一个回调
            onFulFilled(this.PromiseResult)
        }else if(this.PromiseState === 'rejected'){
            onRejected(this.PromiseResult)
        }
    }

}




const test = new MyPromise((resolve, reject) => {
    reject('失败')
}).then(res => console.log(res), err => console.log(err))
