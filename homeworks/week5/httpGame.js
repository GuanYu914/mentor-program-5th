/**
 * 安安，歡迎來到 Lidemy HTTP Challenge。
 * 
 * 這裡一共有 10 道關卡，每一關的網址皆為 /lvX，X 即為關卡的數字。
 * 但只知道網址是沒有用的，需要搭配正確的 token 才能順利進入關卡，傳入 token 的方式為 query string，例如 /lv1?token=xxx。
 * 
 * 另外，為了讓你方便辨別這是 token，token 的內容一定是用一個大括弧刮起來的字串。
 * 每一關都會有提示，只要按照提示照著做，就能拿到前往下一關的 token。
 * 
 * 你可以用任何你擅長的工具來通關，只靠瀏覽器的話有些關卡是沒辦法通過的喔！
 * 準備好了嗎？
 * 
 * 第一關的 token 為：{GOGOGO}
 * 
 * 附註：所以第一關網址為 /lv1?token={GOGOGO}，不是 /lv1?token=GOGOGO，之後的關卡也是一樣
 * 如果你需要提示的話，在網址最後面加上 &hint=1 就會看到提示了，例如說：/lv1?token={GOGOGO}&hint=1
 * 
 * 圖書館系統v1: https://gist.github.com/aszx87410/3873b3d9cbb28cb6fcbb85bf493b63ba
 * 圖書館系統v2: https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a
 */

const request = require('request')
const process = require('process')

/**
 * 我前陣子在整理書籍的時候看到了一本我很喜歡的書，可是現在卻怎麼想都想不起來是哪一本...
 * 我只記得那本書的 id 是兩位數，介於 54~58 之間，你可以幫幫我嗎？
 * 找到是哪一本之後把書的 id 用 GET 傳給我就行了。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv2?token={HellOWOrld}
 */


let input = process.argv[2]
let BASEURL = `https://lidemy-http-challenge.herokuapp.com/api/books/${input}`


request(BASEURL,
  function (error, response, body) {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })


/**
 * 真是太感謝你幫我找到這本書了！
 * 
 * 剛剛在你找書的時候有一批新的書籍送來了，是這次圖書館根據讀者的推薦買的新書，其中有一本我特別喜歡，想要優先上架。
 * 書名是《大腦喜歡這樣學》，ISBN 為 9789863594475。
 * 
 * 就拜託你了。
 * 新增完之後幫我把書籍的 id 用 GET 告訴我。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv3?token={5566NO1}
 */

/*
BASEURL = `https://lidemy-http-challenge.herokuapp.com/api/books`

request.post({
  url: BASEURL,
  form: {
    name: '大腦喜歡這樣學',
    ISBN: '9789863594475'
 }
},
  function (err, httpResponse, body) {
    console.log('status code: ', httpResponse.statusCode);
    const json = JSON.parse(body)
    console.log(json)
  })
*/

/**
 * 
 * 我翻了一下你之前幫我找的那本書，發現我記錯了...這不是我朝思暮想的那一本。
 * 我之前跟你講的線索好像都是錯的，我記到別本書去了，真是抱歉啊。
 * 我記得我想找的那本書，書名有：「世界」兩字，而且是村上春樹寫的，可以幫我找到書的 id 並傳給我嗎？
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv4?token={LEarnHOWtoLeArn}
 */

/*
BASEURL = encodeURI(`https://lidemy-http-challenge.herokuapp.com/api/books?q=世界`) //使用 encodeURI 解決 URL 有中文無法正常運作

request(BASEURL,
  function (error, response, body) {
    console.log('statusCode:', response.statusCode)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 * 昨天有個人匆匆忙忙跑過來說他不小心捐錯書了，想要來問可不可以把書拿回去。
 * 跟他溝通過後，我就把他捐過來的書還他了，所以現在要把這本書從系統裡面刪掉才行。
 *
 * 那本書的 id 是 23，你可以幫我刪掉嗎？
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv5?token={HarukiMurakami}
 */

/*
BASEURL = `https://lidemy-http-challenge.herokuapp.com/api/books/23`

request.del(BASEURL,
  function (error, response, body) {
    console.log('statusCode:', response.statusCode)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 * 我終於知道上次哪裡怪怪的了！
 * 照理來說要進入系統應該要先登入才對，怎麼沒有登入就可以新增刪除...
 * 這太奇怪了，我已經回報給那邊的工程師了，他們給了我一份新的文件：https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a。
 *
 * 這邊是帳號密碼，你先登入試試看吧，可以呼叫一個 /me 的 endpoint，裡面會給你一個 email。
 * 把 email 放在 query string 上面帶過來，我看看是不是對的。
 *
 * 帳號：admin
 * 密碼：admin123
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv6?token={CHICKENCUTLET}
 */

/*
const username = 'admin'
const password = 'admin123'

const url = 'http://' + username + ':' + password + '@lidemy-http-challenge.herokuapp.com/api/v2/me';
// console.log(url);

request({ url },
  function (error, response, body) {
    console.log(`status code: ${response.statusCode}`)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 * 那邊的工程師說系統整個修復完成了，剛好昨天我們發現有一本書被偷走了...
 * 這本書我們已經買第五次了，每次都被偷走，看來這本書很熱門啊。
 * 我們要把這本書從系統裡面刪掉，就拜託你了。
 *
 * 對了！記得要用新的系統喔，舊的已經完全廢棄不用了。
 * 書的 id 是 89。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv7?token={SECurityIsImPORTant}
 */

/*
const username = 'admin'
const password = 'admin123'

const url = 'http://' + username + ':' + password + '@lidemy-http-challenge.herokuapp.com/api/v2/books/89';
// console.log(url);

request.del({ url },
  function (error, response, body) {
    console.log(`status code: ${response.statusCode}`)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 * 我昨天在整理書籍的時候發現有一本書的 ISBN 編號跟系統內的對不上，仔細看了一下發現我當時輸入系統時 key 錯了。
 * 哎呀，人老了就是這樣，老是會看錯。
 *
 * 那本書的名字裡面有個「我」，作者的名字是四個字，key 錯的 ISBN 最後一碼為 7，只要把最後一碼改成 3 就行了。
 * 對了！記得要用新的系統喔，舊的已經完全廢棄不用了。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv8?token={HsifnAerok}
 */

/*
const username = 'admin'
const password = 'admin123'
*/

// 先做查詢
/*
let getURL = encodeURI('http://' + username + ':' + password + '@lidemy-http-challenge.herokuapp.com/api/v2/books?q=我') //使用 encodeURI 解決 URL 有中文無法正常運作
// console.log(url);

request({ url: getURL },
  function (error, response, body) {
    // console.log(error)
    console.log(`status code: ${response.statusCode}`)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

// 再做更新書籍資訊
/*
patchURL = 'http://' + username + ':' + password + '@lidemy-http-challenge.herokuapp.com/api/v2/books/72'

request.patch({
  url: patchURL,
  form: {
    name: '日日好日：茶道教我的幸福15味【電影書腰版】',
    ISBN: '9981835423'
  }
},
  function (err, response, body) {
    console.log(`開始更新...`)
    console.log(`status code: ${response.statusCode}`)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 *
 * API 文件裡面有個獲取系統資訊的 endpoint 你記得嗎？
 * 工程師跟我說這個網址不太一樣，用一般的方法是沒辦法成功拿到回傳值的。
 *
 * 想要存取的話要符合兩個條件：
 * 1. 帶上一個 X-Library-Number 的 header，我們圖書館的編號是 20
 * 2. 伺服器會用 user agent 檢查是否是從 IE6 送出的 Request，不是的話會擋掉
 *
 * 順利拿到系統資訊之後應該會有個叫做 version 的欄位，把裡面的值放在 query string 給我吧。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN}
 */

/*
const username = 'admin'
const password = 'admin123'

let getURL = encodeURI('http://' + username + ':' + password + '@lidemy-http-challenge.herokuapp.com/api/v2/sys_info')
// console.log(url);

request({
  url: getURL,
  headers: {
    'X-Library-Number': '20',
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)' // 偽造的 IE6 Req Header
  }
},
  function (error, response, body) {
    // console.log(error)
    console.log(`status code: ${response.statusCode}`)
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log(json)
    }
  })
*/

/**
 * 時間過得真快啊，今天是你在這邊幫忙的最後一天了。
 * 我們來玩個遊戲吧？你有玩過猜數字嗎？
 *
 * 出題者會出一個四位數不重複的數字，例如說 9487。
 * 你如果猜 9876，我會跟你說 1A2B，1A 代表 9 位置對數字也對，2B 代表 8 跟 7 你猜對了但位置錯了。
 *
 * 開始吧，把你要猜的數字放在 query string 用 num 當作 key 傳給我。
 * 
 * 請在瀏覽器上輸入此網址: https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}
 */

/*
// 用來輸入要猜的數字
let input = process.argv[2]
request(`https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}&num=${input}`,
  function (error, response, body) {
    console.log('body:', body)
  })
*/