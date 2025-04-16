// Switch to the correct database
use('apollonia_dental_care');

// Clear existing data
db.employees.deleteMany({});
db.departments.deleteMany({});

// Insert Departments
const departments = [
  { name: 'Dentistry', description: 'Department of Dentistry' },
  { name: 'Hygiene', description: 'Department of Hygiene' },
  { name: 'Orthodontics', description: 'Department of Orthodontics' },
  { name: 'Administration', description: 'Department of Administration' },
  { name: 'Reception', description: 'Department of Reception' },
];

const insertedDepartments = db.departments.insertMany(departments);
print('✅ Departments inserted successfully.');

// Get Department IDs
const deptIds = {
  dentistry: insertedDepartments.insertedIds[0],
  hygiene: insertedDepartments.insertedIds[1],
  orthodontics: insertedDepartments.insertedIds[2],
  admin: insertedDepartments.insertedIds[3],
  reception: insertedDepartments.insertedIds[4],
};
//purpose of the above oject
//Since MongoDB generates the IDs, you don't know them beforehand. But using insertedDepartments.insertedIds, 
// you're able to map the generated IDs to the appropriate department.
// Insert Employees
const employees = [
  {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    department: deptIds.dentistry,
  },
  {
    name: 'Alice',
    surname: 'Smith',
    email: 'alice.smith@example.com',
    department: deptIds.hygiene,
  },
  {
    name: 'Robert',
    surname: 'Johnson',
    email: 'robert.johnson@example.com',
    department: deptIds.orthodontics,
  },
  {
    name: 'Emma',
    surname: 'Brown',
    email: 'emma.brown@example.com',
    department: deptIds.admin,
  },
  {
    name: 'Michael',
    surname: 'Williams',
    email: 'michael.williams@example.com',
    department: deptIds.reception,
  },
  {
    name: 'Sophia',
    surname: 'Davis',
    email: 'sophia.davis@example.com',
    department: deptIds.dentistry,
  },
  {
    name: 'Liam',
    surname: 'Miller',
    email: 'liam.miller@example.com',
    department: deptIds.hygiene,
  },
  {
    name: 'Olivia',
    surname: 'Garcia',
    email: 'olivia.garcia@example.com',
    department: deptIds.orthodontics,
  },
  {
    name: 'William',
    surname: 'Martinez',
    email: 'william.martinez@example.com',
    department: deptIds.admin,
  },
  {
    name: 'Charlotte',
    surname: 'Wilson',
    email: 'charlotte.wilson@example.com',
    department: deptIds.reception,
  },
];

db.employees.insertMany(employees);
print('✅ Employees inserted successfully.');

