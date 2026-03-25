//to Make rest api's we users rounts  as get,post,put,delete

const express = require('express');
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: 'Shayam', city: 'Mathura' },
  { id: 2, name: 'Mohan', city: 'Vanaras' }
];

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  return res.json(user);
});


app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  return res.json(users);
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  Object.assign(user, req.body);
  return res.json(users);
});



app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((u) => u.id === id);  
  if (index === -1) {
    return res.status(404).json({ message: 'user not found' });
  }
  users.splice(index, 1);
  return res.json({ message: 'user deleted' });
});


app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

