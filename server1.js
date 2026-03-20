//CURD operations with express and json file.

const express = require("express");
const app = express();
const user = require("./MOCK_DATA.json");
const fs = require("fs");
app.get("/user", (req, res) => {
  const html = `
    <ul>
            ${user.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("api//user", (req, res) => {
  return res.json(user);
});

app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const userData = user.find((u) => u.id == id);
  if(!user){
    return res.status(404).json({message:"user not found"});

  }
  else{
    return res.json(userData);
  }
});

app.post("/api/user", (req, res) => {
  const newUser = {
    id: user.length + 1,
    ...req.body,
  };
  user.push(newUser);
  fs.writeFile("MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
      return res.status(500).json({ message: "user can not be added" });
    } else {
      res.json({ message: "user added successfully", user: newUser });
    }
  });
});

app.patch("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = user.findIndex(user=>user.id == id);
  if(userIndex == -1){
    return res.status(404).json({message:"user not found"});
  } 
  user[userIndex] = { ...user[userIndex], ...req.body };
  fs.writeFile("MOCK_DATA.json", JSON.stringify(user), (err) => {
    if (err) {
      return res.status(500).json({ message: "user can not be updated" });
    } else {
      res.json({ message: "user updated successfully", user: user[userIndex] });
    }
  });
});

app.delete("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = user.findIndex(user=>user.id == id);        
    if(userIndex == -1){
        return res.status(404).json({message:"user not found"});
    }
    user.splice(userIndex,1);
    fs.writeFile("MOCK_DATA.json", JSON.stringify(user), (err) => {
        if (err) {
          return res.status(500).json({ message: "user can not be deleted" });
        } else {
          res.json({ message: "user deleted successfully" });
        }
        });
});


app.listen(3000);
