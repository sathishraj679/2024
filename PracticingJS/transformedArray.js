const arrayTransFormation = (arr,fn)=>{
    let transformedArray=[];
    for(let i=0;i<arr.length;i++){
         transformedArray.push(fn(arr[i],i));
    }return transformedArray;
}
const arr1 = [1, 2, 3];
const plusone = function (n) { return n + 1; };
const plusI= function(n,i){return n+i};

console.log(arrayTransFormation(arr1, plusone));
console.log(arrayTransFormation(arr1, plusI));