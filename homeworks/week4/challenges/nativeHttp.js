/* eslint-disable object-shorthand */
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
 *
 * 這週的作業我們都是使用 request 這個 library 來發送 request，但其實 request 這個套件也是使用 Node.js 原生提供的 library。
 * 因此，這週的超級挑戰題就是讓你試試看能否不用 request，只用 Node.js 內建的套件來發出 request，並且改寫 hw2，改寫成只用原生
 * 的 library。你會使用到的原生套件應該是這個：https.request(url[, options][, callback])，就祝你順利囉！
 */

const https = require('https')
const process = require('process')

const hostUrl = 'lidemy-book-store.herokuapp.com'

const op = process.argv[2]
let id, name

switch (op) {
  case 'list':
    console.log('列出前 20 名的書籍清單...')
    apiList()
    break
  case 'read':
    id = process.argv[3]
    if (id !== undefined) {
      console.log(`讀取位於編號 ${id} 的書籍名稱...`)
      apiRead(id)
    } else {
      console.log('請輸入參數')
    }
    break
  case 'delete':
    id = process.argv[3]
    if (id !== undefined) {
      apiDelete(id)
    } else {
      console.log('請輸入參數')
    }
    break
  case 'create':
    name = process.argv[3]
    if (name !== undefined) {
      apiCreate(name)
    } else {
      console.log('請輸入參數')
    }
    break
  case 'update':
    id = process.argv[3]
    name = process.argv[4]
    if (id !== undefined && name !== undefined) {
      apiUpdate(id, name)
    } else {
      console.log('請輸入參數')
    }
    break
  default:
    console.log('輸入了錯誤的參數...')
    break
}

function apiList() {
  const options = {
    hostname: hostUrl,
    port: 443,
    path: '/books?_limit=20',
    method: 'GET'
  }

  const req = https.request(options, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      res.on('data', (d) => {
        const json = JSON.parse(d)
        for (let i = 0; i < json.length; i++) {
          console.log(`${json[i].id} ${json[i].name}`)
        }
      })
    } else {
      console.log(`http 錯誤代碼：${res.statusCode}`)
    }
  })

  req.on('error', (e) => {
    console.log(`發送 req 錯誤：${e}`)
  })
  req.end()
}

function apiRead(id) {
  const options = {
    hostname: hostUrl,
    port: 443,
    path: `/books/${id}`,
    method: 'GET'
  }

  const req = https.request(options, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      res.on('data', (d) => {
        const json = JSON.parse(d)
        console.log(`${json.name}`)
      })
    } else {
      console.log('HTTP 狀態代碼: ', res.statusCode)
    }
  })

  req.on('error', (e) => {
    console.log(`發送 req 錯誤：${e}`)
  })
  req.end()
}

function apiDelete(id) {
  const options = {
    hostname: hostUrl,
    port: 443,
    path: `/books/${id}`,
    method: 'DELETE'
  }

  const req = https.request(options, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`已刪除位於 ${id} 的書籍`)
    } else {
      console.log('HTTP 狀態代碼: ', res.statusCode)
    }
  })

  req.on('error', (e) => {
    console.log(`發送 req 錯誤：${e}`)
  })
  req.end()
}

function apiCreate(name) {
  const postData = JSON.stringify({
    name: name
  })

  // console.log(postData);
  const options = {
    hostname: hostUrl,
    port: 443,
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const req = https.request(options, (res) => {
    res.setEncoding('utf8')
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('新增書籍成功！')
    } else {
      console.log('HTTP 狀態代碼: ', res.statusCode)
    }
  })

  req.on('error', (e) => {
    console.log(`發送 req 錯誤：${e}`)
  })

  req.write(postData)
  req.end()
}

function apiUpdate(id, name) {
  const postData = JSON.stringify({
    name: name
  })

  const options = {
    hostname: hostUrl,
    port: 443,
    path: `/books/${id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const req = https.request(options, (res) => {
    res.setEncoding('utf8')
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`已更新位於編號 ${id} 的名稱為 ${name}`)
    } else {
      console.log('HTTP 狀態代碼: ', res.statusCode)
    }
  })

  req.on('error', (e) => {
    console.log(`發送 req 錯誤：${e}`)
  })

  req.write(postData)
  req.end()
}
