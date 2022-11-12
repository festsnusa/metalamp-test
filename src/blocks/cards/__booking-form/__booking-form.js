import moment from "https://cdn.skypack.dev/moment@2.29.4"

calculateCost()

export function calculateCost() {

  let bookingForm = document.querySelector('.booking-form')

  let inputFrom = bookingForm.getElementsByClassName('date-picker-start')[0]
  let inputTo = bookingForm.getElementsByClassName('date-picker-end')[0]
  let multipliedPrice = document.querySelector('.booking-form__multiplied')

  let price = convertToNumber(document.querySelector('.price-section__price').innerText)
  let multipliedResult = document.querySelector('.booking-form__multiplied-result')

  let total = document.querySelector('.booking-form__result')

  if (inputFrom.value == '' || inputTo.value == '') {
    multipliedPrice.textContent = `${price}₽ x 0 суток`
    multipliedResult.textContent = `${price}₽`
    total.textContent = calculateTotalSection(0)
    return
  }

  let firstDate = moment(inputFrom.value,'D/M/YYYY')
  let secondDate = moment(inputTo.value,'D/M/YYYY')
  let diffDays = secondDate.diff(firstDate, 'days')

  let nightsWord = (diffDays == 1) ? 'сутка' : 'суток'

  multipliedPrice.textContent = `${price}₽ x ${diffDays} ${nightsWord}`
  multipliedResult.textContent = `${price*diffDays}₽`

  console.log(multipliedPrice.value)

  total.textContent = calculateTotalSection(price*diffDays)

}

function calculateTotalSection(multipliedResult) {

  if (multipliedResult == 0) return `0₽`

  let serviceAmount = document.querySelectorAll('.booking-form__amount')
  let result = multipliedResult

  serviceAmount.forEach(e => {
    console.log(e)
    result += +e.textContent.match(/\d/g).join('')
  })

  return `${result}₽`

}

function convertToNumber(str) {
  return +str.match(/\d/g).join('')
}