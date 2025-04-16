function placeOrder() {
    const dishName = document.getElementById('dishName').value;
    const responseMessage = document.getElementById('responseMessage');
  
    // Make an API request to the backend to check dish availability
    fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dish: dishName })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        responseMessage.textContent = data.message;

        setTimeout(() => {
            responseMessage.textContent = "Your order is here!";
          }, 10000); 
      } else {
        responseMessage.textContent = data.message ;
      }
    })
    .catch(error => {
      responseMessage.textContent = "An error occurred. Please try again.";
    });
  }
  