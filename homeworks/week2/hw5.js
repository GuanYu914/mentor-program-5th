function join(arr, concatStr) {
    var res = ''
    
    for (var i = 0; i < arr.length; i++) {
        if (i === arr.length-1) {  // 最後一個不加連接元
            res += arr[i] 
        } else {
            res += arr[i]
            res += concatStr
        }
    }

    return res
}

function repeat(str, times) {
    var res = ''
    
    for (var i = 0; i < times; i++) {
        res += str
    }

    return res
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
