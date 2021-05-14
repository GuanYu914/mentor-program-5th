const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => { lines.push(line) })

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => { solve(lines) })

function solve(lines) {
  const input = lines[0].split(' ')
  const N = Number(input[0])
  const M = Number(input[1])

  // 紀錄數字幾個位元
  let e = 0
  // 儲存個別位元的陣列
  let digitArr = []
  // 儲存每隔位元的位元次方的總和
  let sum = 0
  // 結果字串
  let res = ''

  for (let i = N; i <= M; i++) {
    sum = 0
    // 判斷數字幾個位元，並拿來做次方運算
    e = Number(i.toString().length)
    // 將數字分解成位元陣列
    digitArr = i.toString().split('')
    // 運算每個位元的位元次方的總和
    for (let j = 0; j < e; j++) {
      sum += exp(digitArr[j], e)
    }
    // 根據水仙花數定義，判斷是否為是
    if (i === sum) {
      res += `${i.toString()}\n`
    }
  }
  console.log(res)
}

// 拿來取次方
function exp(num, e) {
  let res = 1

  for (let i = 0; i < e; i++) {
    res *= num
  }
  return res
}
