const dropdownInputs = document.querySelectorAll('.js-dropdown__input')
const dropdownLists = document.querySelectorAll('.dropdown__list')

const icons = document.querySelectorAll('.dropdown__icon')

dropdownInputs.forEach((dropdownInput, index) => {
    dropdownInput.addEventListener('click', hideRevealList.bind(null, index))
})

icons.forEach((icon, index) => {
    icon.addEventListener('click', hideRevealList.bind(null, index))
})

function hideRevealList(i) {

    dropdownLists[i].classList.toggle('dropdown__list-shrinked')

    if (dropdownInputs[i].value == '' || dropdownLists[i].classList.contains('dropdown__list-shrinked')) {
        hideRevealClearButton(i, true)
    }

    else if (dropdownInputs[i].value != '') {
        hideRevealClearButton(i, false)
    }

    icons[i].classList.toggle('dropdown__icon_rotated')

}

const clearButtons = document.querySelectorAll('.dropdown__clear-button__caption')

clearButtons.forEach((clearButton, index) => {
    clearButton.addEventListener('click', applyClearButton.bind(null, index))
})

const dropdownSubmitButtons = document.querySelectorAll('.dropdown__submit-button')

dropdownSubmitButtons.forEach((dropdownSubmitButton, index) => {
    dropdownSubmitButton.addEventListener('click', applyGuestsChanges.bind(null, index))
})

const guests = {
    count: 0,
    babies: 0
}

const rooms = {
    bedrooms: 0,
    beds: 0,
    restrooms: 0
}

const guestsCategories = ['adults', 'children', 'babies']
guestsCategories.forEach(e => {
    createGuestsCategory(e)
})

const roomsCategories = ['bedrooms', 'beds', 'bathrooms']

roomsCategories.forEach(e => {
    createRoomsCategories(e)
})

function createRoomsCategories(str) {

    const buttonsMinus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-minus-${str}`)
    const counters = document.querySelectorAll(`.js-dropdown__list-item__counter-${str}`)
    const buttonsPlus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-plus-${str}`)

    buttonsMinus.forEach((buttonMinus, index) => {
        buttonMinus.addEventListener('click', applyButtonEvent.bind(null, index, '-'))
    })

    buttonsPlus.forEach((buttonsPlus, index) => {
        buttonsPlus.addEventListener('click', applyButtonEvent.bind(null, index, '+'))
    })

    function applyButtonEvent(i, operator) {

        if (counters[i].textContent == '0' && operator == '-') return
        counters[i].textContent = changeCounter(counters[i].textContent, operator)
        changeNumberOfRooms(i, operator)
        
    }

}

function changeNumberOfRooms(i, operator) {

    let quantity = eval(`${rooms[Object.keys(rooms)[i]]} ${operator} 1`)

    rooms[Object.keys(rooms)[i]] = (quantity < 0) ? 0 : quantity

    let nums = [2, 3, 4]

    let numBedrooms = Object.entries(rooms)[0][1]
    let bedroomsWord = numBedrooms == 1 ? 'спальня' : nums.includes(numBedrooms) ? 'спальни' : 'спален'
    let numBeds = Object.entries(rooms)[1][1]
    let bedsWord = numBeds == 1 ? 'кровать' : nums.includes(numBeds) ? 'кровати' : 'кроватей'
    let numBathrooms = Object.entries(rooms)[2][1]
    let bathroomsWord = numBathrooms == 1 ? 'ванная комната' : nums.includes(numBathrooms) ? 'ванные комнаты' : 'ванных комнат'

    let result = []

    if (numBedrooms > 0) result.push(`${numBedrooms} ${bedroomsWord}`)
    if (numBeds > 0) result.push(`${numBeds} ${bedsWord}`)
    if (numBathrooms > 0) result.push(`${numBathrooms} ${bathroomsWord}`)

    dropdownInputs[i].value = result.join(', ')

}

function createGuestsCategory(str) {

    let isAdult = (str == 'babies') ? false : true

    const buttonsMinus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-minus-${str}`)
    const counters = document.querySelectorAll(`.js-dropdown__list-item__counter-${str}`)
    const buttonsPlus = document.querySelectorAll(`.js-dropdown__list-item__counter-button-plus-${str}`)

    buttonsMinus.forEach((buttonMinus, index) => {
        buttonMinus.addEventListener('click', applyButtonEvent.bind(null, index, '-'))
    })

    buttonsPlus.forEach((buttonsPlus, index) => {
        buttonsPlus.addEventListener('click', applyButtonEvent.bind(null, index, '+'))
    })

    function applyButtonEvent(i, operator) {

        if (counters[i].textContent == '0' && operator == '-') return
        counters[i].textContent = changeCounter(counters[i].textContent, operator)
        changeNumberOfGuests(i, operator, isAdult)
    }
}

function changeCounter(value, operator) {
    let result = eval(`${value} ${operator} 1`)
    return result < 0 ? 0 : result
}

function changeNumberOfGuests(i, operator, isAdult = true) {

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

    let result = []

    if (numAdults > 0) result.push(`${numAdults} ${adultWord}`)
    if (numBabies > 0) result.push(`${numBabies} ${babyWord}`)

    let hide = (result.length == 0) ? true : false
    hideRevealClearButton(i, hide)

    dropdownInputs[i].value = result.join(', ')

}

// clear button //
function hideRevealClearButton(i, hide = false) {
    clearButtons[i].style.visibility = hide ? 'hidden' : 'visible'

}

function applyClearButton(i) {
    dropdownInputs[i].value = ''

    guestsCategories.forEach(e => {
        document.querySelector(`.js-dropdown__list-item__counter-${e}`).textContent = '0'
    })

    for (let [key, value] of Object.entries(guests)) {
        guests[key] = 0
    }

    hideRevealClearButton(i, true)
}

function applyGuestsChanges(i) {
    dropdownLists[i].classList.add('dropdown__list-shrinked')
    hideRevealClearButton(i, true)
}