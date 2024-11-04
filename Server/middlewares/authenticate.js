const jwt = require("jsonwebtoken")
const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");
const prisma = require("../config/prisma");


module.exports.auth = tryCatch(async(req,res,next)=>{
  //  console.log("asdsadasdsadsaasdmaslkfjsalfjaflk")
        // const authHeader = req.headers.authorization;
        // if(!authHeader){    
        //     return createError(401,"Token Missing")
        // }
        // const token = authHeader.split(" ")[1]
        // jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        //     if(err){    
        //         return createError(400,"Token Invalid")
        //     }
        //     req.user = decode
        //     next();
        // })
      


        const authorization = req.headers.authorization;
        // console.log(authorization,"asdadskahdsahsjdahsjashdkashdakshdksajhdksajhdksajdhkjsads")
        if (!authorization || !authorization.startsWith('Bearer ')) {
          createError({
            message: 'unauthenticated',
            statusCode: 401
          });
        }
  
        const accessToken = authorization.split(' ')[1];
        if(accessToken === null){
            createError({
                message: 'unauthenticated',
                statusCode: 401
              });
              return
        }
        // console.log("object",accessToken)

        const payload = jwt.verify(accessToken, process.env.SECRET_KEY);
        
        // console.log(payload,'111111111111111111111111111111')
        // console.log(payload)
        const user = await prisma.user.findUnique({ where: { id: payload.user.id } });
        if (!user) {
          createError({
            message: 'user was not found',
            statusCode: 400
          });
        }
        
        delete user.password;
        
        req.user = user;
        next();
   
})