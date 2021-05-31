// 新增代辦事項
document.querySelector('input[name=item_default_text]').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    console.log('Enter detected!')
    if (document.querySelector('input[name=item_default_text]').value === '') return
    // 產生 Todo list html 所需標籤
    // <div> class = todoList__content__item_new
    const todoListItemNew = document.createElement('div')
    todoListItemNew.classList.add('todoList__content__item_new')

    // <div> class = todoList__content__item_new__above_underline
    const todoListItemNewAboveUnderline = document.createElement('div')
    todoListItemNewAboveUnderline.classList.add('todoList__content__item_new__above_underline')

    // <label> class = todoList__content__item_new__checkbox_container
    const todoListItemNewCheckboxContainer = document.createElement('label')
    todoListItemNewCheckboxContainer.classList.add('todoList__content__item_new__checkbox_container')

    // <input type="checkbox" name="item_new_checkbox"/>
    const todoListItemNewCheckboxContainerCheckbox = document.createElement('input')
    todoListItemNewCheckboxContainerCheckbox.type = 'checkbox'
    todoListItemNewCheckboxContainerCheckbox.name = 'item_new_checkbox'

    // <span> class = todoList__content__item_new__checkbox_container__checkmark
    const todoListItemNewCheckboxContainerCheckmark = document.createElement('span')
    todoListItemNewCheckboxContainerCheckmark.classList.add('todoList__content__item_new__checkbox_container__checkmark')

    // <p> class = todoList__content__item_new__checkbox_container__task_name
    const todoListItemNewCheckboxContainerTaskname = document.createElement('p')
    todoListItemNewCheckboxContainerTaskname.classList.add('todoList__content__item_new__checkbox_container__task_name')
    todoListItemNewCheckboxContainerTaskname.innerText = document.querySelector('input[name=item_default_text]').value

    // <button> class = todoList__content__item_new__delete
    const todoListItemNewDelete = document.createElement('button')
    todoListItemNewDelete.classList.add('todoList__content__item_new__delete')

    // <div> class = todoList__content__item_new__underline
    const todoListItemNewUnderline = document.createElement('div')
    todoListItemNewUnderline.classList.add('todoList__content__item_new__underline')

    // 產生 Todo List html 架構
    todoListItemNewCheckboxContainer.appendChild(todoListItemNewCheckboxContainerCheckbox)
    todoListItemNewCheckboxContainer.appendChild(todoListItemNewCheckboxContainerCheckmark)
    todoListItemNewCheckboxContainer.appendChild(todoListItemNewCheckboxContainerTaskname)

    todoListItemNewAboveUnderline.appendChild(todoListItemNewCheckboxContainer)
    todoListItemNewAboveUnderline.appendChild(todoListItemNewDelete)

    todoListItemNew.appendChild(todoListItemNewAboveUnderline)
    todoListItemNew.appendChild(todoListItemNewUnderline)

    const rootElement = document.querySelector('.todoList__content')
    rootElement.appendChild(todoListItemNew)

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
