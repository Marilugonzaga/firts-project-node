const express = require('express')
const port = 3000
const app = express()
const uuid = require('uuid')

app.use(express.json())

const users = []

const checkUserId = (req, res, next) => {
    const {id} = req.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({mensage: 'User not found'})
    }

    req.userId = id
    req.userIndex = index

    next()

}

app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/users', (req, res) => {
    const {name, age} = req.body
    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return res.json(user)
})

app.put('/users/:id', checkUserId, (req, res) => {
    const {name, age} = req.body

    const id = req.userId
    const index = req.userIndex

    const updateUser = {id, name, age}

    users[index] = updateUser

    return res.json(updateUser)
})

app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.userId

    users.splice(index, 1)

    return res.status(204).json()
})

app.listen(port, () => {
    console.log(`Start on port ${port}`)
})