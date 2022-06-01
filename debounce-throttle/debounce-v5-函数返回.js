function debounce(fn,delay,immediate = false,callback){
  let timer = null
  let isInvoke = false
  const _debounce = function(...args){

    return new Promise((resolve, reject)=>{

      if(timer) clearTimeout(timer)
      if(immediate && !isInvoke){
        let result = fn.apply(this,args)
        if(callback) callback(result)
        resolve(result)
        isInvoke = true
      }else{
        timer = setTimeout(()=>{
          let result = fn.apply(this,args)
          if(callback) callback(result)
          resolve(result)
          isInvoke = false
        }, delay)
    
      }
    })



  }


  _debounce.cancel = function(){
    if(timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce

}