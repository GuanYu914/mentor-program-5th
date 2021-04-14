#!/bin/bash

# 題目
# 請寫一個github.sh，可以傳入一個參數 username
# 執行之後就會輸出這個 GitHub 使用者的暱稱、介紹、地點跟個人網站

# read from first parameter
gitName=$1

# -q turn off wget output
# -O [file name] output to file
$(wget https://api.github.com/users/$gitName -q -O temp)

# fetch specific value from jason Ex. name, bio, location, blog
# -o show only parts matching the pattern
    # "name": -> matches "name" and an arbitrary amount of spaces
    # *"[^"]* -> matches two quotes and all the non-quotes between them
# tr -d 'selected char' delete the selected char
name=$(grep -o '"name": *"[^"]*"' temp | grep -o '"[^"]*"$' | tr -d '"')
bio=$(grep -o '"bio": *"[^"]*"' temp | grep -o '"[^"]*"$' | tr -d '"')
location=$(grep -o '"location": *"[^"]*"' temp | grep -o '"[^"]*"$' | tr -d '"')
blog=$(grep -o '"blog": *"[^"]*"' temp | grep -o '"[^"]*"$' | tr -d '"')

echo "暱稱：$name"
echo "介紹：$bio"
echo "地點：$location"
echo "個人網站：$blog"

# remove temp file
$(rm temp)