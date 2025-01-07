async function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Order taken"), 2000);  // Wait for customer to decide
    });
  }
  
  async function processOrder() {
    return new Promise((resolve, reject) => {
      let ingredientsAvailable = false;
      setTimeout(() => {
        if (ingredientsAvailable) {
          resolve("Order processed and cooking started");
        } else {
          reject("Ingredient missing, apologizing to customer");
        }
      }, 3000);  // Chef processes the order
    });
  }
  
  async function cookFood() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Food cooked and ready for delivery"), 5000);  // Oven cooking the food
    });
  }
  
  async function serveFood() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Food served to customer"), 1000);  // Serve the food
    });
  }
  
  async function handleCustomerOrder() {
    try {
      console.log(await takeOrder());  // Customer places the order
      console.log(await processOrder());  // Process the order, check ingredients
      console.log(await cookFood());  // Cook the food
      console.log(await serveFood());  // Serve the food
    } catch (error) {
      console.log(error);  // Handle ingredient error
    }
  }
  
  handleCustomerOrder();
  