/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 * 思路：
 * 1.想办法把无序数组组装成升序等数组(使用归并算法，每次对半)
 * 2.从第一项开始i，sum[i] < sum[i+1], 如果sum[i]/2 > sum[j],则此时满足‘重要翻转’的个数为 count += left.length - i ===> (因为是升序，从i后面都满足)
 * 
 * 步骤：
 * 1.实现归并方法
 * 2.比较每次对半数组，找到满足条件的‘重要翻转’，返回排序后的数组
 * 3.返回累加的次数
 * */
//  var reversePairs = function (nums) {
//   let count = 0
//   //2.比较每次对半数组，找到满足条件的‘重要翻转’，返回排序后的数组
//   let mergeArr = (left, right) => {
//       let i = 0, j = 0
//       while (i < left.length && j < right.length) {
//           if (left[i] / 2 > right[j]) {
//               count += left.length - i
//               j++
//           } else {
//               i++
//           }
//       }
//       console.log(left,right,[...left, ...right].sort((a, b) => a - b))
//       return [...left, ...right].sort((a, b) => a - b)
//   }
//   //1.实现归并方法
//   let divide = (arr) => {
//       if (arr.length <= 1) {
//           return arr
//       }
//       let mid = arr.length >> 1
//       let left = arr.slice(0, mid)
//       let right = arr.slice(mid)
//       return mergeArr(divide(left), divide(right))
//   }

//   divide(nums)
//   //3.返回累加的次数
//   return count
// }


const arr = [2,4,3,5,1]
console.log(reversePairs(arr))

//方法一:暴力解题
// function reversePairs(nums){
//   let count = 0
//   for(var i = 0; i < arr.length; i++) {
//    for(var j = i +1; j < arr.length; j++){
//     if(nums[i] > nums[j] * 2){
//       count += 1
//     }
//    }
//   }
//   return count
// }

//时间复杂度:O(N^2)
//空间复杂度:O(N)

//方法二:归并法

function reversePairs(nums){

  let count = 0;

  //合并数组
  const mergeArr = (left, right) =>{
    let i = 0; j = 0;
    while(i < left.length && j < right.length){
      if(left[i]/2 > right[j]){
        count +=left.length -i
        j++
      }else{
        i++
      }
    }
    return [...left, ...right].sort((a,b)=> a-b)
  }

  //实现归并的方法
  const divide = (arr) => {
    if(arr.length <= 1) return arr
    let mid = arr.length >> 1
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)
    return mergeArr(divide(left),divide(right))
  }
  divide(nums)
  return count
}

//时间复杂度:O(nlog)
//空间复杂度 :O(N)