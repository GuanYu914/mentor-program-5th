/**
 * 寫一個 node.js 的程式並串接 Twitch API，接收一個參數是遊戲名稱，輸出那個遊戲底下
 * 最受歡迎的前 200 個實況的名稱與 id。
 * 
 * 參考以下 Twitch API 方法實作
 * https://dev.twitch.tv/docs/api/reference#get-games
 * https://dev.twitch.tv/docs/api/reference#get-streams
 */

const process = require('process')
const request = require('request')

let gameName = process.argv[2]
let client_id = 'c1yk5e1n85nan22a60u0qzvjyu2rpf'
let client_secret = 'x0emovg8l6nr8olye7nelygchbkoen'                                // 用來存取需要 OAuth 的 API
let urlGetAPPAccessToken = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
let urlGetStreamList = 'https://api.twitch.tv/helix/streams'
let urlGetGameID = 'https://api.twitch.tv/helix/games'


request.post(urlGetAPPAccessToken, 
    function optionalCallback(error, httpResponse, body)                            // 拿到 OAuth 的授權 
    {
        if (!error && httpResponse.statusCode === 200) 
        {
            const key = JSON.parse(body)                                            // 拿到 OAuth 的 Access Token
            // console.log(key.access_token)
            
            urlGetGameID += `?name=${gameName}`
            let gameID
            request(                                        
                {       
                    url: urlGetGameID,
                    headers: {                                                      // 添加使用舊版 Twitch API 的規範 Header
                        // 'Accept': 'application/vnd.twitchtv.v5+json',            // 舊版 API 都必須添加的，這裡不添加也不影響
                        'Client-Id': `${client_id}`,                                // 申請使用 Twitch api 的 Client ID
                        'Authorization': `Bearer ${key.access_token}`               // 因為該 req 需要授權
                }}, 
                function (error, httpResponse, body)                                // 發送 req，取得遊戲的 ID
                {
                    if (!error && httpResponse.statusCode === 200) 
                    {
                        const gameInfo = JSON.parse(body);
                        // console.log(gameInfo)
                        if (gameInfo.data.length === 0)                             // 若找不到，則回傳的 data.length 長度會是 0
                        {                           
                            console.log('找不到此遊戲名稱，大小寫跟空白會影響結果，請確保名稱與 Twitch 上一致！');
                            return 
                        }
                        gameID = gameInfo.data[0].id                                // 取得回傳最相符的搜尋結果
                        // console.log(gameInfo)

                        urlGetStreamList += `?first=100&game_id=${gameID}`
                        // console.log(urlGetStreamList);
                        request(                                                    
                            {
                                url: urlGetStreamList,
                                headers: {                                                      
                                    // 'Accept': 'application/vnd.twitchtv.v5+json',              
                                    'Client-Id': `${client_id}`,                              
                                    'Authorization': `Bearer ${key.access_token}`
                            }}, 
                            function (error, httpResponse, body)                    // 根據遊戲 ID 列出串流列表
                            {
                                if (!error && httpResponse.statusCode === 200) 
                                {
                                    const streamInfo = JSON.parse(body);
                                    
                                    if (streamInfo.data.length === 0)
                                    {
                                        console.log(`有找到類似名稱，但沒有串流資訊，請輸入全名！`)
                                        return
                                    }
                                    // console.log(streamInfo);
                                    
                                    for (let i = 0; i < streamInfo.data.length; i++) { // 得到 100 筆資料
                                        console.log(`${i+1}.    ${streamInfo.data[i].id} ${streamInfo.data[i].title}`)
                                    }
                                    
                                    let nxt_page_cursor = streamInfo.pagination.cursor              // 拿到下一頁指標
                                    // console.log(`first fetch: ${nxt_page_cursor}`);
                                    
                                    let cnt = 1
                                    let tmp                                                         //用來儲存每一頁的串流 json 資訊
                                    while (cnt) {                                                   // 重複一次，每次印出 100 筆資料，一共為 100 筆資料

                                        urlGetStreamList = 'https://api.twitch.tv/helix/streams'
                                        urlGetStreamList += `?game_id=${gameID}&`
                                        urlGetStreamList += `first=100&after=${nxt_page_cursor}`

                                        request(
                                            {
                                                url: urlGetStreamList,
                                                headers: {                                                      
                                                    // 'Accept': 'application/vnd.twitchtv.v5+json',               
                                                    'Client-Id': `${client_id}`,                                
                                                    'Authorization': `Bearer ${key.access_token}`
                                            }}, 
                                            function (error, httpResponse, body) 
                                            {
                                                if (!error && httpResponse.statusCode === 200) 
                                                {
                                                    tmp = JSON.parse(body)
                                                    
                                                    for (let i = 0; i < tmp.data.length; i++) 
                                                    {
                                                        console.log(`${i+101}.    ${tmp.data[i].id} ${tmp.data[i].title}`)
                                                    }
                                                    
                                                    // console.log(`current cursor: ${nxt_page_cursor}`)
                                                    nxt_page_cursor = tmp.pagination.cursor
                                                    // console.log(`next cursor: ${nxt_page_cursor}`)
                                                    
                                                } else {
                                                    console.log(`抓取串流下一頁清單發生錯誤，請檢查！`)
                                                    console.log(`ERROR CODE: ${httpResponse.statusCode}`)
                                                    console.log(`ERROR MSG: ${body}`)
                                                }
                                            })
                                        cnt--
                                    }
                                    

                                } else {
                                    console.log(`抓取串流清單發生錯誤，請檢查！`)
                                    console.log(`ERROR CODE: ${httpResponse.statusCode}`)
                                    console.log(`ERROR MSG: ${body}`)
                                }
                            })

                    } else {
                        console.log(`抓取遊戲 ID 時發生錯誤，請檢查！`)
                        console.log(`ERROR CODE: ${httpResponse.statusCode}`)
                        console.log(`ERROR MSG: ${body}`)
                    }
            })
            
        } else {
            console.log(`存取授權時失敗，請檢查！`)
            console.log(`ERROR CODE: ${httpResponse.statusCode}`)
            console.log(`ERROR MSG: ${body}`)
        }
    }
)    