``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
0. 呼叫名為 isValid 的函式，並傳入陣列引數  
1. 遇到第一層迴圈，開始執行，i 的範圍從 0 - 5 
2. arr[0] 為 3 不為 0，所以 i+1 等於 1
3. i = 1 小於陣列長度 6，所以繼續執行 for 迴圈
4. arr[1] 為 5 不為 0，所以 i+1 等於 2
5. i = 2 小於陣列長度 6，所以繼續執行 for 迴圈
6. arr[2] 為 8 不為 0，所以 i+1 等於 3
7. i = 3 小於陣列長度 6，所以繼續執行 for 迴圈
8. arr[3] 為 13 不為 0，所以 i+1 等於 4
9. i = 4 小於陣列長度 6，所以繼續執行 for 迴圈
10. arr[4] 為 22 不為 0，所以 i+1 等於 5
11. i = 5 小於陣列長度 6，所以繼續執行 for 迴圈
12. arr[5] 為 35 不為 0，所以 i+1 等於 6
13. i = 6 不小於陣列長度 6，所以結束此 for 迴圈，進入下個迴圈
14. i 為 2，i 小於陣列長度 6，所以繼續執行 for 迴圈
15. arr[2] 等於 arr[1] 加上 arr[0] 的數值，所以 i+1 等於 3
16. i = 3 小於陣列長度 6，所以繼續執行 for 迴圈
17. arr[3] 等於 arr[2] 加上 arr[1] 的數值，所以 i+1 等於 4
18. i = 4 小於陣列長度 6，所以繼續執行 for 迴圈
19. arr[4] 不等於 arr[3] 加上 arr[2] 的數值，所以回傳 invalid
