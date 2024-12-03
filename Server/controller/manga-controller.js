const tryCatch = require("../utils/tryCatch");
const prisma = require("../config/prisma")
const cloudinary = require("../config/cloudinary")
const fs = require('fs/promises'); 
const path = require('path'); 
const getPublicId = require('../utils/getPublicId');
const createError = require("../utils/createError");



module.exports.titlePost = tryCatch(async (req, res, next) => {
    
    const { mangaName, description, views,imageUrl } = req.body;
    const haveFile = !!req.file;

    // console.log("12312312312312",req.file)

    // console.log(req.body,"askdlsadasjdsajdksajdkasdjksadj")
   
    // Validate required fields
    if (!mangaName || !description) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    let uploadResult = {};

    if (haveFile) {
    //    console.log("asdasdasdasdsa")
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name
            });
            fs.unlink(req.file.path)
            
    }
    
    const data = {
        mangaName: mangaName,
        description: description,
        views: +views,
        imageUrl: uploadResult.secure_url || "",
        userId: req.user.id
    };

    const result = await prisma.manga.create({ data: data });
  
    res.json(result);
});

module.exports.getManga = tryCatch(async(req,res,next)=>{
   console.log(req.user)
    const result = await prisma.manga.findMany({
        orderBy : {createdAt : "desc"},
        where : {
            userId : +req.user.id
        }
        
    })
    console.log(result)
    
    res.json(result)
})

module.exports.deleteManga = tryCatch(async(req,res,next)=>{
    const {id} = req.params
    const postManga = await prisma.manga.findUnique({
        where : {id : +id}
    })
    if(postManga.userId != req.user.id){
        createError(401,"Cannot Delete")
    }
    
    const result = await prisma.manga.delete({
        where : {
            id : +id,
            userId : req.user.id
        }
    })
    res.status(204).json(result)
})

module.exports.postChapter = tryCatch(async(req,res,next)=>{
    const {description,chapterTitle,chapterNo} = req.body
    const {id} = req.params
    // console.log(req.files)
    // console.log(req.body)
    const chapExist = await prisma.chapter.findFirst({
        where : {
            mangaId : +id,
            chapterNo : +chapterNo,
        }
    })
    // console.log("TestChapterExist",chapExist)
    if(chapExist){
        createError(400,"Chapter Already Exist")
    }
    if(req.files.length === 0){
        createError(400,"At least 1 image to be uploaded")
    }
    const imagePromiseArray = []
    for(let file of req.files){
        const promiseUrl = await cloudinary.uploader.upload(file.path)
        imagePromiseArray.push(promiseUrl)
    }
   
    // console.log(promiseUrl)
    const imageArray = await Promise.all(imagePromiseArray)
    // console.log(imageArray)
    const data = await prisma.manga.findUnique({
        where : {
            id : +id
        }
    })
    // console.log(data)
    const newChapter = await prisma.chapter.create({
        data : {
            chapterTitle,
            chapterNo : +chapterNo,
            mangaId : +id,
            description,
        }

    })
    const newPage = await prisma.page.createMany({
        
            data : imageArray.map((el,index) => ({imageUrl : el.secure_url, pageNumber : index+1, chapterId : newChapter.id}))
        
    })
    
    res.status(200).json({newPage})
})

module.exports.getAllChapter = tryCatch(async(req,res,next)=>{
    const {id} = req.params
    // console.log('mangaId',id)
    const manga = await prisma.manga.findFirst({
        where: {
          id:+id
        },
        include: {
          chapters : true,
         
        }
      });
    res.status(200).json({manga})

})

module.exports.editChapter = tryCatch(async(req,res,next)=>{
    const {description,chapterTitle} = req.body
    const {id,chapterNo} = req.params
    // console.log(req.files)
    // console.log(req.body)
    const chapExist = await prisma.chapter.findFirst({
        where : {
            mangaId : +id,
            chapterNo : +chapterNo,
        }
    })
    console.log("TestChapterExist",chapExist)
    if(chapExist){
        const res = await prisma.chapter.delete({
            where : {
                
                id : chapExist.id
            }
        })
    }
    if(req.files.length === 0){
        createError(400,"At least 1 image to be uploaded")
    }
    const imagePromiseArray = []
    for(let file of req.files){
        const promiseUrl = await cloudinary.uploader.upload(file.path)
        imagePromiseArray.push(promiseUrl)
    }
   
    // console.log(promiseUrl)
    const imageArray = await Promise.all(imagePromiseArray)
    // console.log(imageArray)
    const data = await prisma.manga.findUnique({
        where : {
            id : +id
        }
    })
    // console.log(data)
    const newChapter = await prisma.chapter.create({
        data : {
            chapterTitle,
            chapterNo : +chapterNo,
            mangaId : +id,
            description,
        }

    })
    const newPage = await prisma.page.createMany({
        
            data : imageArray.map((el,index) => ({imageUrl : el.secure_url, pageNumber : index+1, chapterId : newChapter.id}))
        
    })
    
    res.status(200).json({newPage, message : "Updated Successful"})
})

module.exports.deleteChapter = tryCatch(async(req,res,next)=>{
    const {chapterId} =req.params
    const postChapter = await prisma.chapter.findUnique({
        where : {
            id : +chapterId
        }
    })
    if(!postChapter){
        createError(400,"Chapter doesn't Exist")
    }
    console.log("delete")
    const deleteChapter = await prisma.chapter.delete({
        where : {
            id : +chapterId
        }
    })
    res.status(204).json({deleteChapter})
})

module.exports.getAllPages = tryCatch(async(req,res,next)=>{
    const {id,chapterNo} = req.params
  
    const chapter = await prisma.chapter.findFirst({
        where : {
          mangaId : +id,
        chapterNo : +chapterNo
        }, include : {pages : true }
    })
    const totalChapters = await prisma.chapter.count({
        where : {
            mangaId : +id
        }
    })
    console.log(totalChapters)
    res.status(200).json({chapter,totalChapters})
})

module.exports.getAllManga = tryCatch(async(req,res,next)=>{
    const allManga = await prisma.manga.findMany({})
    
    res.status(200).json({allManga})
})

module.exports.searchManga = tryCatch(async (req, res, next) => {
    const { query } = req.query; 

    
    if (!query) {
        return res.status(400).json({ message: "Search query is required." });
    }

   
        // Search for mangas matching the query (case-insensitive)
        const mangas = await prisma.manga.findMany({
            where: {
                mangaName: {
                    contains: query, // Match manga name
                }
            },
            orderBy: { createdAt: 'desc' }, // Optional: order by creation date
        });

        res.status(200).json(mangas); // Send the search results back
   
});

module.exports.getMangaPagination = tryCatch(async (req, res, next) => {
    // Get page and limit from query parameters (with default values)
    // console.log('pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeejaaaaa')
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;

    // Fetch paginated mangas from the database
    const allManga = await prisma.manga.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: 'desc',  // Optional: Order by creation date or any other field
        },
    });

    // Count total mangas for calculating the total number of pages
    const totalMangas = await prisma.manga.count();
    const totalPages = Math.ceil(totalMangas / limit);

    res.status(200).json({
        allManga,
        page,
        totalPages,
        totalMangas,
    });
});


module.exports.increaseViews = tryCatch(async (req, res, next) => {
    const { mangaId } = req.params;
    
   
    const manga = await prisma.manga.findUnique({
      where: { id: +mangaId },
    });

    if (!manga) return res.status(404).send("Manga not found");
  
    
    const updatedManga = await prisma.manga.update({
      where: { id: +mangaId},
      data: {
        views: manga.views + 1,
      },
    });
  
    res.status(200).json(updatedManga.views);
  });
  