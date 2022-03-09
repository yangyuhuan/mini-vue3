 let obj = {
   name: 'lily',
   age: 18,
   children: [{
     name: 'lucy'
   }]
 }
 obj.label = obj
 let obj1 = obj
 //let obj2 = JSON.parse(JSON.stringify(obj))
 let obj3 = deepClone(obj)
 obj.age = 12

 //console.log(obj1)
 //console.log(obj2)
 console.info(obj3)


 //手写深拷贝
 function deepClone(target) {
   if (!isObject) return
   let map = new Map()

   function clone(target) {
     let newObj = isArray(target) ? [] : {}
     if (map.get(target)) {
       return map.get(target)
     }
     for (var key in target) {
       let value = target[key]
       if (isObject(value)) {
         map.set(target, newObj)
         newObj[key] = clone(value)
       } else {
         newObj[key] = value
       }
     }
     return newObj
   }
   return clone(target)
 }


 function isObject(obj) {
   return obj && typeof obj === 'object' ? true : false
 }

 function isArray(obj) {
   return Array.isArray(obj) ? true : false
 }