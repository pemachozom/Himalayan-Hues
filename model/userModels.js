const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true, 
        validate:[validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['admin','buyer','seller'],
        default:'buyer',
    },
    phoneNo: {
        type: String,
        maxlength: 8,
        
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        // passsword wont be included when we get a users
        select: false,
    },
    active: {
        type: Boolean,
        default:true,
        select:false,
    },
    passwordConfirm: {
        type:String,
        required: [true, 'Please confirm your password'],
        validate:{
            validator: function(el){
                return el===this.password
            },
            message:'Passwords are not the same',

        }

    },
})

//mongoose middleware
userSchema.pre('save', async function(next){  //function(next) ananomous fn.. next ..middleware(call back function)
    // only run this function if password was actually modified
    if(!this.isModified('password')) return next() //if passw

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)// 12 cost parameter

    // Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})


// Add Hashing to the Update of Password
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if(
        update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm) {
        
        // Hash the password with cost 12
        this.getUpdate().password = await bcrypt.hash(update.password, 12)

        update.passwordConfirm = undefined
        next()
    }else
    next()

})

//instance method is available in all document of certain collections
userSchema.methods.correctPassword = async function( 
    candidatePassword,
    userPassword,
){
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema)
module.exports = User