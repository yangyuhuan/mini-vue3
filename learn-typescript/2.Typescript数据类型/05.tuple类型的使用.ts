//元组和数组的区别
//数组中通常建议存放相同类型的元素,不同类型的元素是不推荐放在数组中
//元组中每个元素都有自己的特性类型,根据索引值获取到的值可以确定对应的类型

//数组类型
const info:(string|number)[] = ['why', 18, 1.88]
const item = info[0] //不能确定类型

//元组类型
const tInfo:[string,number,number] = ['why', 18, 1.88]
const item2 = tInfo[0]  // 一定是string类型