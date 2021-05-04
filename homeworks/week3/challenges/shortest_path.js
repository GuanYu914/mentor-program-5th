/**
 * 此程式碼用來解決 LIOJ 平台編號 1053 的題目，目的為找迷宮內通往終點的最短路徑
 * 使用廣度優先搜尋法，找出每個點到下個點的最短距離，藉此找出最短路徑
 * 使用 Queue (佇列) 實作 BFS (廣度優先搜尋法)
 */

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', function (line) {
  lines.push(line)
});

// 輸入結束，開始針對 lines 做處理
rl.on('close', function() {
   console.log(solve(lines))
})

// 全域變數

function solve (lines) {
    let size = lines[0].split(' ')
    let R = Number(size[0])
    let C = Number(size[1])
    
    // 用來記錄迷宮
    let m = new Array(R) 
    for (let i = 0; i < m.length; i++) { 
        m[i] = new Array(C)
    }

    // 將迷宮讀入
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j] = lines[i+1][j] 
        }
    }
    // 依據題目要求，將起始點設為左上角索引值 (0, 0)
    let sr = 0
    let sc = 0

    // 依據題目要求，將終點設為右下角索引值 (R-1, C-1)
    m[R-1][C-1] = 'E'
    // console.log(m);
    
    // 使用 queue 紀錄每個行列值
    let rq = new Queue()
    let cq = new Queue()

    let move_count = 0            // 紀錄走的步數
    let nodes_left_in_layer = 1   // 一開始的層數為 1
    let node_in_next_layer = 0    // 紀錄每一層須走完多少點

    let reached_end = false       // 用來記錄是否到達終點

    // 用來記錄每個點是否被走訪，避免重複走訪
    let visited = new Array(R) 
    for (let i = 0; i < visited.length; i++) {
        visited[i] = new Array(C)
    }

    // 將所有點預設為都為未走訪
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = false
        }
    }

    // 用來取的附近的點
    let dr = [-1, 1, 0, 0]
    let dc = [0, 0, 1, -1]
    
    // 走迷宮去
    rq.enqueue(sr)
    cq.enqueue(sc)
    visited[sr][sc] = true                      // 將起點加入
    while (!rq.isEmpty()) {
        r = rq.dequeue()                        // 取得目前要走訪點的 row 的數值
        c = cq.dequeue()                        // 取得目前要走訪點的 col 的數值
        // console.log(`(r, c) is (${r}, ${c})`)
        if (m[r][c] === 'E') {                  // 若目前的點為終點，則退出
            reached_end = true                  // 標記已經找到
            break;
        }
        // 尋找下個點
        for (let i = 0; i < 4; i++) {           // 開始找鄰近的點
            rr = r + dr[i]
            cc = c + dc[i]

            // 撇除不在迷宮內的點
            if (rr < 0 || cc < 0) {continue}
            if (rr >= R || cc >=C) {continue}
            if (visited[rr][cc]) {continue}
            if (m[rr][cc] === '#') {continue}

            // 將剩餘的點加入 queue
            rq.enqueue(rr)
            cq.enqueue(cc)
            visited[rr][cc] = true // 避免將已走訪點再加入 queue
            // console.log(`(rr, cc) is (${rr}, ${cc})`)
            node_in_next_layer++ // 紀錄這層所有要走訪的點的數量
        } // 以上已完成走訪該層的一個點
        
        nodes_left_in_layer--                           // 將該層要走訪的點減一
        if(nodes_left_in_layer === 0) {                 // 若此層所有的點都走訪過了
            nodes_left_in_layer = node_in_next_layer    // 將下一層的點加入要走訪的
            node_in_next_layer = 0                      // 將下一層該走訪的點歸零
            move_count++                                // 代表已經結束該層走訪，將步數加一
            // console.log(`moves is ${move_count}`)
        }
    }
    if(reached_end){        // 如果有找到，則印出步數
        return move_count 
    } else {                // 沒有，回傳 -1
        return -1
    }
}

/* 引用 Kate Morley - http://code.iamkate.com/ 的程式碼，此程式碼為 CC0 授權 */

function Queue(){

    // initialise the queue and offset
    var queue  = [];
    var offset = 0;
  
    // Returns the length of the queue.
    this.getLength = function(){
      return (queue.length - offset);
    }
  
    // Returns true if the queue is empty, and false otherwise.
    this.isEmpty = function(){
      return (queue.length === 0);
    }
  
    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    this.enqueue = function(item){
      queue.push(item);
    }
  
    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    this.dequeue = function(){
  
      // if the queue is empty, return immediately
      if (queue.length == 0) return undefined;
  
      // store the item at the front of the queue
      var item = queue[offset];
  
      // increment the offset and remove the free space if necessary
      if (++ offset * 2 >= queue.length){
        queue  = queue.slice(offset);
        offset = 0;
      }
  
      // return the dequeued item
      return item;
  
    }
  
    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    this.peek = function(){
      return (queue.length > 0 ? queue[offset] : undefined);
    }
  }