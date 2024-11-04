const express = require("express")
const adminRouter = express.Router()
const authenticate = require('../middlewares/authenticate')
const adminController = require('../controller/admin-controller')
adminRouter.get("/getUser",authenticate.auth,adminController.getUser)
adminRouter.patch("/member/:userId",authenticate.auth,adminController.updateMember)

adminRouter.delete("/member/:userId",authenticate.auth,adminController.deleteMember)

module.exports = adminRouter