require("dotenv").config()
const prisma = require("../models/prisma")

async function run(){
    await prisma.$executeRawUnsafe("DROP DATABASE MangaVerse")
    await prisma.$executeRawUnsafe("CREATE DATABASE MangaVerse")

}
console.log("Reset DB...")
run()