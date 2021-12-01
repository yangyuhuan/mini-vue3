class MyPromise{
    //构造方法
    constructor(executor){
        //初始化值
        this.initValue()
        //初始化this指向
        this.initBind()
        //执行传进来的函数
        executor(this.resolve, this.reject)
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
        //如果执行resolve,状态变成fulfilled
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value
    }

    reject(reason){
        //如果执行reject,状态变为rejected
        this.PromiseState = 'rejected'
        //终值为传进来的reason
        this.PromiseResult = reason
    }

}




const test1 = new MyPromise((resolve, reject) => {
    resolve('成功')
})
console.log(test1) // MyPromise { PromiseState: 'fulfilled', PromiseResult: '成功' }

const test2 = new MyPromise((resolve, reject) => {
    reject('失败')
})
console.log(test2)
