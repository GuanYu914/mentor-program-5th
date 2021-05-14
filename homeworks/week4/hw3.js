/**
 * 你的好麻吉小立是一個很愛到處旅遊的人，在前一陣子才靠著便宜的 bug 機票以及特價的商務艙玩遍了許多地方。
 * 不過小立一直有個困擾，那就是他希望了解更多跟國家有關的知識，因此他來請你幫忙寫一個搜尋國家資訊的小程式。
 * 這個程式很簡單，只要輸入國家的英文名字，就能夠查詢符合的國家的資訊，會輸出以下幾項：
 *
 * 1. 國家名稱
 * 2. 首都
 * 3. 使用的貨幣名稱
 * 4. 電話國碼
 */

const process = require('process')
const request = require('request')

let url = 'https://restcountries.eu/rest/v2'

getInfoByName(process.argv[2])

function getInfoByName(searchName) {
  url += `/name/${searchName}`
  request(url, (error, response, body) => {
    // 抓蟲用
    // console.error('error:', error)
    // console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)
    const json = JSON.parse(body)
    // console.log(json)
    if (response.statusCode === 200) {
      for (let i = 0; i < json.length; i++) {
        console.log('============')
        console.log(`國家：${json[i].name}`)
        console.log(`首都：${json[i].capital}`)
        console.log(`貨幣：${json[i].currencies[0].code}`)
        console.log(`國碼：${json[i].callingCodes}`)
      }
    } else if (response.statusCode === 404) {
      console.log('找不到國家資訊')
    } else {
      console.log(`request 過程當中發生錯誤，Http 狀態碼為 ${response.statusCode}`)
    }
  })
}
