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
  const N = Number(lines[0])
  // console.log(N)
  let tmp = ''

  for (let i = 0; i < N; i++) {
    tmp = ''
    for (let j = 0; j <= i; j++) {
      tmp += '*'
    }
    console.log(tmp)
  }
}
