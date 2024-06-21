import express from "express";
import dotenv  from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import cors from 'cors'
import dbConnect from "./dbconnection.js"
import MovieRoutes from './routes/movies.js';


// import object from "./routes/movies.js"
const app = express();
dotenv.config()
app.use(express.json());
app.use(cors());

dbConnect()

app.use("/api", MovieRoutes);



const port = process.env.PORT || 4000;
// app.get('/', (req, res) => {
//   res.send('Home Route');
// });

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

