let allEmployees = [];

// 🚀 Load Employees from API
function loadEmployees() {
  $.ajax({
    url: 'http://localhost:5000/api/employees',
    method: 'GET',
    success: function (data) {
      allEmployees = data; // Store employees for filtering
      console.log('All Employees:', allEmployees); // Debugging
      renderEmployees(allEmployees); // Render employees after loading
    },
    error: function () {
      alert('Error loading employees');
    },
  });
}

// 🎨 Render Employees in Table
function renderEmployees(data) {
  let rows = '';
  if (data.length === 0) {
    rows = `<tr><td colspan="5">No employees found.</td></tr>`;
  } else {
    data.forEach((employee) => {
      rows += `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.surname}</td>
          <td>${employee.email}</td>
          <td>${employee.department?.name || 'No Department'}</td>
          <td>
            <button onclick="openEditModal('${employee._id}', '${employee.name}', '${employee.surname}', '${employee.email}', '${employee.department?._id || ''}')">Edit</button>
            <button onclick="deleteEmployee('${employee._id}')">Delete</button>
          </td>
        </tr>
      `;
    });
  }
  $('#employee-list').html(rows);
}

// ❌ Delete Employee
function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    $.ajax({
      url: `http://localhost:5000/api/employees/${id}`,
      method: 'DELETE',
      success: function () {
        alert('Employee deleted successfully!');
        loadEmployees(); // ✅ Reload employees after delete
      },
      error: function () {
        alert('Error deleting employee');
      },
    });
  }
}

// 🏢 Filter by Department and Search by Name
function applyFilters() {
  const selectedDept = $('#department-filter').val();
  const query = $('#search-box').val().toLowerCase();

  console.log('Selected Department:', selectedDept);
  console.log('Search Query:', query);

  let filteredEmployees = allEmployees;

  // Apply department filter
  if (selectedDept) {
    filteredEmployees = filteredEmployees.filter((emp) =>
      emp.department?._id.toString() === selectedDept
    );
  }

  // Apply search filter
  if (query) {
    filteredEmployees = filteredEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(query)
    );
  }

  console.log('Filtered Employees:', filteredEmployees);
  renderEmployees(filteredEmployees);
}

// 📦 jQuery Ready Block
$(document).ready(function () {
  console.log('jQuery is loaded!'); // Debugging

  // Load employees and departments on page load
  loadEmployees();
  loadDepartments();

  // Attach event listeners for filtering
  $('#department-filter').on('change', function () {
    console.log('Department filter changed!'); // Debugging
    applyFilters();
  });

  $('#search-box').on('keyup', function () {
    console.log('Search box keyup!'); // Debugging
    applyFilters();
  });

  // 🏢 Load Departments for Dropdowns
  function loadDepartments() {
    $.ajax({
      url: 'http://localhost:5000/api/departments',
      method: 'GET',
      success: function (data) {
        let options = '<option value="">All Departments</option>';
        data.forEach((department) => {
          options += `<option value="${department._id}">${department.name}</option>`;
        });
        // Fill all dropdowns
        $('#department').html(options); // For add form
        $('#edit-department').html(options); // For edit form
        $('#department-filter').html(options); // For department filter
      },
      error: function () {
        alert('Error loading departments');
      },
    });
  }

  // 🧑‍💼 Add Employee Form Submission
  $('#add-employee-form').submit(function (e) {
    e.preventDefault();

    const newEmployee = {
      name: $('#name').val(),
      surname: $('#surname').val(),
      email: $('#email').val(),
      department: $('#department').val(),
    };

    $.ajax({
      url: 'http://localhost:5000/api/employees',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newEmployee),
      success: function () {
        alert('Employee added successfully!');
        loadEmployees(); // ✅ Reload employees after adding
        $('#add-employee-form')[0].reset(); // ✅ Clear form after submission
      },
      error: function (err) {
        alert('Error adding employee');
        console.error(err.responseJSON);
      },
    });
  });

  // 📝 Edit Employee Form Submission
  $('#edit-employee-form').submit(function (e) {
    e.preventDefault();

    const id = $('#edit-id').val();
    const updatedEmployee = {
      _id: id, // Include the ID in the updated employee object
      name: $('#edit-name').val(),
      surname: $('#edit-surname').val(),
      email: $('#edit-email').val(),
      department: $('#edit-department').val(),
    };

    $.ajax({
      url: `http://localhost:5000/api/employees/${id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedEmployee),
      success: function () {
        alert('Employee updated successfully!');
        closeModal();
        loadEmployees(); // Reload employees after update
      },
      error: function () {
        alert('Error updating employee');
      },
    });
  });
});

// 📝 Open Edit Modal
function openEditModal(id, name, surname, email, department) {
  $('#edit-id').val(id);
  $('#edit-name').val(name);
  $('#edit-surname').val(surname);
  $('#edit-email').val(email);

  // Load departments and pre-select the existing department
  $.ajax({
    url: 'http://localhost:5000/api/departments',
    method: 'GET',
    success: function (data) {
      let options = '<option value="">Select a Department</option>';
      data.forEach((dept) => {
        const selected = dept._id === department ? 'selected' : '';
        options += `<option value="${dept._id}" ${selected}>${dept.name}</option>`;
      });
      $('#edit-department').html(options);
    },
    error: function () {
      alert('Error loading departments');
    },
  });

  // Show the modal
  $('#edit-modal').show();
}

// ❌ Close Modal
function closeModal() {
  $('#edit-modal').hide();
}
  