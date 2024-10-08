const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/auth-controller')
const {registerValidator,loginValidator} = require('../middlewares/validators')
const authenticate = require('../middlewares/authenticate')

authRouter.post("/register", registerValidator,authController.register)
authRouter.post("/login", loginValidator,authController.login)
authRouter.put("/resetpassword", ()=> {})
authRouter.put("/editProfile", ()=> {})
authRouter.get("/current-user",authenticate.auth,authController.getMe)


module.exports = authRouter