let slideIndex = 1
let maxSlides = 4

let slideshowContainer = document.querySelectorAll(".slideshow-container")

slideshowContainer.forEach((container, i) => {

  let containerSlides = container.getElementsByClassName('mySlides')
  let containerDots = container.getElementsByClassName('dot')

  Array.from(containerDots).forEach((e, i) => {
    e.addEventListener('click', currentSlide.bind(null, i))
  })

  let previousButton = container.getElementsByClassName('slideshow-container__prev')[0]
  let nextButton = container.getElementsByClassName('slideshow-container__next')[0]

  previousButton.addEventListener('click', plusSlides.bind(null, -1))
  nextButton.addEventListener('click', plusSlides.bind(null, 1))

  showSlides(slideIndex)

  function showSlides(n) {
    let i
  
    if (n > containerSlides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = containerSlides.length }
    for (i = 0; i < containerSlides.length; i++) {
      containerSlides[i].style.display = "none"
    }
    for (i = 0; i < containerDots.length; i++) {
      containerDots[i].className = containerDots[i].className.replace(" active", "")
    }
    containerSlides[slideIndex - 1].style.display = "block"
    containerDots[slideIndex - 1].className += " active"
  }

  function plusSlides(n) {
    if (slideIndex == maxSlides && n == 1) return
    else if (slideIndex == 1 && n == -1) return
    showSlides(slideIndex += n)
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n)
  }

})