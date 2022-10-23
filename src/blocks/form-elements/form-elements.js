///* DROPDOWN LIST *///
const guestsDropdownIcon = document.querySelector('.dropdown__input-icon')
const dropdownList = document.querySelector('.dropdown__list')
const dropdownInput = document.querySelector('.dropdown__input') // input field

const inputMaskedText = document.querySelector(".js-input__box--masked-field")

new Cleave(inputMaskedText, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.', '.']
})

guestsDropdownIcon.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown__list-shrinked') // toggle list
    if (dropdownList.classList.contains('.dropdown__list-shrinked')) hideRevealClearButton(true)
    else if (dropdownInput.textContent == '') hideRevealClearButton(true)
})

const clearButton = document.querySelector('.dropdown__clear-button__caption')
const dropdownSubmitButton = document.querySelector('.dropdown__submit-button')
clearButton.addEventListener('click', applyClearButton)
dropdownSubmitButton.addEventListener('click', applyGuestsChanges)

const guests = {
    count: 0,
    babies: 0
}

const categories = ['adult', 'children', 'babies']
categories.forEach(e => {
    createCategory(e)
})

function createCategory(str) {

    let isAdult = (str == 'babies') ? false : true

    const buttonMinus = document.querySelector(`.js-dropdown__list-item__counter-button-minus-${str}`)
    const counter = document.querySelector(`.js-dropdown__list-item__counter-${str}`)
    const buttonPlus = document.querySelector(`.js-dropdown__list-item__counter-button-plus-${str}`)

    buttonMinus.addEventListener('click', applyButtonEvent.bind(null, '-'))
    buttonPlus.addEventListener('click', applyButtonEvent.bind(null, '+'))

    function applyButtonEvent (operator) {
        counter.textContent = changeCounter(counter.textContent, operator)
        changeNumberOfGuests(counter.textContent, operator, isAdult)
    }
}

function changeCounter(value, operator) {
    let result = eval(`${value} ${operator} 1`)
    return result < 0 ? 0 : result
}

function changeNumberOfGuests(amount, operator, isAdult = true) {

    if (isAdult) {
        guests['count'] = eval(`${guests['count']} ${operator} 1`)
        if (guests['count'] < 0) guests['count'] = 0
    }
    else {
        guests['babies'] = eval(`${guests['babies']} ${operator} 1`)
        if (guests['babies'] < 0) guests['babies'] = 0
    }

    let nums = [2, 3, 4]

    let numAdults = Object.entries(guests)[0][1]
    let adultWord = numAdults == 1 ? 'гость' : nums.includes(numAdults) ? 'гостя' : 'гостей'
    let numBabies = Object.entries(guests)[1][1]
    let babyWord = numBabies == 1 ? 'младенец' : nums.includes(numBabies) ? 'младенца' : 'младенцев'

    console.log(numAdults, adultWord)
    console.log(numBabies, babyWord)

    let result = []

    if (numAdults > 0) result.push(`${numAdults} ${adultWord}`)
    if (numBabies > 0) result.push(`${numBabies} ${babyWord}`)

    let hide = (result.length == 0) ? true : false
    hideRevealClearButton(hide)

    dropdownInput.value = result.join(', ')

}

// clear button //
function hideRevealClearButton(hide = false) {
    clearButton.style.visibility = hide ? 'hidden' : 'visible'
}

function applyClearButton() {
    dropdownInput.value = ''

    categories.forEach(e => {
        document.querySelector(`.js-dropdown__list-item__counter-${e}`).textContent = '0'
    })

    hideRevealClearButton(true)
}

function applyGuestsChanges() {
    dropdownList.classList.add('dropdown__list-shrinked')
    hideRevealClearButton(true)
}



///* RANGE SLIDER *///
const rangeSlider = document.querySelector('.range-slider'),
    inputMin = document.querySelector('.range-slider__input-min'),
    inputMax = document.querySelector('.range-slider__input-max'),
    inputs = [inputMin, inputMax]

if (rangeSlider) {

    noUiSlider.create(rangeSlider, {
        start: [5000, 10000],
        connect: true,
        step: 1,
        range: {
            'min': [0],
            'max': [16000]
        }
    });

    rangeSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = `${Math.round(values[handle]).toLocaleString()} ₽`
    })

}