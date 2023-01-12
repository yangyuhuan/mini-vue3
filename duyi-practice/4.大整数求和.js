function sum(a, b){
  const max = Math.max(a.length,b.length)
   a = a.padStart(max, '0')
   b = b.padStart(max, '0')
  let result = ''
  let carry = 0
  for(var i = max-1;i >=0; i--){
    let total = +a[i] + +b[i]+ carry
    carry =  Math.floor(total / 10)
    result = total%10 + result
  }
  if(carry){
    result = '1' + result
  }
  return result
}

console.log(sum('16677822222655','6555555'))