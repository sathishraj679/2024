// Recursive Fibonacci function to calculate the nth Fibonacci number
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Function to generate the Fibonacci sequence up to n elements
function generateFibonacci(n) {
    const fibSequence = [];

    for (let i = 0; i < n; i++) {
        fibSequence.push(fibonacciRecursive(i)); // Call the recursive function
    }

    return fibSequence;
    
}

// Example usage:
let input =7;
console.log(generateFibonacci(input));
console.log(fibonacciRecursive(input)); 

