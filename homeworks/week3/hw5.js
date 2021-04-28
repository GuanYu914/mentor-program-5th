const { strict } = require('assert');
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
    var sets = lines[0]
    var info = []
    for (var i = 0; i < sets; i++) {
        info = lines[i+1].split(' ')
        console.log(isWin(info[0], info[1], info[2]))
    }
}

function isWin(a, b, cond) {
    if (Number(cond) === 1) { // 找較大者
        if (a.length === b.length) {
            for(var i = 0; i < a.length; i++) {
                if (Number(a[i]) > Number(b[i]))
                {
                    return 'A'
                } else if (Number(b[i] > Number(a[i]))) {
                    return 'B'
                }
            }
            return 'DRAW'
        } else if (a.length > b.length) { // 字串長度較長者，數值一定較大
            return 'A'
        } else if (b.length > a.length) {
            return 'B'
        }
    } else {                  // 找較小者
        if (a.length === b.length) {
            for(var i = 0; i < a.length; i++) {
                // console.log('a[i]: ', a[i])
                // console.log('b[i]: ', b[i])
                if (Number(a[i]) < Number(b[i]))
                {
                    return 'A'
                } else if (Number(b[i] < Number(a[i]))) {
                    return 'B'
                }
            }
            return 'DRAW'
        } else if (a.length < b.length) { // 字串長度較短者，數值一定較小
            return 'A'
        } else if (b.length < a.length) {
            return 'B'
        }
    }
}