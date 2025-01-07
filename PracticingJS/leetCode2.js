function filterArray(arr, fn) {
    const filteredArr = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i)) {
        filteredArr.push(arr[i]);
      }
    }
  
    return filteredArr;
  }
  

  const arr = [1, 2, 3, 4, 5];
  const fn = (value, index) => value % 2 === 0;
  
  console.log(filterArray(arr, fn)); 