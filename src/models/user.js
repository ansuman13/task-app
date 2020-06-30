const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is Invalid !')
			}
		}
	},
	password:{
		type:String,
		required:true,
		trim:true,
		validate(v){
			if(v.toLowerCase().includes('password')){
				throw new Error('should not contain password')
			}
			if(v.length<7){
				throw new Error('should be more than 7 characters.')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value){
			if(value<0){
				throw new Error('Value greater than 0 Required !')
			}
		}
	}
})

module.exports = User