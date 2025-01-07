function removeDuplicates(arr){
   return  arr.filter((value,index)=>arr.indexOf(value)===index);
}
const numbers =[1,2,2,3,4,4,1,3];
console.log(removeDuplicates(numbers));