const express = require("express")
const favoriteRouter = express.Router()
const favoriteController = require("../controller/favorite-controller")
const authenticate = require('../middlewares/authenticate')
favoriteRouter.post("/",authenticate.auth,favoriteController.createFavorite)
favoriteRouter.delete("/:mangaId",authenticate.auth,favoriteController.deleteFavorite)

module.exports = favoriteRouter