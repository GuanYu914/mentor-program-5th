// 留言板首頁點擊 "編輯暱稱"
document.querySelector('.board__info__button').addEventListener('click', () => {
  document.getElementById('nickname__form').classList.toggle('hidden');
})