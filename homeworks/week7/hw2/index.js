/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
document.querySelector('.faq__common_questions').addEventListener('click', (e) => {
  if (e.target.classList.contains('faq__common_questions__item')) {                       
    const questionNum = e.target.getAttribute('data-num')// 若直接選到 div.faq__common_questions__item 物件('data-num')                                 
    getFaqAnswer(questionNum) // 拿到 faq 問題編號，並開關 faq__answer--hide 屬性
  } else if (e.target.parentNode.classList.contains('faq__common_questions__item')) {     
    const questionNum = e.target.parentNode.getAttribute('data-num') // 若選到 div.faq__common_questions__item 的子物件('data-num')                      
    getFaqAnswer(questionNum) // 拿到 faq 問題編號，並開關 faq__answer--hide 屬性
  }
})

function getFaqAnswer(faqID) {
  switch (faqID) {
    case 'q1':
      document.querySelector('div.faq__common_questions__item:nth-child(1) p.faq__common_questions_item_answer').classList.toggle('faq__answer--hide')
      break
    case 'q2':
      document.querySelector('div.faq__common_questions__item:nth-child(2) p.faq__common_questions_item_answer').classList.toggle('faq__answer--hide')
      break
    case 'q3':
      document.querySelector('div.faq__common_questions__item:nth-child(3) p.faq__common_questions_item_answer').classList.toggle('faq__answer--hide')
      break
    case 'q4':
      document.querySelector('div.faq__common_questions__item:nth-child(4) p.faq__common_questions_item_answer').classList.toggle('faq__answer--hide')
      break
    case 'q5':
      document.querySelector('div.faq__common_questions__item:nth-child(5) p.faq__common_questions_item_answer').classList.toggle('faq__answer--hide')
      break
    default:
      break
  }
}
