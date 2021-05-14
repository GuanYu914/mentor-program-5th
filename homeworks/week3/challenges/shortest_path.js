/**
 * 此程式碼用來解決 LIOJ 平台編號 1053 的題目，目的為找迷宮內通往終點的最短路徑
 * 使用廣度優先搜尋法，找出每個點到下個點的最短距離，藉此找出最短路徑
 * 使用 Queue (佇列) 實作 BFS (廣度優先搜尋法)
 */

const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin })

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => { lines.push(line) })

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => { console.log(solve(lines)) })

function solve(lines) {
  const size = lines[0].split(' ')
  const R = Number(size[0])
  const C = Number(size[1])

  // 用來記錄迷宮
  const m = new Array(R)
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(C)
  }

  // 將迷宮讀入
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      m[i][j] = lines[i + 1][j]
    }
  }
  // 依據題目要求，將起始點設為左上角索引值 (0, 0)
  const sr = 0
  const sc = 0

  // 依據題目要求，將終點設為右下角索引值 (R-1, C-1)
  m[R - 1][C - 1] = 'E'
  // console.log(m);

  // 使用 queue 紀錄每個行列值
  const rq = new Queue()
  const cq = new Queue()

  // 紀錄走的步數
  let moveCount = 0
  // 一開始的層數為 1
  let nodesLeftInLayer = 1
  // 紀錄每一層須走完多少點
  let nodeInNextLayer = 0
  // 用來記錄是否到達終點
  let reachedEnd = false

  // 用來記錄每個點是否被走訪，避免重複走訪
  const visited = new Array(R)
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
  const dr = [-1, 1, 0, 0]
  const dc = [0, 0, 1, -1]

  // 走迷宮去
  rq.enqueue(sr)
  cq.enqueue(sc)
  let r, c, rr, cc
  visited[sr][sc] = true // 將起點加入
  while (!rq.isEmpty()) {
    r = rq.dequeue() // 取得目前要走訪點的 row 的數值
    c = cq.dequeue() // 取得目前要走訪點的 col 的數值
    // console.log(`(r, c) is (${r}, ${c})`)
    if (m[r][c] === 'E') { // 若目前的點為終點，則退出
      reachedEnd = true // 標記已經找到
      break
    }
    // 尋找下個點
    for (let i = 0; i < 4; i++) { // 開始找鄰近的點
      rr = r + dr[i]
      cc = c + dc[i]

      // 撇除不在迷宮內的點
      if (rr < 0 || cc < 0) { continue }
      if (rr >= R || cc >= C) { continue }
      if (visited[rr][cc]) { continue }
      if (m[rr][cc] === '#') { continue }

      // 將剩餘的點加入 queue
      rq.enqueue(rr)
      cq.enqueue(cc)
      visited[rr][cc] = true // 避免將已走訪點再加入 queue
      // console.log(`(rr, cc) is (${rr}, ${cc})`)
      nodeInNextLayer++ // 紀錄這層所有要走訪的點的數量
    } // 以上已完成走訪該層的一個點

    nodesLeftInLayer-- // 將該層要走訪的點減一
    if (nodesLeftInLayer === 0) { // 若此層所有的點都走訪過了
      nodesLeftInLayer = nodeInNextLayer // 將下一層的點加入要走訪的
      nodeInNextLayer = 0 // 將下一層該走訪的點歸零
      moveCount++ // 代表已經結束該層走訪，將步數加一
      // console.log(`moves is ${moveCount}`)
    }
  }
  if (reachedEnd) { // 如果有找到，則印出步數
    return moveCount
  } else { // 沒有，回傳 -1
    return -1
  }
}

/* 引用 Kate Morley - http://code.iamkate.com/ 的程式碼，此程式碼為 CC0 授權 */

function Queue() {
  // initialise the queue and offset
  let queue = []
  let offset = 0

  // Returns the length of the queue.
  this.getLength = function() {
    return (queue.length - offset)
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function() {
    return (queue.length === 0)
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item) {
    queue.push(item)
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function() {
    // if the queue is empty, return immediately
    if (queue.length === 0) return undefined

    // store the item at the front of the queue
    const item = queue[offset]

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset)
      offset = 0
    }

    // return the dequeued item
    return item
  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function() {
    return (queue.length > 0 ? queue[offset] : undefined)
  }
}
