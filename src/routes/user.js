const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    try {
        const user = await user.save()
        return res.send(user)
    } catch (err) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const result = await User.find({})
        res.send(result)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            return response.status(404).send()
        }
        response.send(user)
    } catch (error) {
        response.status(500).send()
    }
})

router.patch('/users/:id', async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'phone', 'age']
    const isValidUpdate = updates.every((key) => allowedUpdates.includes(key))
    if (!isValidUpdate) {
        return response.send({
            error: 'Invalid Operation!'
        })
    }
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, {
            new: true
        })
        if (!user) {
            return response.status(404).send()
        }
        response.send(user)
    } catch (error) {
        response.status(500).send()
    }
})

router.delete('/user/:id', async (request, response) =>{
    try{
        const user = await User.findByIdAndDelete(request.params.id)
        if(!user){
            return response.status(404),send()
        }
        response.send(user)
    }catch(error){
        response.status(500).send(error)
    }
} )


module.exports = router