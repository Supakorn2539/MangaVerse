const tryCatch = require('../utils/tryCatch')
const prisma = require('../config/prisma')
const createError = require('../utils/createError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports.register = tryCatch(async(req,res,next)=> {
    const {email,password,confirmPassword,firstName,lastName,username} = req.input
   
    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    })
    if(user){
        createError(401,'Email is already exist')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
        data : {
            email,
            password : hashedPassword,
            username,
            firstName,
            lastName
        },
        select : {
            email : true,
            username : true,
            firstName : true,
            lastName : true
        }
    })
    res.json(200,newUser)
    

})


module.exports.login = tryCatch(async(req,res,next)=> {
    const {email,password} = req.body
    const user = await prisma.user.findUnique({
        where : {
            email,
        }
    })
    if(!user){
        createError(401,"Email is not valid")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        createError(401,"Wrong Password")
    }
    const payload = {
        user : {
            id : user.id,
            email : user.email,
            role : user.role
        }
    }
    const payloadToken = {
        user : {
            id : user.id,
            email : user.email,
            role : user.role
        }
    }
    const token = jwt.sign(payloadToken,process.env.SECRET_KEY,{
        expiresIn : "30d"
    })

    res.json({user : payload,token : token} )
})

module.exports.getMe = tryCatch(async(req,res,next) => {
    res.status(200).json({ user: req.user });
    
   
})