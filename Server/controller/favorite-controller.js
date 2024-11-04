const prisma = require('../config/prisma')
const createError = require('../utils/createError')

module.exports.createFavorite = (async (req, res, next) => {
    try {
        const { mangaId } = req.body
        const mangaData = await prisma.manga.findUnique({
            where: {
                id: mangaId
            }
        })
        const favoriteManga = await prisma.favorite.findMany({
            where: {
                mangaId: +mangaId,
                userId: req.user.id
            }
        })
        if (favoriteManga > 0) {
            createError(400, "Can't favorite this manga anymore")
        }
        const result = await prisma.favorite.create({
            data: {
                userId: req.user.id,
                mangaId: mangaId
            }
        })

        res.status(200).json({ result })
    } catch (err) {
        next(err)
    }
})

module.exports.deleteFavorite = (async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await prisma.favorite.delete({
            where: {
                userId_mangaId: {
                    mangaId: +id,
                    userId: req.user.id
                }
            }
        })
        res.json(result)
    } catch (err) {
        next(err)
    }
})