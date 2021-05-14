/* eslint-disable prefer-destructuring */
/**
 * 原本以為上次就已經是最後一次幫忙，沒想到秋秋鞋還是又跑來找你了。他說他想要更多功能，他想把這整個書籍資料庫當作自己的來用，必須能夠顯示前 20 本書的資料、刪除、新增以及修改書本，這樣他就可以管理自己的書籍了。
 * （跟 hw1 不同，之前是 10 本，這次要顯示 20 本）
 * 雖然你很想問他說為什麼不用 Excel 就好，但你問不出口，再加上你最近剛學程式需要練習的機會，於是你就答應了。
 * 請閱讀開頭給的 API 文件並串接，用 node.js 寫出一個程式並接受參數，輸出相對應的結果，範例如下：
 * node hw2.js list // 印出前二十本書的 id 與書名
 * node hw2.js read 1 // 輸出 id 為 1 的書籍
 * node hw2.js delete 1 // 刪除 id 為 1 的書籍
 * node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
 * node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name
 */

const request = require('request')
const process = require('process')

let host = 'https://lidemy-book-store.herokuapp.com/books'

const op = process.argv[2]
let id, name

switch (op) {
  case 'list':
    apiList()
    break
  case 'read':
    id = process.argv[3]
    apiRead(id)
    break
  case 'delete':
    id = process.argv[3]
    apiDelete(id)
    break
  case 'create':
    name = process.argv[3]
    apiCreate(name)
    break
  case 'update':
    id = process.argv[3]
    name = process.argv[4]
    apiUpdate(id, name)
    break
}

function apiList() {
  host += '?_limit=20'
  request(host, (error, response, body) => {
    const json = JSON.parse(body)
    console.log('印出前 20 名的書籍')
    for (let i = 0; i < 20; i++) {
      console.log(`${i + 1}. ${json[i].name}`)
    }
  })
}

function apiRead(id) {
  host += `/${id}`
  request(host, (error, response, body) => {
    const json = JSON.parse(body)
    console.log(json.name)
  })
}

function apiDelete(id) {
  host += `/${id}`
  request.del({
    url: host,
    function(err, httpResponse, body) {
      console.log(body)
    }
  })
  console.log(`已刪除位於 ${id} 所在的書籍`)
}

function apiCreate(bookName) {
  request.post({
    url: host,
    form: {
      name: bookName
    },
    function(err, httpResponse, body) {
      console.log(body)
    }
  })
  console.log(`已新增 ${bookName} 書籍`)
}

function apiUpdate(id, bookName) {
  host += `/${id}`
  request.patch({
    url: host,
    form: {
      name: bookName
    },
    function(err, httpResponse, body) {
      console.log(body)
    }
  })
  console.log(`已更新位於 ${id} 的書籍，並改名為${bookName}`)
}
