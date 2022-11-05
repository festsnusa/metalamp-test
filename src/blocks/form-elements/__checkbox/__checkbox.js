const checkboxHeaders = document.querySelectorAll('.expandable-checkbox__header')
const checkboxes = document.querySelectorAll('.expandable-checkbox')

checkboxHeaders.forEach((e, i) => {
  e.addEventListener('click', () => {
    checkboxes[i].classList.toggle('expandable-checkbox_expanded')
  })
})