function speak(name){
  if(name === '老牛'){
    console.log('老牛哞哞叫')
  }else if(name === '老虎'){
    console.log('老虎嗷嗷叫')
  }else if(name === '小猫'){
    console.log('小猫喵喵叫')
  }else{
    console.log('不知道怎么叫')
  }
}

function speak(name){
  const map = {
    '老牛':'老牛哞哞叫',
    '老虎':'老虎嗷嗷叫',
    '小猫':'小猫喵喵叫'
  }
  if(map[name]){
    console.log(map[name]) 
  }else{
    console.log('不知道怎么叫')
  }
}

function speak(name){
  let map = [
    [
      ()=> name.includes('牛'),
      ()=> console.log(name + '哞哞叫')
    ],
    [
      ()=> name.endsWith('虎') && name.length <= 3,
      ()=> console.log(name + '嗷嗷叫')
    ],
    [
      ()=> name.endsWith('猫') && !name.includes('狗'),
      ()=> console.log(name + '喵喵叫')
    ]
  ]

  let target = map.find(item => item[0]())
  if(target){
    target[1]()
  }else{
    console.log('不知道怎么叫')
  }
}

speak('猫')