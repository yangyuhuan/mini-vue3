function foo(){
    return 'abc'
}

function bar(){
    return 123
}

//unknown类型只能赋值给any和unknow类型
//any类型可以赋值给任意类型

let flag = true
let result: unknown
if(flag){
    result = foo()
}else{
    result = bar()
}

let message: string = result
//let num: number = result
let num: unknown = result
export {}