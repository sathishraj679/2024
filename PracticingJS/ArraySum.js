function customReduce(nums, fn, init) {
    let val = init;

    for (let num of nums) {
        val = fn(val, num);
    }

    return val;
}


const nums = [12,43,21];
const sum = customReduce(nums, (acc, curr) => acc + curr, 0);
console.log(sum); 