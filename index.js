const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// function checkUser(req, res, next) {
//   if (req.path == '/')
//     return next();
//   else if (task.getIg() != undefined) {
//     next();
//   }
//   else {
//     res.send({ message: 'Please wait for Instagram login' })
//   }
// }

// app.all('*', checkUser);

app.all('/likeAllPosts', async function (req, res) { 
  var task = require('./tasks/tasks')();
  await task.login(req.query.user,req.query.paswd)
  var user = req.query.username;
  await task.likeAllPosts(user, res)

})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})