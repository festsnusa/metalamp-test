const ulTag = document.querySelector('.pagination__pages-list')
let totalPages = 15

function element(totalPages, page) {
  let liTag = ''
  let activeLi
  let beforePages = page - 1
  let afterPages = page + 1
  
  if (page > 1) { // if page value is greater than 1 then show the previous button
    liTag += `<li class="pagination__page pagination__previous data-num="1" title="Previous page" onclick="element(${totalPages}, ${beforePages})"><a href="#"><span class="pagination__arrow-previous material-symbols-outlined"></span></a>`
  }

  if (page > 2) { // if page value is greater than 2 then add new li tag with 1 value
    liTag += `<li class="pagination__page" data-num="1" onclick="element(${totalPages}, 1)"><a>1</a></li>`

    if (page > 3) { // if page value is greater than 3 then add new li with dots
      liTag += `<li class="pagination__page"> <a>... </a></li>`
    }
  }
  
  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (page == pageLength) { // if page value is equal to pageLength then assign the active string in the activeLi variable
      activeLi = 'active'
    }

    if (page < totalPages - 1) { // if page value is less than totalPages by -1 then show the last li tag or page which is 20
      // liTag += `<li class="pagination__page" data-num="1"><a>${totalPages}</a></li>`
  
      // if (page > totalPages - 2) { // if page value is less than totalPages by -2 then show the last (...) before last page
      //   liTag += `<li class="pagination__page"> <a>... </a></li>`
      // }
    }
    
    liTag += `<li class="pagination__page ${activeLi}" data-num="${pageLength}" onclick="element(totalPages, ${pageLength})"><a>${pageLength}</a></li>`
  }
  
  if (page < totalPages) { // if page value is less than totalPages then show the next button
    liTag += `<li class="pagination__page pagination__next" data-num="2" title="Next page" onclick="element(totalPages, ${afterPages})"><a href="#"><span class="pagination__arrow-next material-symbols-outlined"></span></a></li>`
  }
  
  ulTag.innerHTML = liTag
}

element(15, 5)
