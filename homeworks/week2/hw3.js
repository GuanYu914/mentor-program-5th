function reverse(str) {
    var res = ''

    for (var i = str.length-1; i >= 0; i--) {
        res += str[i]
    }
    console.log(res)
}

reverse('hello');
