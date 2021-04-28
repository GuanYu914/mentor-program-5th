var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', function (line) {
  lines.push(line)
});

// 輸入結束，開始針對 lines 做處理
rl.on('close', function() {
   solve(lines)
})

function solve (lines) {
    var str = lines[0].toString()

    if (reverse(str) === str) {
        console.log('True')
    } else {
        console.log('False')
    }
}

function reverse (str) {
    var res = ''

    for (var i = str.length-1; i >= 0; i--) {
        res += str[i]    
    }

    return res
}