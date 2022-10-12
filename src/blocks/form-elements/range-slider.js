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

    rangeSlider.noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = `${Math.round(values[handle]).toLocaleString()} ₽`
    })

}