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
  const n = Number(lines[0])

  for (let i = 0; i < n; i++) {
    console.log(isPrime(Number(lines[i + 1])))
  }
}

function isPrime(n) {
  if (n === 1) return 'Composite'

  for (let i = 2; i < n; i++) { // 假如找到除了 1 跟 本身以外的數值，則回傳不是質數
    if (n % i === 0) {
      return 'Composite'
    }
  }
  return 'Prime'
}
