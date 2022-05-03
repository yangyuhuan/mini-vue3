function* fib(max) {
  var
      t,
      a = 0,
      b = 1,
      n = 0;
  while (n < max) {
      console.log("--------------------------",a,b)
      yield a;
      [a, b] = [b, a + b];
      console.log("++++++++++++++++++++++++++",a,b)
      n ++;
  }
  return;
}

for (var x of fib(10)) {
  console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}