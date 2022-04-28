// function timeout(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   })
// }

// async function asyncPrint(value, ms) {
//   await timeout(ms)
//   console.log(`${ms}后打印 ${value}`)
// }

// asyncPrint('hello world', 10000)


//等同于
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms){
  await timeout(ms)
  console.log(`${ms}后打印${value}`)
}

asyncPrint('hello world!',2000)