const arrayLength =5;
const array=[1,2,3,4,5];
const sumOfArray =array.reduce((acc,sum)=>acc+sum,0);
const mappedArray=array.map(()=>4);
const sumOfMappedArray=mappedArray.reduce((acc,sum)=>acc+sum,0);
console.log(sumOfArray);
console.log(mappedArray);
console.log(sumOfMappedArray);