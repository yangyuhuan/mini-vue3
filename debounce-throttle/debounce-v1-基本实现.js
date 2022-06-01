function debounce(fn,delay){
  let timer = null
  const _debounce = ()=>{
    
    if(timer) clearTimeout(timer)

    timer = setTimeout(function(){
      fn()
    }, delay)

  }

  return _debounce

}