const userModel = require("../model/userModel");

const  signUpHelper=(data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
          const insertedData=await userModel.create(data)
          console.log(insertedData)
          resolve(insertedData)
        } catch (error) {
           reject(error) 
        }
    })
}

module.exports={
    signUpHelper
}