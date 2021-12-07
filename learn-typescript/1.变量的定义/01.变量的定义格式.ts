var name: string = 'why'
name = "123"
//string:typescript的字符串类型,
//String:javascript的字符串包装类的类型

//默认情况下进行赋值时,会将赋值的值的类型,作为前面标识符的类型----类型推导/推断
//foo没有添加类型注解.类型推导为string类型
let foo = 'foo'
//foo = 123
export {}