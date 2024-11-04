const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/auth-controller')
const {registerValidator,loginValidator, editProfileSchema} = require('../middlewares/validators')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')


authRouter.post("/register", registerValidator,authController.register)
authRouter.post("/login", loginValidator,authController.login)
authRouter.post("/resetpassword", authController.getResetLink)
authRouter.put("/resetpassword/",authController.resetPassword)
authRouter.patch("/editProfile", authenticate.auth,upload.single('profileImage'), authController.editProfile)
authRouter.get("/current-user",authenticate.auth,authController.getMe)


module.exports = authRouter