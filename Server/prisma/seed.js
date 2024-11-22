const bcrypt = require('bcryptjs')
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


const hashedPassword =  bcrypt.hashSync("123456",10)

const userData = [
    {firstName : "Andy", lastName : "Codecamp", username: "koratsad",password : hashedPassword, email: "user@gmail.com", profileImage : 'https://www.svgrepo.com/show/420342/avatar-male-president.svg'},
    {firstName : "Bobby", lastName : "Codecamp", username: "koratsad2",password : hashedPassword, email: "user2@gmail.com", profileImage : 'https://www.svgrepo.com/show/420318/afro-boy-child.svg'},
    {firstName : "Candy", lastName : "Codecamp", username: "koratsad3",password : hashedPassword, email : "user3@gmail.com", profileImage : 'https://www.svgrepo.com/show/420317/artist-avatar-marilyn.svg'},
    {firstName : "Sindy", lastName : "Codecamp", username: "koratsad4",password : hashedPassword, email : "user4@gmail.com", profileImage : 'https://www.svgrepo.com/show/420325/avatar-nun-sister.svg'},

]

console.log("DB Seed...")

async function run(){
    await prisma.user.createMany({
        data : userData
    })
}

run()