import mongoose from "mongoose";

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true};
    mongoose.connect(process.env.DB, connectionParams);


    mongoose.connection.on("connected", () => {
        console.log("Connected database successfully");
    })

    mongoose.connection.on("err", (err) => {
        console.log("Error while connection to database;" + err);

    })
    mongoose.connection.on("disconnected", () => {
        console.log("Mongodb connection disconnected");
    })
}

export default dbConnect;