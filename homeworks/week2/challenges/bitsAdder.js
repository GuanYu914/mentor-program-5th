// 使用 32 bits 加法器實作
// a, b 輸入範圍 0 - 4294967295 (2 ^ 32 - 1)

function add(a, b) {
  console.log('二進位A', a)
  console.log('二進位B', b)
  // 將數值轉換成二進位字串
  const x = a.toString(2)
  const y = b.toString(2)

  const digitArrX = []
  const digitArrY = []
  let tmp = 0
  let res = ''

  // 初始化用來做加法運算的位元字串陣列
  for (let i = 0; i < 32; i++) {
    digitArrX[i] = '0'
    digitArrY[i] = '0'
  }

  // 將二進位字串轉換成位元陣列
  for (let i = 0; i < x.length; i++) {
    digitArrX[31 - i] = x[x.length - 1 - i]
  }
  for (let i = 0; i < y.length; i++) {
    digitArrY[31 - i] = y[y.length - 1 - i]
  }

  // 使用加法器進行運算
  tmp = adder32Bit(digitArrX, digitArrY, 0)

  // 將結果轉成 10 進位回傳
  res = tmp.c.toString()
  // 將字串中的空白刪除
  res += tmp.s.replace(/\s/g, '')
  // console.log(res)
  res = parseInt(res, 2)

  return res
}

function Adder1Bit(a, b, c) {
  return {
    c: (a & b) | (b & c) | (a & c),
    s: a ^ b ^ c
  }
}

function adder4Bit(a, b, c) {
  const adder1 = Adder1Bit(a[3], b[3], c)
  const adder2 = Adder1Bit(a[2], b[2], adder1.c)
  const adder3 = Adder1Bit(a[1], b[1], adder2.c)
  const adder4 = Adder1Bit(a[0], b[0], adder3.c)
  return {
    s: [adder4.s, adder3.s, adder2.s, adder1.s].join(' '),
    c: adder4.c
  }
}

function adder16Bit(a, b, c) {
  const adder1 = adder4Bit([a[12], a[13], a[14], a[15]],
    [b[12], b[13], b[14], b[15]], c)
  const adder2 = adder4Bit([a[8], a[9], a[10], a[11]],
    [b[8], b[9], b[10], b[11]], adder1.c)
  const adder3 = adder4Bit([a[4], a[5], a[6], a[7]],
    [b[4], b[5], b[6], b[7]], adder2.c)
  const adder4 = adder4Bit([a[0], a[1], a[2], a[3]],
    [b[0], b[1], b[2], b[3]], adder3.c)
  return {
    s: [adder4.s, adder3.s, adder2.s, adder1.s].join(' '),
    c: adder4.c
  }
}

function adder32Bit(a, b, c) {
  const adder1 = adder16Bit([a[16], a[17], a[18], a[19], a[20], a[21], a[22], a[23], a[24], a[25], a[26], a[27], a[28], a[29], a[30], a[31]],
    [b[16], b[17], b[18], b[19], b[20], b[21], b[22], b[23], b[24], b[25], b[26], b[27], b[28], b[29], b[30], b[31]], c)
  const adder2 = adder16Bit([a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]],
    [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]], adder1.c)

  return {
    s: [adder2.s, adder1.s].join(' '),
    c: adder2.c
  }
}

// 測試資料
// console.log(Adder1Bit(1, 1, 1))
// console.log(adder4Bit([1, 1, 1, 1], [1, 1, 1, 1] , 0))
/*
console.log(adder16Bit([1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
                       [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0], 0))
*/
/*
console.log(adder32Bit([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 0))
*/

console.log('\nA + B 結果為: ', add(4294967295, 4294967295))
