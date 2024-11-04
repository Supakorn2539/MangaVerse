const tryCatch = require('../utils/tryCatch')
const prisma = require('../config/prisma')
const createError = require('../utils/createError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const cloudinary = require('../config/cloudinary')
const fs = require('fs/promises')
const path = require('path')
const getPublicId = require('../utils/getPublicId')
require('dotenv').config()
module.exports.register = tryCatch(async (req, res, next) => {
    const { email, password, confirmPassword, firstName, lastName, username } = req.input

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (user) {
        createError(401, 'Email is already exist')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName
        },
        select: {
            email: true,
            username: true,
            firstName: true,
            lastName: true
        }
    })
    res.json(200, newUser)


})


module.exports.login = tryCatch(async (req, res, next) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (!user) {
        return createError(400, "Email is not valid")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return createError(400, "Wrong Password")
    }
    if(!user.isActive){
        return createError(403, "Your account has been banned. Please contact support.")
        
    }
    const payloadToken = {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            
        }
    }
    const token = jwt.sign(payloadToken, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })

    res.json({ user: payloadToken, token: token })
})

module.exports.getMe = tryCatch(async (req, res, next) => {
    res.status(200).json({ user: req.user });


})

module.exports.getResetLink = tryCatch(async (req, res, next) => {

    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return createError(404, "User not found")
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Configure your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const resetUrl = `${process.env.BASE_URL}/ResetPassword/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        text: `Reset your password by clicking the link: ${resetUrl}`,
        html: ``
    })
    res.status(200).json({ message: "Password reset link sent to your email" });
})

module.exports.resetPassword = tryCatch(async (req, res, next) => {

    const { password, token } = req.body
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    console.log(payload)
    const hashedPassword = await bcrypt.hash(password, 10)
    const newPassword = await prisma.user.update({
        where: { id: payload.id },
        data: { password: hashedPassword }
    })
    res.json(200, "Password AlreadyChange")
})

module.exports.editProfile = async (req, res, next) => {
    try {
        const user = req.user
        // console.log(user)
        const { email, username, firstName, lastName } = req.body
        const userData = await prisma.user.findFirst({
            where: { id: +user.id }
        })
        if (!userData) {
            createError(401, "Cannot Update")
        }
        // console.log("hello editprofile" )
        const haveFile = !!req.file
        let uploadResult = {}
        if (haveFile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: path.parse(req.file.path).name
            })
            fs.unlink(req.file.path)
        }
        if (userData.profileImage) {
            cloudinary.uploader.destroy(getPublicId(userData.profileImage))
        }
        // console.log(req.body,"reqbody")
        const data = haveFile ? {
            username, profileImage: uploadResult.secure_url, firstName, lastName, email
        } : { username, firstName, lastName, email }
        // console.log(data,"data")
        const mailExist = await prisma.user.findUnique({
           where : {
            email
           }
        })
       
        const userExist = await prisma.user.findUnique({
            where : {
                username
            }
        })
       
        const updated = await prisma.user.update({
            where: { id: +user.id },
            data: {
                username,
                firstName,
                lastName,
                email,
                profileImage : req.file ? uploadResult.secure_url : userData.profileImage
            }
        })

        

        res.json(200, updated)
    } catch (err) {
        next(err)
    }
}
