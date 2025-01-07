function customMap(arr, fn) {
    const transformedArray = [];

    for (let i = 0; i < arr.length; i++) {
        transformedArray[i] = fn(arr[i], i);
    }

    return transformedArray;
}


const arr = [1, 2, 3, 4, 5];
const mappingFunction = (value, index) => value * index;

const transformedArray = customMap(arr, mappingFunction);
console.log(transformedArray);
  