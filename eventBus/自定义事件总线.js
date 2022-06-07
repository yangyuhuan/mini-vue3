class HEventBus {

  constructor(){
    this.eventBus = {}
  }

  on(eventName, eventCallback, thisArg){
    let handlers = this.eventBus[eventName]
    if(!handlers){
      handlers = []
      this.eventBus[eventName] = handlers
    }

    handlers.push({
      eventCallback,
      thisArg
    })
   }

   off(eventName, eventCallback){
    let handlers = this.eventBus[eventName]
    if(!handlers) return 
    const newHandlers = [...handlers]
    for(var i = 0; i< handlers.length; i++){
      const handler = newHandlers[i]
      if(handler.eventCallback == eventCallback){
        const index = handlers.indexOf(handler)
        this.eventBus[eventName].splice(index, 1)
      }
    }

   }


  emit(eventName, ...payload){
    const handlers = this.eventBus[eventName]
    if(!handlers) return 
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArg,payload)
    })
  }


}

const eventBus = new HEventBus()

// main.js
eventBus.on("abc", function() {
  console.log("监听abc1", this)
}, {name: "why"})

const handleCallback = function() {
  console.log("监听abc2", this)
}
eventBus.on("abc", handleCallback, {name: "why"})

// utils.js
eventBus.emit("abc", 123)

// 移除监听
eventBus.off("abc", handleCallback)
eventBus.emit("abc", 123)