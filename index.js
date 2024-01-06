const express = require('express')
const app = express()
const port = 5005
const router = express.Router()

// APPLICATION LEVEL MIDDLEWARE
const loggerMiddleware = (req, res, next) =>{
    console.log(`${new Date()} Request --- [${req.method}] [${req.url}]`)
    next()
}

app.use(loggerMiddleware)

// ROUTER LEVEL MIDDLEWARE
app.use('/api/users', router)
const getUsers = (req, res) =>{
    res.json({message: 'Get all users'})
}

const createUser = (req, res) =>{
    res.json({message: 'Create new user'})
}

const fakeAuth = (req, res, next) =>{
    const authStatus = true
    if(authStatus){
        console.log(`User authStatus: ${authStatus}`)
        next()
    } else{
        res.status(401)
        throw new Error('User not authorized')
    }
}

router.route('/').get(getUsers).post(createUser)
router.use(fakeAuth)




app.listen(port, () =>{
    console.log(`Server started on Port ${port}`)
})