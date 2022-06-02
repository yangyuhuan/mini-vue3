function throttle(fn,delay){
  let lastTime = 0
  const _throttle = ()=>{
    let nowTime = new Date().getTime()
    let remainTime = delay - (nowTime - lastTime)

    if(remainTime <=0){
      fn()
      lastTime = nowTime
    }
  }

  return _throttle

}