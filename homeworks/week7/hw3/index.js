// 新增代辦事項
document.querySelector('input[name=item_default_text]').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    console.log('Enter detected!')
    if (document.querySelector('input[name=item_default_text]').value === '') return

    // 產生 Todo list html 所需標籤
    const taskName = document.querySelector('input[name=item_default_text]').value
    const itemNew = document.createElement('div')
    itemNew.classList.add('todoList__content__item_new')
    itemNew.innerHTML = `<div class="todoList__content__item_new__above_underline">
    <label class="todoList__content__item_new__checkbox_container">
      <input type="checkbox" name="item_new_checkbox">
      <span class="todoList__content__item_new__checkbox_container__checkmark"></span>
      <p class="todoList__content__item_new__checkbox_container__task_name">${taskName}</p>
    </label>
    <button class="todoList__content__item_new__delete"></button>
  </div>
  <div class="todoList__content__item_new__underline"></div>`

    // 新增 Todo list 清單
    const rootElement = document.querySelector('.todoList__content')
    rootElement.appendChild(itemNew)

    // 清空 default input 輸入框的數值
    document.querySelector('input[name=item_default_text]').value = ''
  }
})

// 刪除代辦事項
document.querySelector('.todoList__content').addEventListener('click', (e) => {
  if (e.target.classList.contains('todoList__content__item_new__delete')) {
    // 拿到 <div class="todoList__content__item_new">
    const delElement = e.target.parentNode.parentNode
    // 拿到 <div class="todoList__content">
    const parentElement = e.target.parentNode.parentNode.parentNode
    parentElement.removeChild(delElement)
  }
})
