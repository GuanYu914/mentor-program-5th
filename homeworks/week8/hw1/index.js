/* eslint-disable no-irregular-whitespace */
document.querySelector('.lottery').addEventListener('click', (e) => {
  // 如果按了抽獎頁面的按鈕
  if (e.target.classList.contains('lottery__intro__button')) {
    // 初始化 xhr requst 物件
    const request = new XMLHttpRequest()
    // 收到 response 開始解析
    request.addEventListener('load', () => {
      if (request.status >= 200 && request.status < 400) {
        let json = ''
        let prizeNum = ''
        try {
          json = JSON.parse(request.responseText)
        } catch (e) {
          console.log(`parse json 時發生錯誤: ${e}`)
          return
        }
        prizeNum = json.prize
        console.log('prizeNum:', prizeNum)
        // 避免解析完的 json 有 undefined
        if (prizeNum === undefined) return
        // 根據回傳獎項輸出相對應元素
        switch (prizeNum) {
          case 'FIRST': {
            console.log('恭喜你中頭獎了！日本東京來回雙人遊！')
            const delElement = document.querySelector('.lottery__intro')
            document.querySelector('.lottery').removeChild(delElement)
            const parentElement = document.querySelector('.lottery')
            const childElement = document.createElement('div')
            childElement.classList.add('lottery__prize')
            childElement.innerHTML = `
              <p class="lottery__prize_msg">恭喜你中頭獎了！日本東京來回雙人遊！</p>
              <button class="lottery__prize__button">返回抽獎頁面</button>
            `
            parentElement.appendChild(childElement)
            parentElement.style.backgroundImage = 'url(./first-prize.jpg)'
            parentElement.style.backgroundPosition = 'center'
            parentElement.style.backgroundRepeat = 'no-repeat'
            parentElement.style.backgroundSize = 'cover'
            break
          }

          case 'SECOND': {
            console.log('二獎！90 吋電視一台！')
            const delElement = document.querySelector('.lottery__intro')
            document.querySelector('.lottery').removeChild(delElement)
            const parentElement = document.querySelector('.lottery')
            const childElement = document.createElement('div')
            childElement.classList.add('lottery__prize')
            childElement.innerHTML = `
              <p class="lottery__prize_msg">二獎！90 吋電視一台！</p>
              <button class="lottery__prize__button">返回抽獎頁面</button>
            `
            parentElement.appendChild(childElement)
            parentElement.style.backgroundImage = 'url(./second-prize.jpg)'
            parentElement.style.backgroundPosition = 'center'
            parentElement.style.backgroundRepeat = 'no-repeat'
            parentElement.style.backgroundSize = 'cover'
            break
          }

          case 'THIRD': {
            console.log('恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！')
            const delElement = document.querySelector('.lottery__intro')
            document.querySelector('.lottery').removeChild(delElement)
            const parentElement = document.querySelector('.lottery')
            const childElement = document.createElement('div')
            childElement.classList.add('lottery__prize')
            childElement.innerHTML = `
              <p class="lottery__prize_msg">恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</p>
              <button class="lottery__prize__button">返回抽獎頁面</button>
            `
            parentElement.appendChild(childElement)
            parentElement.style.backgroundImage = 'url(./third-prize.jpg)'
            parentElement.style.backgroundPosition = 'center'
            parentElement.style.backgroundRepeat = 'no-repeat'
            parentElement.style.backgroundSize = 'cover'
            break
          }

          case 'NONE': {
            console.log('銘謝惠顧')
            const delElement = document.querySelector('.lottery__intro')
            document.querySelector('.lottery').removeChild(delElement)
            const parentElement = document.querySelector('.lottery')
            const childElement = document.createElement('div')
            childElement.classList.add('lottery__prize')
            childElement.innerHTML = `
              <p class="lottery__prize_msg">銘謝惠顧</p>
              <button class="lottery__prize__button">返回抽獎頁面</button>
            `
            parentElement.appendChild(childElement)
            parentElement.style.background = '#121212'
            break
          }

          default:
            break
        }
      } else {
        // server 端錯誤
        console.log(`status code: ${request.status}`)
        alert('系統不穩定，請再試一次')
      }
    })
    request.addEventListener('error', () => {
      // server 端錯誤
      alert('系統不穩定，請再試一次')
    })
    // 設置 request 形式
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
    // 送出 request
    request.send()
  }
  // 如果按了抽獎過後頁面的按鈕
  if (e.target.classList.contains('lottery__prize__button')) {
    // 輸出抽獎頁面元素
    const parentElement = document.querySelector('.lottery')
    const delElement = document.querySelector('.lottery__prize')
    parentElement.removeChild(delElement)
    const childElement = document.createElement('div')
    childElement.classList.add('lottery__intro')
    childElement.innerHTML = `
      <p class="lottery__intro__heading">2020 夏日輕盈特賞！ 抽獎活動辦法</p>
      <div class="lottery__intro__info">
        <div class="lottery__intro__info__detail">
          <span class="lottery__intro__info__detail__highlight">活動期間：</span>
          <span class="lottery__intro__info__detail__content">2020/06/01~2020/07/01</span>
        </div>
        <div class="lottery__intro__info__underline"></div>
      </div>
      <div class="lottery__intro__info">
        <div class="lottery__intro__info__detail">
          <span class="lottery__intro__info__detail__highlight">活動說明：</span>
          <span class="lottery__intro__info__detail__content">今天老闆佛心來著決定給大家發獎勵，有看有機會，沒看只能幫QQ！只要在店內消費滿1000000元即有機會獲得 -
            頭獎日本東京來回雙人遊！</span>
        </div>
        <div class="lottery__intro__info__underline"></div>
      </div>
      <div class="lottery__intro__info">
        <div class="lottery__intro__info__detail">
          <span class="lottery__intro__info__detail__highlight">獎  品：</span>
          <span class="lottery__intro__info__detail__content">❤ 頭獎一名：日本東京來回雙人遊(市價14990元)
            ❤ 貳獎三名：90 吋電視一台(市價5990元)
            ❤ 參獎十名：知名 YouTuber 簽名握手會入場券一張(市價1500元)</span>
        </div>
        <div class="lottery__intro__info__underline"></div>
      </div>
      <button class="lottery__intro__button">我要抽獎</button>
      `
    parentElement.appendChild(childElement)
    parentElement.style.backgroundImage = 'url(./bg.jpg)'
    parentElement.style.backgroundPosition = 'center'
    parentElement.style.backgroundRepeat = 'no-repeat'
    parentElement.style.backgroundSize = 'cover'
  }
})
