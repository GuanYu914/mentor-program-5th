// 不能使用 BigInt 這個資料型態
function multiply(a, b) {
  const calLength = a.length + b.length
  const calArrOfA = []
  const calArrOfB = []
  const calArrSum = []
  let numCarry = 0
  let res = ''

  // 初始化陣列
  for (let i = 0; i < calLength; i++) {
    calArrOfA[i] = 0
    calArrOfB[i] = 0
    calArrSum[i] = 0
  }
  // 將數值移動到陣列最右邊
  for (let i = 0; i < a.length; i++) {
    calArrOfA[i + calLength - a.length] = Number(a[i])
  }

  for (let i = 0; i < b.length; i++) {
    calArrOfB[i + calLength - b.length] = Number(b[i])
  }

  //  console.log(calArrOfA)
  //  console.log(calArrOfB)

  // 直式乘法計算
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      // console.log('B[',calLength-1-i,']: ',calArrOfB[calLength - 1 - i])
      // console.log('A[',calLength-1-j,']: ',calArrOfA[calLength - 1 - j])
      calArrSum[(calLength - 1) - i - j] += calArrOfB[(calLength - 1) - i] * calArrOfA[calLength - 1 - j]
    }
  }

  // 處理個別進位
  for (let i = calLength - 1; i >= 0; i--) {
    numCarry = Math.floor(calArrSum[i] / 10)
    if (numCarry) {
      calArrSum[i] %= 10
      calArrSum[i - 1] += numCarry
    }
  }

  // 轉成字串陣列格式
  let disFlag = false
  for (let i = 0; i < calArrSum.length; i++) {
    if (calArrSum[i]) { // 隱蔽 0 的輸出，直到碰到不為 0 的整數
      disFlag = true
    }
    if (disFlag) {
      res += calArrSum[i].toString()
    }
  }

  return res
}

// 結果輸出
const testNum = multiply('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999', '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
console.log('結果輸出')
console.log(testNum)

// 將上述執行的結果直接透過 Number 形式輸出，發現不能精準輸出每個數值
console.log('\n未使用 BigInt 型態')
console.log(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001)

console.log('\n使用 BigInt 型態')
console.log(999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n)
