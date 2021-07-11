// [ 功能 ] 點擊每個遊戲選單，會自動標註
document.querySelector('.nav__menu').addEventListener('click', (e) => {
  // 搜尋每個導覽列中遊戲名稱是否有被標註，若有則清除
  if (e.target.classList.contains('nav__menu__selection')) {
    const searchParentElement = e.target.parentNode
    for (let i = 0; i < searchParentElement.children.length; i++) {
      if (searchParentElement.children[i].classList.contains('nav__menu__selection--clicked')) {
        searchParentElement.children[i].classList.remove('nav__menu__selection--clicked')
      }
    }
    // 標註目前點選的遊戲名稱
    e.target.classList.add('nav__menu__selection--clicked')
  }
})

// 透過 fetch API 發送 ajax request
// function 內部不做 exception handling
function ajaxSendRequest(url) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      // eslint-disable-next-line quote-props
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'c1yk5e1n85nan22a60u0qzvjyu2rpf'
    })
  })
}

// 將 json 格式的資料加到 dom tree
function domDisplayStream(source) {
  const infoObjs = new Array(20)
  for (let i = 0; i < source.streams.length; i++) {
    infoObjs[i] = {
      frame: source.streams[i].preview.large,
      avatar: source.streams[i].channel.logo,
      title: source.streams[i].channel.status,
      author: source.streams[i].channel.name,
      url: source.streams[i].channel.url
    }
  }
  // 拿到要印出的資訊之後，新增 dom 元素
  for (let i = 0; i < infoObjs.length; i++) {
    const parentElement = document.querySelector('.stream_list__content')
    const childElement = document.createElement('div')
    childElement.classList.add('stream_list__content__item')
    childElement.innerHTML = `
      <div class="stream_list__content__item__frame" style="background-image: url(${infoObjs[i].frame});"></div>
      <div class="stream_list__content__item__info">
        <div class="stream_list__content__item__info__avatar" style="background-image: url(${infoObjs[i].avatar});"></div>
        <div class="stream_list__content__item__info__detail">
          <p class="stream_list__content__item__info__detail__title">${infoObjs[i].title}
          </p>
          <p class="stream_list__content__item__info__detail__author">${infoObjs[i].author}</p>
        </div>
      </div>
      `
    childElement.setAttribute('url', infoObjs[i].url)
    parentElement.appendChild(childElement)
  }
}

document.querySelector('.nav__menu').addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__menu__selection')) {
    // 若已經點選一樣的遊戲名稱，則跳出提示框提示用戶要往下滑點選 load more 按鈕
    if (document.querySelector('.stream_list__name').innerText === e.target.innerText) {
      alert('往下滑可瀏覽更多實況～')
      return
    }
  }
  // 根據點擊按鈕修改 request URL
  let requestURL = 'https://api.twitch.tv/kraken/streams/?limit=20'
  // 根據選擇的遊戲名稱，發送 request 以及顯示相對應主副標題
  switch (e.target.value) {
    case 'Just Chatting': {
      requestURL += `&&game=${e.target.value}`
      document.querySelector('.stream_list__name').innerText = e.target.value
      document.querySelector('.stream_list__content').innerHTML = ''
      break
    }
    case 'Grand Theft Auto V': {
      requestURL += `&&game=${e.target.value}`
      document.querySelector('.stream_list__name').innerText = e.target.value
      document.querySelector('.stream_list__content').innerHTML = ''
      break
    }
    case 'Minecraft': {
      requestURL += `&&game=${e.target.value}`
      document.querySelector('.stream_list__name').innerText = e.target.value
      document.querySelector('.stream_list__content').innerHTML = ''
      break
    }
    case 'League of Legends': {
      requestURL += `&&game=${e.target.value}`
      document.querySelector('.stream_list__name').innerText = e.target.value
      document.querySelector('.stream_list__content').innerHTML = ''
      break
    }
    case 'Sports': {
      requestURL += `&&game=${e.target.value}`
      document.querySelector('.stream_list__name').innerText = e.target.value
      document.querySelector('.stream_list__content').innerHTML = ''
      break
    }
    default:
      break
  }
  // 如果 load more 按鈕存在，則清空
  if (document.querySelector('.stream_list__load_more') !== null) {
    document.querySelector('.stream_list').removeChild(document.querySelector('.stream_list__load_more'))
  }
  // 發出 request 拿到指定的串流資訊
  ajaxSendRequest(requestURL)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return response.json()
      }
      alert('Server 端發生錯誤，請重新再試')
      throw new Error('please check http status code')
    })
    .then((json) => {
      domDisplayStream(json)
      // 產生 load more 按鈕
      const parentElement = document.querySelector('.stream_list')
      const childElement = document.createElement('button')
      childElement.classList.add('stream_list__load_more')
      childElement.innerText = 'Click to load more 20 live...'
      parentElement.appendChild(childElement)
    })
    .catch((error) => {
      console.log('fetch error: ', error)
      alert('Server 端發生錯誤，請重新再試')
    })
})

// [ 功能 ] 點選串流清單會導引到實況網址
document.querySelector('.stream_list__content').addEventListener('click', (e) => {
  // 點擊到串流清單會顯示其子元素，假如點擊到 item 本身，代表沒有點擊到串流清單，
  if (e.target.classList.contains('stream_list__content')) return
  let parent = e.target
  // 根據子元素，開始向上面找父元素是否為 item
  while (1) {
    if (parent.classList.contains('stream_list__content__item')) {
      break
    }
    parent = parent.parentNode
  }
  // 根據串流清單開始相對應連結
  window.location.href = parent.getAttribute('url')
})

// [ 功能 ] 點擊 load more 按鈕，載入 20 個接續的 live
// 當 load more 按鈕出現時，已經載入 20 個 live 了，所以設置此變數紀錄下次需要從哪裡開始抓
let totalLiveNum = 20
document.querySelector('.stream_list').addEventListener('click', (e) => {
  // API Offset 參數上限為 900
  if (totalLiveNum === 900) {
    alert('已經到達顯示上限囉～')
    return
  }
  // 點擊 load more 按鈕
  if (e.target.classList.contains('stream_list__load_more')) {
    const searchGameName = document.querySelector('.stream_list__name').innerText
    const requestURL = `https://api.twitch.tv/kraken/streams/?game=${searchGameName}&&limit=20&&offset=${totalLiveNum}`
    // 發出 request 拿到指定的串流資訊
    ajaxSendRequest(requestURL)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response.json()
        }
        alert('Server 端發生錯誤，請重新再試')
        throw new Error('please check http status code')
      })
      .then((json) => {
        domDisplayStream(json)
        totalLiveNum += 20
      })
      .catch((error) => {
        console.log('fetch error: ', error)
        alert('Server 端發生錯誤，請重新再試')
      })
  }
})
