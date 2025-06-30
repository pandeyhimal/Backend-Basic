const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/users';

async function createUser(name) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
}

async function getAllUsers() {
  const res = await fetch(BASE_URL);
  return res.json();
}

async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

async function updateUser(id, name) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
}

async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.status;
}

(async () => {
  console.log('--- Create User ---');
  const created = await createUser('Charlie');
  console.log(created);

  console.log('--- Get All Users ---');
  const allUsers = await getAllUsers();
  console.log(allUsers);

  const userId = created.id || (allUsers[allUsers.length - 1] && allUsers[allUsers.length - 1].id);

  console.log('--- Get User By ID ---');
  const singleUser = await getUserById(userId);
  console.log(singleUser);

  console.log('--- Update User ---');
  const updated = await updateUser(userId, 'Charlie Updated');
  console.log(updated);

  console.log('--- Delete User ---');
  const delStatus = await deleteUser(userId);
  console.log('Delete status:', delStatus);

  console.log('--- Get All Users After Delete ---');
  const usersAfterDelete = await getAllUsers();
  console.log(usersAfterDelete);
})(); 