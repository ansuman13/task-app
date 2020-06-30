require('./mongoose.js')
const User = require('../models/user.js')

User.findByIdAndDelete('5ef8c4201dd6ae138632af00').then( (result)=>{
    console.log(result)
    return User.countDocuments()
}).then((count)=> { 
    console.log('users count:', count)
}).catch((error) => {
    console.log(error)
})
