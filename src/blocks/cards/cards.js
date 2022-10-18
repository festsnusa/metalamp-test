console.log('!')

let dpMin, dpMax;

let options = {
    // keyboardNav: true,
    range: true,
    dateFormat(date) {
      return date.toLocaleString([], {
        day: "2-digit",
        month: "long"
      });
    },
    multipleDatesSeparator: " - "
  };
  
let dp = new AirDatepicker("#el1", options);