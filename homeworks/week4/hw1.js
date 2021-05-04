/**
 * 有一天，住你隔壁的鄰居秋秋鞋跑來按門鈴，說有事想要找你討論，他最近在做一個知識型的 YouTube 頻道，可是快要沒有靈感了。
 * 這時，他想到一個好主意！他只要能夠看到書店提供的書籍相關資訊，就可以從中汲取靈感，之後就可以發想相關題材，頻道就不會一直不更新了。
 * 身為秋秋鞋的好朋友，這個重責大任當然就交給你了！
 * 請閱讀開頭給的 API 文件並串接，用 node.js 寫出一個程式，執行後會在 console 列出前十本書籍的 id 以及書名。
 * 順帶一提，叫做秋秋鞋是因為他很喜歡秋天。
 * 
 * 範例.
 * node hw1.js
 * 1 克雷的橋
 * 2 當我想你時，全世界都救不了我
 * 3 我殺的人與殺我的人
 * ....
 */

const request = require('request')

const host = 'https://lidemy-book-store.herokuapp.com/books?_limit=10'
 
request(host, 
         function (error, response, body) {
         const json = JSON.parse(body)
        for (let i = 0; i < 10; i++) {
        console.log(`${i+1}. ${json[i].name}`);
        }
});