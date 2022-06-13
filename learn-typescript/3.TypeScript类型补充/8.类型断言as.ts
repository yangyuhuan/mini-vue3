//1.类型断言 as
const el = document.getElementById('div') as HTMLImageElement
el.src = ""


//2.
class Person {

}

class Student extends Person {
  studying() {

  }
}

function sayHello(p: Person){
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)

const message = 'hello world'

export {}