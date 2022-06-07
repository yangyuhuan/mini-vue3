function throttle(fn,delay,options = { leading: true, trailing: false }){
  let lastTime = 0
  let timer = null
  let {leading , trailing} = options
  const _throttle = function(...args){
    return new Promise((resolve,reject)=>{
      let nowTime = new Date().getTime()
      if(lastTime == 0 && !leading){
        lastTime = nowTime
      }
      const remainTime = delay - (nowTime - lastTime)
      if(remainTime <=0){
        if(timer) {
          clearTimeout(timer)
          timer = null
        }
        let result = fn.apply(this,args)
        resolve(result)
        lastTime = nowTime
        return 
      }
  
        if (trailing && !timer) {
          timer = setTimeout(()=> {
            timer = null
            lastTime = !leading ? 0: new Date().getTime()
            let result = fn.apply(this,args)
            resolve(result)
          },remainTime)
    
        }
    })
  }

  _throttle.cancel = function(){
    if(timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle

}