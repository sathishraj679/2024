var majorityElement = function (nums) {
    const frequency = {};
  
    nums.forEach((value) => {
      frequency[value] = (frequency[value] || 0) + 1;
    });
  
    let majorityNumber = null;
    let maxCount = 0;
  
    for (const [num, count] of Object.entries(frequency)) {
      if (count > maxCount) {
        maxCount = count;
        majorityNumber = Number(num);
      }
    }
  
    console.log(`Majority Number: ${majorityNumber}, Count: ${maxCount}`);
    return majorityNumber;
  };
  
  
  const nums = [3, 2, 3];
  majorityElement(nums); 