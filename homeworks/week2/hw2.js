function capitalize(str) {
    var res = ''
    var CapCharCode = str.charCodeAt(0)

    if(CapCharCode >= 97 && CapCharCode <= 122) {
        res += String.fromCharCode(CapCharCode - 32)
        for (var i = 1; i < str.length; i++) {
            res += str[i]
        }
    }else {
        res = str
    }

    return res
}

console.log(capitalize('hello'));
