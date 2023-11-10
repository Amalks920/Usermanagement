const jwt=require('jsonwebtoken')

const generateToken= (id,key,timestamp)=>{   
return jwt.sign({id},key,{expiresIn:timestamp})
}


module.exports=generateToken;