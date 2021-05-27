/* eslint-disable no-irregular-whitespace */
/**
 * 還記得上一週裡面做的活動報名表單嗎？這一週要來幫報名表單加上驗證，
 * 在表單送出的時候會針對以下幾個欄位做檢查：
 * 暱稱是否為空
 * 電子郵件是否為空
 * 手機號碼是否為空
 * 報名類型是否有勾選
 * 怎麼知道這個活動的是否為空
 *
 * 如果沒有通過檢查，請在欄位的 input 下方顯示紅字提醒，有通過的話跳
 * 出一個 alert 展示使用者填寫的資料。
 */

// 用來記錄錯誤標籤是否存在
let flagNameTag = false
let flagEmailTag = false
let flagPhoneTag = false
let flagCheckboxTag = false
let flagHowToGetWhyTag = false

document.querySelector('div.submit button.submit').addEventListener('click', (e) => {
  // 檢查暱稱是否為空
  if (document.querySelector('input[name=name]').value === '') {
    if (!flagNameTag) {
      const parentElement = document.querySelector('div.name')
      const newElement = document.createElement('p')
      newElement.style.color = 'red'
      newElement.innerText = '暱稱不能為空'
      parentElement.appendChild(newElement)
      flagNameTag = true
    }
  } else {
    if (flagNameTag) {
      const delElement = document.querySelector('div.name p')
      delElement.parentNode.removeChild(delElement)
      flagNameTag = false
    }
  }

  // 檢查郵件是否為空
  if (document.querySelector('input[name=email]').value === '') {
    if (!flagEmailTag) {
      const parentElement = document.querySelector('div.email')
      const newElement = document.createElement('p')
      newElement.style.color = 'red'
      newElement.innerText = '郵件不能為空'
      parentElement.appendChild(newElement)
      flagEmailTag = true
    }
  } else {
    if (flagEmailTag) {
      const delElement = document.querySelector('div.email p')
      delElement.parentNode.removeChild(delElement)
      flagEmailTag = false
    }
  }

  // 檢查手機號碼是否為空
  if (document.querySelector('input[name=phone]').value === '') {
    if (!flagPhoneTag) {
      const parentElement = document.querySelector('div.phone')
      const newElement = document.createElement('p')
      newElement.style.color = 'red'
      newElement.innerText = '號碼不能為空'
      parentElement.appendChild(newElement)
      flagPhoneTag = true
    }
  } else {
    if (flagPhoneTag) {
      const delElement = document.querySelector('div.phone p')
      delElement.parentNode.removeChild(delElement)
      flagPhoneTag = false
    }
  }

  // 檢查是否有選擇報名類型
  let checked = false
  let choiceIndex = -1
  const checkedBox = document.querySelectorAll('input[name=type-choice]')
  for (let i = 0; i < checkedBox.length; i++) {
    if (checkedBox[i].checked) {
      checked = true
      choiceIndex = i
      break
    }
  }
  // 有 checked box，但標籤存在
  if (checked && flagCheckboxTag) {
    const delElement = document.querySelector('div.type p')
    delElement.parentNode.removeChild(delElement)
    flagCheckboxTag = false
  }
  // 無 checked box，但標籤不存在
  if (!checked && !flagCheckboxTag) {
    const parentElement = document.querySelector('div.type')
    const newElement = document.createElement('p')
    newElement.style.color = 'red'
    newElement.innerText = '請至少選擇一個'
    parentElement.appendChild(newElement)
    flagCheckboxTag = true
  }

  // 檢查怎麼知道這個活動資訊是否為空
  if (document.querySelector('input[name=HowToGet-why]').value === '') {
    if (!flagHowToGetWhyTag) {
      const parentElement = document.querySelector('div.howToGet')
      const newElement = document.createElement('p')
      newElement.style.color = 'red'
      newElement.innerText = '請填寫原因'
      parentElement.appendChild(newElement)
      flagHowToGetWhyTag = true
    }
  } else {
    if (flagHowToGetWhyTag) {
      const delElement = document.querySelector('div.howToGet p')
      delElement.parentNode.removeChild(delElement)
      flagHowToGetWhyTag = false
    }
  }
  // debug 用
  // console.log('flag 相關資訊...')
  // console.log(`flagNameTag       : ${flagNameTag}`)
  // console.log(`flagEmailTag      : ${flagEmailTag}`)
  // console.log(`flagPhoneTag      : ${flagPhoneTag}`)
  // console.log(`flagCheckBoxTag   : ${flagCheckboxTag}`)
  // console.log(`flagHowToGetWhyTag: ${flagHowToGetWhyTag}`)

  // 檢查所有 tag 是否被觸發，若有一個被觸發就不傳送表單
  if (flagNameTag || flagPhoneTag || flagEmailTag || flagCheckboxTag || flagHowToGetWhyTag) {
    e.preventDefault()
  } else {
    const msgName = document.querySelector('input[name=name]').value
    const msgEmail = document.querySelector('input[name=email]').value
    const msgPhone = document.querySelector('input[name=phone]').value
    const checkedBox = document.querySelectorAll('input[name=type-choice]')
    const msgType = checkedBox[choiceIndex].parentNode.innerText
    const msgHowToGet = document.querySelector('input[name=HowToGet-why]').value
    let msgOthers = document.querySelector('input[name=suggestions]').value
    if (msgOthers === '') {
      msgOthers = '未填寫任何建議'
    }
    const msg = `以下為您所輸入的資訊
暱稱：　　　　　　　${msgName}
電子郵件：　　　　　${msgEmail}
手機號碼：　　　　　${msgPhone}
選擇類型：　　　　　${msgType}
怎麼知道這項活動？：${msgHowToGet}
其他？：　　　　　　${msgOthers}`
    alert(msg)
  }
})
