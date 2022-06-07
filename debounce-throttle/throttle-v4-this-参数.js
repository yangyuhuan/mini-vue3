function throttle(fn,delay,options = { leading: true, trailing: false }){
  let lastTime = 0
  let timer = null
  let {leading , trailing} = options
  const _throttle = function(...args){
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
      fn.apply(this,args)
      lastTime = nowTime
      return 
    }

      if (trailing && !timer) {
        timer = setTimeout(()=> {
          timer = null
          lastTime = !leading ? 0: new Date().getTime()
          fn.apply(this,args)
        },remainTime)
  
      }
  }

  return _throttle

}