function largestInArray(array){
    let initialLargest = array[0];
    for (let i=1;i<=array.length;i++){
        if(array[i]>initialLargest){
            initialLargest=array[i];
        }
    }return initialLargest;

}
let arr =[4,7,1,3,19];
let largestNum=largestInArray(arr);
console.log(largestNum);
