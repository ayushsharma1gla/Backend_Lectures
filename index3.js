const express = require("express");
const app = express();
app.use(express.json());

const user = [{id:1,Name:"Vaibhav"} ,{id:2,Name:"Rohit"}];
app.get("/users",(req.res)=>{
    const html=` 
    <ul>
        ${user.map(user=>`<li>${user.name} -${user.salary}</li>`).join
        ("")};
    </ul>
    `;
    res.send(html);
});

app.get("/api/user",(req.res)=>{
    res.json(user);
)};
app.listen(3000);