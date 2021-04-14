#!/bin/bash

# 題目：
# 現在請你寫一個 shell script，可以傳入一個數字 n
# 然後會產生 1~n 個檔案，檔名是 {number}.js

var=${1}
while [ "${var}" != "0" ]
do
	touch "${var}.js"
	var=$((${var}-1))
done