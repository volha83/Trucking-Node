require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");

const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("MogoDB connected");

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    };
};
start();




