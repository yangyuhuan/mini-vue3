//never表示永远不会发生值的类型,比如一个函数
//一个函数中是一个死循环或者抛出一个异常,可以使用never
function loopFun():never {
  while(true){
    console.log('123')
  }
}
function loopErr(): never {
  throw new Error()
}

function handleMessage(message: number | string){
  switch(typeof message){
    case 'string':
      console.log('string处理方式message')
      break
    case 'number':
      console.log('number处理方式message')
      break
    default:
      const check: never = message    
  }

}