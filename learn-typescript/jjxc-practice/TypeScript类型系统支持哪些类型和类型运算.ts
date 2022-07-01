//元组
type Tuple = [number, string]

//接口-描述对象
interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name: string;
  age: number;
}

const obj: IPerson = {
  name: 'guang',
  age: 18
}
//接口-描述函数
interface SayHello {
  (name: string): string
}

const func: SayHello = (name: string) => {
  return 'hello,'+ name
}

//接口-描述构造器
interface PersonConstructor {
  new (name: string,age: number): IPerson
}
function createPerson(ctor: PersonConstructor):IPerson{
return new ctor('guang',18)
}
//枚举

enum Transpiler {
  Babel = 'babel',
  Postcss = 'postcss'
}

type babel = Transpiler.Babel
//TypeScript支持字面量类型
 function fun(str: `#${string}`){

 }
 //fun('aaa') 报错
 fun('#aaa')

 type aa = {
   name: string
 } & {
   age: number
 }
type b = {name: '122',age: 18} extends aa ? true : false 
 
//映射类型

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]?: [T[Key],T[Key],T[Key]]
}

type res = MapType<{a: 1, b: 2}>