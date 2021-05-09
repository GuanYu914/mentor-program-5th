function join(arr, concatStr) {
  let res = ''
  for (let i = 0; i < arr.length; i++) {
    // 最後一個不加連接元
    if (i === arr.length - 1) {
      res += arr[i]
    } else {
      res += arr[i]
      res += concatStr
    }
  }

  return res
}

function repeat(str, times) {
  let res = ''
  for (let i = 0; i < times; i++) {
    res += str
  }

  return res
}

console.log(join([1, 2, 3], ''))
console.log(repeat('a', 5))
