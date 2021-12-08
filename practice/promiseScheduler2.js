class Scheduler{
    constructor(){
        this.list = []; //
        this.maxNumber = 2;
        this.tempRunIndex = 0;
    }

    add(promiseCreator){
        this.list.push(promiseCreator)
    }

    taskStart(){
        for(let i = 0; i< this.maxNumber; i++){
            this.request()
        }
    }
    request(){
        if(!this.list ||this.list.length <0 || this.tempRunIndex >= this.maxNumber)return
        this.tempRunIndex++
        this.list.shift()().then(function(){
            this.tempRunIndex--
            this.request()

        })
    }
}

function timeout(time){
  console.log("执行",time)
  return new Promise(resolve => {
      setTimeout(resolve, time);
  });
}

let scheduler = new Scheduler();

function addTask(time,order){
  scheduler.add(() => {
      return timeout(time).then(() => {
          console.log(order);
      });
  })
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

scheduler.taskStart();
