require('dotenv').config()
const cors = require('cors')
const express = require('express')
const db = require('./DBconfig/db')
const cat = require('./app/controllers/catCon')
const user = require('./app/controllers/userCon')
const item = require('./app/controllers/itemCon')
const authUser = require('./app/middleware/auth')
const app = express()
app.use(cors())
app.use(express.json())
db()
const port = process.env.PORT || 3000

//categories
app.post('/create/cat', authUser, cat.create)
app.get('/get/cat', authUser, cat.read)
app.delete('/delete/cat', authUser, cat.delete)

//users
app.post('/create/user', user.create)
app.get('/get/user', authUser, user.get)
app.post('/login', user.login)

//items
app.post('/create/item', authUser, item.create)
app.get('/get/items', authUser, item.getUserItems)
app.put('/edit/item/:id',authUser, item.edit)
app.delete('/delete/item/:id',authUser, item.delete)

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
