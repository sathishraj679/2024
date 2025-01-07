const createCounter=(n)=>{
    return ()=>n++;
}



/*var createCounter = function(n) {
    return function() {
        return n++;      
      };
    };*/

// Create a counter starting from 5
const myCounter = createCounter(5);
console.log(myCounter());
console.log(myCounter());
console.log(myCounter());