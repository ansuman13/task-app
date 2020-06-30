const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


router.get('/tasks', async (request, response)=>{
    try{
        const tasks = await Task.find({})
        response.send(tasks)
    }catch(ex){
        response.status(500).send(ex)
    }
})

router.get('/tasks/:id', async (request, response)=>{
    try{
        const task = await Task.findById(request.params.id)
        if(!task){ response.status(404).send() }
        response.send(task)
    }catch(error){
        response.status(500).send()
    }
})


router.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task) 
    }catch(error){
        res.status(400).send(error)
    }
})


router.patch('/tasks/:id', async (request, response)=>{
    const updates = Object.keys(request.body)
    const possibleUpdateKeys = ['description','completed']
    const isValidOperation = updates.every( (key)=> possibleUpdateKeys.includes(key))

    if(!isValidOperation){
        return response.status(400).send({error:'Invalid Update!'})
    }
    try{
        const task = await Task.findByIdAndUpdate(request.params.id,
            request.body, {new:true, runValidators:true})
        console.log('here am i',request.body)
        response.send(task)
    }catch(e){
        response.send(400).send({e})
    }
})


router.delete('/tasks/:id' , async (request, response)=>{
    try{
        const task = await Task.findByIdAndDelete(request.params.id)
        if(!task){ 
            response.status(404).send() 
        }
        response.send(task)
    }catch(exception){
        response.statu(500).send()
    }

})

module.exports=router
