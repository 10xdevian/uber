const userModel = require('../models/user.models');

module.exports.createUser = async ({
  firstname,lastname , email, password
})=> {
  if(!firstname || !email || !lastname){
    throw new Error("All field are required");
  }
  const user = userModel.create({
    fullname:{
      firstname,
      lastname
    },
    email,
    password
  })
  return user;
}