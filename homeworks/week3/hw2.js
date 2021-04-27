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
    var input = lines[0].split(' ')
    var N = Number(input[0])
    var M = Number(input[1])
    var e = 0                  // 紀錄數字幾個位元
    var digit_arr = []         // 儲存個別位元的陣列
    var sum = 0                // 儲存每隔位元的位元次方的總和
    var res = ''               // 結果字串

    
    for (var i = N; i <= M; i++) {
        sum = 0
        e = Number(i.toString().length)      // 判斷數字幾個位元，並拿來做次方運算
        digit_arr = i.toString().split('')   // 將數字分解成位元陣列
        
        for (var j = 0; j < e; j++) {        // 運算每個位元的位元次方的總和
            sum += exp(digit_arr[j], e)     
        }

        if (i === sum) {                     // 根據水仙花數定義，判斷是否為是
            res += i.toString() + '\n'
        }
    }
    console.log(res)
}

// 拿來取次方
function exp (num, e) {
    var res = 1
    
    for (var i = 0; i < e; i++) {
        res *= num
    }
    return res
}