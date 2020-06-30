require('./mongoose.js')
const Task = require('../models/task')

// Task.findByIdAndDelete('5ef8cb1c61798816affdb0fc').then((result)=>{
//     console.log(result)
//     if(!result){ console.log('No Document with that id')}
//     return Task.countDocuments({completed:true})
// }).then((count)=>{
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// } )

const deleteTaskByIdAndCount = async (id) =>{
    console.log('async called')
    const result = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:true})
    return count
}

deleteTaskByIdAndCount('5ef8cb1c61798816affdb0fc').then( (count)=>{
    console.log('count',count)
}).catch( (error)=>{
    console.log('error',error)
})