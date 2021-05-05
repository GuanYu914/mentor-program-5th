const process = require('process')
const request = require('request')

let url = `https://restcountries.eu/rest/v2`

getInfoByName(process.argv[2])

function getInfoByName (searchName) {
    url += `/name/${searchName}`
    request(url,
    function (error, response, body) {
    // 抓蟲用
    // console.error('error:', error)
    // console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)
    let json = JSON.parse(body)
    // console.log(json)
    if (response.statusCode === 200) {
        for (let i = 0; i < json.length; i++) {
            console.log(`============`);
            console.log(`國家：${json[i].name}`);
            console.log(`首都：${json[i].capital}`);
            console.log(`貨幣：${json[i].currencies[0].code}`);
            console.log(`國碼：${json[i].callingCodes}`)
        }
    } else if (response.statusCode === 404) {
        console.log(`找不到國家資訊`);
    } else {
        console.log(`request 過程當中發生錯誤，Http 狀態碼為 ${response.statusCode}`);
    }
    });
}