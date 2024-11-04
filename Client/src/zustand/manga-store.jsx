import { create } from 'zustand';
import axios from '../config/axios'


const token = localStorage.getItem('ACCESS_TOKEN');

const useMangaStore = create((set) => ({
    name: "Manga",
    mangas: [],
    chapters : [],
    mangaName: null,
    imageUrl: null,
    loading: false,
    titlePost: async (body, user) => {

        try {
            const result = await axios.post('/manga', body, {
               
            });

            set((state) => ({
                mangas: [{ ...result.data, user }, ...state.mangas],
            }));
        } catch (error) {
            console.error("Error posting title:", error);

        }
    },
    getMyManga: async () => {
        
        
        try {
            const result = await axios.get('manga/myManga')
        set(() => ({
            mangas : result.data,loading : false,

        }))

        } catch (error) {
            console.error("Error get Mymanga")
        }

    },
    deleteManga : async (id,token) => {
        try {
            await axios.delete(`/manga/myManga/${id}`);
        set(state => ({
            mangas : state.mangas.filter(manga=> manga.id !== id)
        }))
        } catch (err) {
            console.log("Can't Delete it")
        }
        
    },
    addChapter : async ( mangaId, data) => {
        try {
            await axios.post(`/manga/myManga/${mangaId}/Chapter`, data);
    
        set((state) => {
          const updatedMangas = state.mangas.map(manga =>
            manga.id === mangaId ? { ...manga, chapters: [...manga.chapters, chapter] } : manga
          );
          return { mangas: updatedMangas };
        });
        } catch (err) {
            console.log("Can't add Chapter")
        }
        
    },
    getAllManga : async() =>{
        const result = await axios.get("/manga/myManga/all")
        // console.log(result.data)
        set({mangas : result.data.allManga, loading : false})
    },
   getAllChapter : async(mangaId) => {
    const result =  await axios.get(`/manga/myManga/${mangaId}/Chapter`)
    // console.log(result)
    set({chapters : result.data.manga.chapters})
   },
   searchManga : async(query) => {
     try {
       const result = await axios.get(`/manga/search?query=${query}`)
       set ({mangas : result.data})
     } catch (err) {
       console.log(err)
     }
   }
    
}));

export default useMangaStore;
