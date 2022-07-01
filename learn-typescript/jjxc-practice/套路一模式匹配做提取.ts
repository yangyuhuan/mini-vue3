//promise
type p = Promise<'guang'>
type GetValueType<P> = p extends Promise<infer Value>? Value: never
type GetValueResult = GetValueType<Promise<'guang'>>

//数组类型 Fist
type arr = [1,2,3]
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never
type GetFistResult = GetFirst<[]>

//数组类型 Last
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last: never
type GetLastResult = GetLast<[1,2,3]>

//数组类型 PopArr
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest,unknown] ? Rest : never
type PopResult = PopArr<[1,2,3]>


//数组类型 ShiftArr
type ShiftArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [unknown,...infer Rest] ? Rest : never
type PopResult2 = ShiftArr<[1,2,3]>

//字符串类型 Startwith
type Startwith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type StartwithRulst =Startwith<'guang an ','guang'>

//字符串类型 Replace
type ReplaceStr<Str extends string,From extends string,To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ?`${Prefix}${To}${Suffix}`:Str

type ReplaceResult = ReplaceStr<"yummy's best friend is ?", '?','lily'>