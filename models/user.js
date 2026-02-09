import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    strict:true//difference between strict and req?ans:-
});

userSchema.pre('save',async function(){
    console.log("Pre-save hook triggered for user:", this.email);
    if(!this.isModified('password')){
        return;
    }
    this.password=await bcrypt.hash(this.password,10);
});

const User=mongoose.model('User',userSchema);

export default User;