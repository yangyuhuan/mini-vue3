class Classroom {
  constructor(name,address,initStudents){
    this.name = name
    this.address = address
    this.initStudents = initStudents
  }

  entry(studentName){
    this.initStudents.push(studentName)
  }

  [Symbol.iterator](){
    let index = 0
    return {
      next: ()=>{
        if(index < this.initStudents.length){
          return {done: false, value: this.initStudents[index++]}
        }else{
          return {done: true, value: undefined }
        }
      }
    }
    

  }


}

let newRoom = new Classroom('aaa','111',['lily','lucy'])
newRoom.entry('yummy')
for(const item of newRoom){
  console.log(item)
}