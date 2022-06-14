class Person {
  name: string
  age: number

  constructor(name: string, age: number){
    this.name = name
    this.age= age
  }

  eating(){
    console.log('eating ')
  }
}

class Student extends Person {
  sno: number
  constructor(name: string, age: number, sno: number){
    super(name,age)
    this.sno = sno
  }
   eating() {
     console.log('student eating')
     super.eating()
   }

   studying(){
     console.log('student studying')
     super.eating()
   }


}

const stu = new Student('why', 18, 111)
console.log(stu.name)
console.log(stu.age)
console.log(stu.sno)
export {}