function throttle(fn,delay,options = { leading: true, trailing: false }){
  let lastTime = 0
  let {leading , trailing} = options
  const _throttle = ()=>{
    let nowTime = new Date().getTime()
    if(lastTime == 0 && !leading){
      lastTime = nowTime
    }

    const remainTime = delay - (nowTime - lastTime)
    if(remainTime <=0){
      fn()
      lastTime = nowTime
    }
  }

  return _throttle

}