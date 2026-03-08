require("dotenv").config();
require("express-async-errors");

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const connectFlash = require("connect-flash");

const connectDB = require("./db/connect");
const passportInit = require("./passport/passportInit")

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
app.use(helmet());
app.use(xss());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "mySessions",
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            secure: false, sameSite: "lax",

        }
    })
);

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());
app.use(require("./middleware/storeLocals"));

app.get("/", (req, res) => {
    res.render("index");
});
app.use("/sessions", require("./routes/sessionRoutes"));
app.use("/weeks", require("./routes/weeks")); 

app.use((req, res) => res.status(404).render("404"));
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

const port = process.env.PORT || 3000;

const start = async () => {
    
    await connectDB(process.env.MONGO_URI);
    console.log("MogoDB connected");

    app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)); 
    }; 
start();




