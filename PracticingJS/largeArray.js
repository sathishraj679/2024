//initially we create a function to find the largest number in a array
function findlargestNum(arr){//arr is the parameter of the largestnum function
    if (arr.length===null){
        return null;
    }
    return Math.max(...arr);

}
const numbers =[3,5,7,1,6,17,12];
const largestnum=findlargestNum(numbers);
console.log(largestnum);
