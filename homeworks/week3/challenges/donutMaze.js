/* eslint-disable no-multi-spaces */
/**
 * 題目: https://adventofcode.com/2019/day/20
 * 一開始會從 AA 附近的 . 開始走，一直到 ZZ 符號，迷宮當中會有牆壁(#)不可走，以及英文字母命名的傳送門，顧名思義，
 * 就是會傳送到一樣字母名稱的另一端，你需要找出從 AA 到 ZZ 最短的路徑
 *
 */
const readline = require('readline')

const r1 = readline.createInterface({
  input: process.stdin
})

const lines = []

r1.on('line', (line) => { lines.push(line) })

r1.on('close', () => { solve(lines) })

function solve(lines) {
  const R = Number(lines.length)
  const C = Number(lines[0].length)
  // console.log(`R=${R}, C=${C}`);

  // 記錄迷宮
  const maze = new Array(R)
  for (let i = 0; i < maze.length; i++) {
    maze[i] = new Array(C)
  }

  // 輸入迷宮資訊
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      maze[i][j] = lines[i][j]
    }
  }
  // console.log(maze)

  // 用來取得附近的點
  const dr = [-1, 1, 0, 0]
  const dc = [0, 0, 1, -1]
  let StartR, StartC, EndR, EndC

  // 紀錄傳送門訊息
  const portals = []

  // 解析迷宮的傳送點 & 起點跟終點的名稱
  for (let r = 0; r < maze.length; r++) {
    let rr, cc, tmpPortal, flagFind
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c] !== '#' && maze[r][c] !== '.' && maze[r][c] !== ' ') {                 // 尋找類似傳送點的命名字元
        for (let i = 0; i < 4; i++) {
          rr = r + dr[i]
          cc = c + dc[i]
          if (rr < 0 || cc < 0) { continue }
          if (rr >= R || cc >= C) { continue }

          if (maze[rr][cc] !== '#' && maze[rr][cc] !== '.' && maze[rr][cc] !== ' ') {       // 搜尋該命名字元附近有無類似的命名字元
            tmpPortal = maze[r][c].toString() + maze[rr][cc].toString()                     // 暫存找到的 portal 名稱
            // console.log(tmpPortal);
            if (portals.length === 0) {                                                     // 當 portals 物件陣列裡面沒東西，直接新增
              portals.push({
                name: tmpPortal,
                R1: -1,
                C1: -1,
                R2: -1,
                C2: -1
              })
            } else {                                                                        // 若 portals 物件陣列裡面有東西，開始搜尋該 portal 名稱是否存在
              flagFind = false // 初始化
              for (let y = 0; y < portals.length; y++) {                                    // 如果找到一樣的名稱，則標記有找到
                if (portals[y].name === tmpPortal || portals[y].name === reverse(tmpPortal)) {
                  flagFind = true
                }
              }
              if (flagFind === false) {                                                     // 若標記沒有找到，則新增
                portals.push({
                  name: tmpPortal,
                  R1: -1,
                  C1: -1,
                  R2: -1,
                  C2: -1
                })
              }
            }
          }
        }
      }
    }
  }

  // 根據 portals 物件陣列名稱，找尋相對應的入口點
  let searchPortal
  for (let i = 0; i < portals.length; i++) {
    searchPortal = portals[i].name // 用變數代表要找的 portal
    let rr, cc, tmpPortalR, tmpPortalC, tmpMazeR, tmpMazeC
    let flagGetEntry = false
    let flagFindPortal = false
    for (let r = 0; r < maze.length; r++) {
      for (let c = 0; c < maze[r].length; c++) {
        if (maze[r][c] === searchPortal.charAt(0)) {                            // 假如有找到 portal 名稱當中的字元
          flagGetEntry = false                                                  // 設定標誌確認該字元附近有無入口點
          flagFindPortal = false                                                // 設定標誌確認該字元附近有無名稱當中其他字元
          tmpPortalR = -1                                                       // 初始化暫存的入口點 R
          tmpPortalC = -1                                                       // 初始化暫存的入口點 C
          tmpMazeR = -1                                                         // 初始化暫存的尋找的索引值 R
          tmpMazeC = -1                                                         // 初始化暫存的尋找的索引值 C
          for (let j = 0; j < 4; j++) {                                         // 上下左右找鄰居
            rr = r + dr[j]
            cc = c + dc[j]
            if (rr < 0 || cc < 0) { continue }
            if (rr >= R || cc >= C) { continue }
            if (maze[rr][cc] === '.') {                                         // 假如該字元附近有找到入口點，先把入口點資訊儲存
              tmpPortalR = rr                                                   // 儲存到暫存的入口點 R
              tmpPortalC = cc                                                   // 儲存到暫存的入口點 C
              flagGetEntry = true                                               // 標記找到入口點
            }
            if (maze[rr][cc] === searchPortal.charAt(1)) {                      // 假如該字元附近有找到剩餘的字元名稱，先把目前尋找的索引值儲存
              tmpMazeR = rr                                                     // 儲存到暫存的尋找的索引值 R
              tmpMazeC = cc                                                     // 儲存到暫存的尋找的索引值 C
              flagFindPortal = true                                             // 標記找到剩餘的字元名稱
            }
          }
          if (flagFindPortal && !flagGetEntry) {                                // 找到剩餘的字元名稱，但還沒找到入口點
            let rrr, ccc
            for (let k = 0; k < 4; k++) {                                       // 從暫存的索引值繼續找入口點
              rrr = tmpMazeR + dr[k]
              ccc = tmpMazeC + dc[k]
              if (rrr < 0 || ccc < 0) { continue }
              if (rrr >= R || ccc >= C) { continue }
              if (maze[rrr][ccc] === '.') {                                     // 若找到入口點
                if (portals[i].R1 === -1 && portals[i].C1 === -1) {             // 若相關名稱的入口點資訊都沒有，則寫入第一筆
                  portals[i].R1 = rrr
                  portals[i].C1 = ccc
                } else {                                                        // 若已經有第一筆資訊，則依序寫入第二筆
                  portals[i].R2 = rrr
                  portals[i].C2 = ccc
                }
              }
            }
          }
          if (flagFindPortal && flagGetEntry) {                                 // 找到入口點跟剩餘字元名稱
            if (portals[i].R1 === -1 && portals[i].C1 === -1) {                 // 若相關名稱的入口點資訊都沒有，則寫入第一筆
              portals[i].R1 = tmpPortalR
              portals[i].C1 = tmpPortalC
            } else {                                                            // 若已經有第一筆資訊，則依序寫入第二筆
              portals[i].R2 = tmpPortalR
              portals[i].C2 = tmpPortalC
            }
          }
        }
      }
    }
  }

  // 將起點 & 終點索引數值儲存到指定變數
  for (let i = 0; i < portals.length; i++) {
    if (portals[i].name === 'AA') {
      StartR = portals[i].R1
      StartC = portals[i].C1
    } else if (portals[i].name === 'ZZ') {
      EndR = portals[i].R1
      EndC = portals[i].C1
    }
  }

  // 印出傳送門相對資訊
  // console.log(`起點索引數值 = (${StartR}, ${StartC})`)
  // console.log(`終點索引數值 = (${EndR}, ${EndC})`)
  // console.log('傳送門 = ')
  // for (let i = 0; i < portals.length; i++) {
  //   console.log(portals[i])
  // }

  // 廣度優先搜尋搭配 Queue
  const rq = new Queue()
  const cq = new Queue()

  let moveCount = 0               // 紀錄走的步數
  let nodesLeftInLayer = 1        // 一開始的層數為 1
  let nodeINextLayer = 0          // 紀錄每一層須走完多少點
  let reachedEnd = false          // 用來記錄是否到達終點

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
  // console.log(visited)

  // 開始走迷宮
  let r, c, rr, cc
  rq.enqueue(StartR)
  cq.enqueue(StartC)
  visited[StartR][StartC] = true

  while (!rq.isEmpty()) {
    r = rq.dequeue()
    c = cq.dequeue()

    if (r === EndR && c === EndC) {                                                   // 如果遇到終點，終止跳出
      reachedEnd = true
      break
    }

    for (let i = 0; i < 4; i++) {
      rr = r + dr[i]
      cc = c + dc[i]

      // 撇除不能走的點
      if (rr < 0 || cc < 0) { continue }
      if (rr >= R || cc >= C) { continue }
      if (visited[rr][cc]) { continue }
      if (maze[rr][cc] === '#') { continue }
      if (maze[rr][cc] === ' ') { continue }

      if (maze[rr][cc] === '.') {                                                     // 遇到可以走的點，加入 Queue
        rq.enqueue(rr)
        cq.enqueue(cc)
        visited[rr][cc] = true
        nodeINextLayer++
      } else {                                                                        // 遇到傳送點，拿取還沒位移前的索引數值與 portals 物件陣列比較，拿到該傳送門的傳送的位置
        for (let i = 0; i < portals.length; i++) {
          if (portals[i].R1 === r && portals[i].C1 === c) {                           // 若與 (R1,C1) 的入口點符合，則加入 (R2, C2)
            if (visited[portals[i].R2][portals[i].C2]) { continue }                   // 如果已經拜訪過另一個入口點，則不要將另一個入口點放到 Queue
            rq.enqueue(portals[i].R2)
            cq.enqueue(portals[i].C2)
            visited[portals[i].R2][portals[i].C2] = true
            nodeINextLayer++
          } else if (portals[i].R2 === r && portals[i].C2 === c) {                    // 若與 (R2,C2) 的入口點符合，則加入 (R1, C1)
            if (visited[portals[i].R1][portals[i].C1]) { continue }                   // 如果已經拜訪過另一個入口點，則不要將另一個入口點放到 Queue
            rq.enqueue(portals[i].R1)
            cq.enqueue(portals[i].C1)
            visited[portals[i].R1][portals[i].C1] = true
            nodeINextLayer++
          }
        }
      }
    }

    nodesLeftInLayer--                                  // 將該層的節點減一
    if (nodesLeftInLayer === 0) {                       // 如果該層的節點已經歸零，代表已經走完
      nodesLeftInLayer = nodeINextLayer                 // 將該層的下一層的節點加入
      nodeINextLayer = 0                                // 將該層的下一層的下一層的節點歸零，重新累計
      moveCount++                                       // 該層已經走完，所以步數加一
    }
  }
  if (reachedEnd) {                                     // 找到終點，回傳步數
    console.log(moveCount)
  } else {                                              // 沒有，印出訊息
    console.log('未找到嗚嗚...')
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

function reverse(str) {
  let res = ''
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i]
  }
  return res
}
