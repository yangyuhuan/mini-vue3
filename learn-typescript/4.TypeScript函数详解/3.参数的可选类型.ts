//可选类型是必须写在必选类型的后面的
function foo(x: number, y?: number) {}

foo(20, 30);
foo(20);

export {};
