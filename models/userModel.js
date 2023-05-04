const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, "Please provide a valid E-mail address"],
    },
    role:{
        type: String,
        // required:true,
        
    },
    active:{
        type:Boolean,
        // required:true,
    },
    photo:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select: false,
    },
    passwordConfirm:{
        type:String,
        // required:true,
        minlength:8,
        validate:{
            // This only works on create and Save
            validator: function(el){
                return el === this.password;
            },
            message: "Password do not match",
        }
    },
})

userSchema.pre('save', async function(next){
    // only run this function if password was actually modified
    if(!this.isModified('password')){
        return next();
    };
    // hash time password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete confirmPassword field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
