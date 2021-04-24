// fast ver.
// 基於以排序完成的陣列，可以使用二元搜尋加速效率
function search (arr, n) {
    
    var low, high
    low = 0
    high = arr.length - 1

    return BinSearch(arr, n, low, high)
}

function BinSearch (arr, n, low, high) {
    var mid 

    if (high >= low) {
        mid = Math.ceil((high + low) / 2)

        if(n > Number(arr[mid])) {
            return BinSearch(arr, n, mid+1, high)
        } else if (n < Number(arr[mid])) {
            return BinSearch(arr, n, low, mid-1)
        } else if (n === Number(arr[mid])){
            return mid
        } 
    } else {
        return -1
    }
}

/* slower ver.
function search(arr, n) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i] === n) return i
    }
    return -1
}
*/
console.log(search([1, 3, 10, 14, 39], 299))