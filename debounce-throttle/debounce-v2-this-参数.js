function debounce(fn,delay){
  let timer = null
  const _debounce = function(...args){

    if(timer) clearTimeout(timer)

    timer = setTimeout(()=>{
      fn.apply(this,args)
    }, delay)

  }

  return _debounce

}