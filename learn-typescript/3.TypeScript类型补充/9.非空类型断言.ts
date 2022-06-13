//非空断言! 确定message是有值的,跳过ts对他的类型检测
function printMessageLength(message?:string){

  console.log(message!.length)

}

printMessageLength('hahhahhhh')