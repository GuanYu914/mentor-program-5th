/**
 * 之前幫秋秋鞋做完那個小程式以後，你會寫程式的消息似乎就傳開了，有一位 Twitch 平台實況主果凍跑來聯繫你，想請你幫忙做個東西。
 * 事情是這樣的，他原本是 LOL 的玩家，但因為某些原因帳號被 ban 掉了，為了維持實況的熱度，需要去找其他遊戲來玩，可是他又不知道哪些遊戲比較熱門，會有比較多人觀看。
 * 因此，他寫請你寫一個小程式，能夠去撈取 Twitch 上面受歡迎的遊戲，他就能夠參考這個列表來決定要實況哪個遊戲。
 * 由於你偶爾也會看他的實況，所以你欣然接受了這個挑戰，準備來串串看真實世界的 API。
 * 請參考 Twitch API v5 的文件，寫一隻程式去呼叫 Twitch API，並拿到「最受歡迎的遊戲列表（Get Top Games）」，並依序印出目前觀看人數跟遊戲名稱。
 * 在這個作業中，你必須自己看懂 Twitch API 的文件，知道怎麼去申請一個 Application 拿到 ClientID，並且在 API 文件當中找到對的那一個 API（Get Top Games），而且務必記得要在 request header 中帶上 ClientID 跟另一個參數 Accept，值是：application/vnd.twitchtv.v5+json。
 * 還有一件事情要提醒大家，Twitch API 有兩個版本，一個是最新版（New Twitch API，代號 Helix），一個是舊版的（Twitch API v5，代號 kraken），我們這次要串接的是舊版的，不要搞錯版本囉。
 */

const request = require('request')

const urlTarget = 'https://api.twitch.tv/kraken/games/top'

const options = {
  url: urlTarget,
  headers: { // 添加使用舊版 Twitch API 的規範 Header
    Accept: 'application/vnd.twitchtv.v5+json', // 舊版 API 都必須添加的
    'Client-ID': 'c1yk5e1n85nan22a60u0qzvjyu2rpf' // 申請使用 Twitch api 的 Client ID
  }
}

function callback(error, response, body) {
  let jsonInfo
  if (!error && response.statusCode >= 200 && response.statusCode < 300) {
    try {
      jsonInfo = JSON.parse(body)
    } catch (e) {
      console.log(`解析 json 時發生錯誤：${e}`)
      return
    }
    for (let i = 0; i < jsonInfo.top.length; i++) { // 詳細 JSON 回傳格式請參閱 https://dev.twitch.tv/docs/v5/reference/games
      console.log(`${jsonInfo.top[i].viewers} ${jsonInfo.top[i].game.name}`)
    }
  }
}

request(options, callback) // 發送 Request
