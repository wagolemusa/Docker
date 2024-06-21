// const mongoose = require("mongoose");
import  { Schema, model } from  'mongoose';

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        require: true,
    },
    genre: {
        type: [String],
        require: true,
    },
    rating:{
        type: Number,
        require: true,
    }
})

const Movie = model("movies", MovieSchema);
export default Movie;