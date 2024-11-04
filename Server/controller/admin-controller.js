const prisma = require("../config/prisma")
const tryCatch = require("../utils/tryCatch")

module.exports.getUser = tryCatch(async(req,res,next)=>{
    const member = await prisma.user.findMany({
        select : {
            id : true,
            email : true,
            role : true,
            isActive : true,
        }
    })
    res.status(200).json({member})
})

module.exports.updateMember = tryCatch(async(req,res,next)=>{
    const {userId} = req.params
    const {role,isActive} = req.body
    const member = await prisma.user.update({
        where : {
            id : +userId
        },
        data : {
            role : role,
            isActive : isActive
        }

    })
    res.status(200).json({member})
})
module.exports.deleteMember = tryCatch(async(req,res,next)=>{
    const {userId} = req.params
    const member = await prisma.user.delete({
        where : {
           id : +userId
        }
      })
      res.status(204).json({message : "Deleted SuccessFull"})
})