const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

/* BEGIN - create routes here */
// gets users through link written into the response
app.get ('/', (req,res) => {
  res.send('<a href="http://localhost:4000/users">Get Users</a>')
})
// gets all users and writes them in JSON
app.get ('/users', (req,res) => {
  res.json(users)
})

//allows user to access any specific user
app.get ('/users/:id', (req,res) => {
  const found = users.some(user => user._id == req.params.id)
  if (found){
    res.send(users.filter(user => user._id == req.params.id) )
  } else {
    res.status(400).json({msg: `User id ${req.params.id}not found.`})
  }
})

//posting a new user
app.post('/users', (req,res) => {
  const newUser = {
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  }
  //pushing the new user into the array
  users.push(newUser)
  //requesting the list of users
  res.json(users)
})

//put to update a user
app.put('/users/:id', (req,res) => {
  const found = users.find(user => user._id == req.params.id);
  console.log("found:", found._id)
  if (found) {
  const updateUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar,
  }
  //first add updated field to users/5 then push the entire update user 
  //object to the array -- THIS IS WHERE YOU LEFT OFF
  users.splice(found._id - 1, 1);
  users.push(updateUser)
  res.json(updateUser)}
})

// delete request

// allow user to delete the first id
app.delete("/users/:id", (req, res) => {
  const found = users.find(user => user._id == req.params.id);
  if (found) {
    const userObject = users.filter(user => user._id == req.params.id);
    console.log(userObject[0]);
    users.splice(userObject[0]._id - 1, 1);
    res.send("msg:deleted!");
} else {
  res.status(400).json({msg: `user id ${req.params.id} not found.`})
}
})


/* END - create routes here */


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))