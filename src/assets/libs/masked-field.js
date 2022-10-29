const inputMaskedText = document.querySelector(".js-input__box--masked-field")

new Cleave(inputMaskedText, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.', '.']
})