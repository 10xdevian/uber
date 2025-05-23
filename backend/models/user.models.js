const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3, 'First name must be at least 3 charactre']
    },
    lastname:{
      type:String,
      required:true,
      minlength:[3, 'Last name must be at least 3 character']
    }
  },
  
  email:{
  type:String,
  required:true,
  unique:true,
  minlength:[5, 'Email must be at least 5 character']
},
password:{
type :String,
required:true,
},
socketId :{
  type:String,
}

})

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
  
}
userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
