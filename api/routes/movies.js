import { Router } from "express"

import { Movie } from '../models'

const config = require("../config/movies.json")

// import  config from '../config/movies.json'

// const config = import('../config/movies.json', {
//     assert: {
//         type: 'json'
//     }
// });

const router = Router();


router.get("/movies", async (req, res)=> {
    try{
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        
        let sort = req.query.sort || "rating"
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Action",
            "Ronmance",
            "Fanstay",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "Music",
            "Family"
        ];
        genre === "All"
        ?(genre =[...genreOptions])
        :(genre = req.query.genre.split(","));

        req.query.sort ? (sort = req.query.sort.split(",")):(sort = [sort]);

        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]] = "asc";
        }

        const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
            .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Movie.countDocuments({
            genre: { $in:[...genre]},
            name: { $regex: search, $options: "i" },
        }); 

        const response = {
            error:false,
            total,
            page:page + 1,
            limit,
            genre: genreOptions,
            movies
        }
        return res.status(200).json({
            success: true,
            response
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})


/**
const insertMovie = async () => {
    try {
        const docs = await Movie.insertMany(config);
        return Promise.resolve(docs);

    }catch(err){
        console.log(err)
        return Promise.reject(err)
    }
}

insertMovie()
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err));

*/
export default router