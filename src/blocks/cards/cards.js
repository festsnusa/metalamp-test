const inputsFrom = document.querySelectorAll('.date-picker-start')
const inputsTo = document.querySelectorAll('.date-picker-end')

inputsFrom.forEach((input, index) => {
  input.addEventListener('click', showCalendar.bind(null, index))
})

inputsTo.forEach((input, index) => {
  input.addEventListener('click', showCalendar.bind(null, index))
})

function showCalendar(i) {
  const datePicker = document.querySelectorAll('.date-picker')[i]
  datePicker.classList.toggle('date-picker__active')
}