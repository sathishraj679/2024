$(document).ready(function () {
    // Load items on page load
    loadItems();
  
    // Function to load all items
    function loadItems() {
      $.ajax({
        url: '/api/items',
        method: 'GET',
        success: function (data) {
          let rows = '';
          data.forEach((item) => {
            rows += `
              <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                  <button onclick="openEditModal('${item._id}', '${item.name}', '${item.description}', '${item.price}')">Edit</button>
                  <button onclick="deleteItem('${item._id}')">Delete</button>
                </td>
              </tr>
            `;
          });
          $('#item-list').html(rows);
        },
        error: function () {
          alert('Error loading items');
        },
      });
    }
  
    // Handle form submission to add a new item
    $('#add-item-form').submit(function (e) {
      e.preventDefault();
  
      const newItem = {
        name: $('#name').val(),
        description: $('#description').val(),
        price: parseFloat($('#price').val()),
      };
  
      $.ajax({
        url: '/api/items',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newItem),
        success: function () {
          alert('Item added successfully!');
          window.location.href = 'index.html';
        },
        error: function () {
          alert('Error adding item');
        },
      });
    });
  });
  
  // Open Edit Modal and pre-fill data
  function openEditModal(id, name, description, price) {
    $('#edit-id').val(id);
    $('#edit-name').val(name);
    $('#edit-description').val(description);
    $('#edit-price').val(price);
    
    // Show the modal
    $('#edit-modal').show();
  }
  
  // Close Edit Modal
  function closeModal() {
    $('#edit-modal').hide();
  }
  
  // Handle Edit Form Submission
  $('#edit-item-form').submit(function (e) {
    e.preventDefault();
  
    const id = $('#edit-id').val();
    const updatedItem = {
      name: $('#edit-name').val(),
      description: $('#edit-description').val(),
      price: parseFloat($('#edit-price').val()),
    };
  
    $.ajax({
      url: `/api/items/${id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedItem),
      success: function () {
        alert('Item updated successfully!');
        closeModal();
        loadItems(); // Reload items after update
      },
      error: function () {
        alert('Error updating item');
      },
    });
  });
  
  // Delete Item
  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      $.ajax({
        url: `/api/items/${id}`,
        method: 'DELETE',
        success: function () {
          alert('Item deleted successfully!');
          loadItems(); // Reload items after delete
        },
        error: function () {
          alert('Error deleting item');
        },
      });
    }
  }
  
  
  