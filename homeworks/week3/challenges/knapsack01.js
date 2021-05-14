/**
 * LIOJ 1052 解題 code
 * 可以使用 recursive 或搭配 dynamic programing 加速
 * 參考影片: https://www.youtube.com/watch?v=xOlhR_2QCXY&ab_channel=CSDojo
 */
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin })

const lines = []

// DP Array
/*
const dp = Array.from(Array(20), () => new Array(100))
for (let i = 0; i < dp.length; i++) {
  for (let j = 0; j < dp[i].length; j++) {
    dp[i][j] = undefined
  }
}
*/
// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => { lines.push(line) })

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => { solve(lines) })

function solve(lines) {
  const n = Number(lines[0].split(' ')[0])
  const limitWei = Number(lines[0].split(' ')[1])

  const arrWei = []
  const arrValue = []

  for (let i = 0; i < n; i++) {
    arrWei[i] = Number(lines[i + 1].split(' ')[0]) // 讀入每個物品的重量
    arrValue[i] = Number(lines[i + 1].split(' ')[1]) // 讀入每個物品的價值
  }

  console.log(knapsack(arrWei, arrValue, n, limitWei)) // 在有限空間中，找出最多價值的組合
}

/**
 * recursive 版本
 * arrWei   -> 物品重量
 * arrValue -> 物品價值
 * n        -> 物品索引值
 * c        -> 目前背包空間
 */

function knapsack(arrWei, arrValue, n, c) {
  if (n === 0 || c === 0) { // 若沒有物品了或背包裝不了，回傳 0
    return 0
  } else if (arrWei[n - 1] > c) { // 若物品的重量大於背包能放的重量
    return knapsack(arrWei, arrValue, n - 1, c)
  } else { // 比較如果放入該物品或不放該物品的價值，取最大的
    const tmp1 = knapsack(arrWei, arrValue, n - 1, c)
    const tmp2 = arrValue[n - 1] + knapsack(arrWei, arrValue, n - 1, c - arrWei[n - 1])
    const res = (tmp1 > tmp2) ? tmp1 : tmp2
    return res
  }
}

/**
 * recursive with DP ver.
 * arrWei   -> 物品重量
 * arrValue -> 物品價值
 * n        -> 物品索引值
 * c        -> 目前背包空間
 *
 * 利用陣列先前儲存的結果，加速遞迴的運算過程
 */
/*
function knapsack(arrWei, arrValue, n, c) {
  if (dp[n][c] !== undefined) { // 若在[n][c]找到先前計算的數值，直接回傳不必再做一次
    return dp[n][c]
  } else if (n === 0 || c === 0) {
    dp[n][c] = 0
    return 0
  } else if (arrWei[n - 1] > c) {
    return knapsack(arrWei, arrValue, n - 1, c)
  } else {
    const tmp1 = knapsack(arrWei, arrValue, n - 1, c)
    const tmp2 = arrValue[n - 1] + knapsack(arrWei, arrValue, n - 1, c - arrWei[n - 1])
    const res = (tmp1 > tmp2) ? tmp1 : tmp2
    dp[n][c] = res // 使用 n*c 二維陣列儲存每次的運算結果
    return res
  }
}
*/
