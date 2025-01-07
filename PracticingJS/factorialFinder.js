const factorialFinder =(input)=>{
    if(input ===1){
        return 1;
    }
    let result =1;
    for(let i=1;i<=input;i++){
        result *=i;
    }
    return result;
}
const inputNumber =0;
const factorial = factorialFinder(inputNumber);
console.log(factorial);