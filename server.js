require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//database connection
mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {
    dbName: "backend",
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
})

//schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = mongoose.model("User", userSchema);

//using middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// use set to prevent entering extension again and again
app.set("view engine", "ejs");  

app.get("/getProducts",(req, res) => {
    // res.sendStatus(200);
    res.json({
        success: true,
        products: []
    })
})

// app.get("/", (req, res) => {
//     // res.status(400).send("Abhay")
//     // res.sendFile("./index.html");  // will not work
//     const directoryPath = path.resolve();  //  gives directory
//     console.log(directoryPath);
//     // res.sendFile(path.join(directoryPath, "./index.html"))
//     res.sendFile(path.join(__dirname, "./index.html"));
// })

const users = [];

const isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;
    if(token){

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded._id);

        next();
    }else{
        res.redirect("/login");
    }
}

app.get("/", isAuthenticated, (req, res) => {
    // res.render("index", {name: "Abhay"});
    // res.sendFile("index")
    console.log(req.user);
    res.render("logout", {name: req.user.name});
})

app.get("/add", async (req, res) => {
    await User.create({name: "Kunal", email: "kunal@gmail.com"});
    res.send("Nice");
})

// app.get("/success", (req, res) => {
//     res.render("success");
// })

// app.post("/contact", async (req, res) => {
//     // console.log(req.body);
//     // users.push({ name: req.body.name, email: req.body.email })
//     // console.log(users);
//     const {name, email} = req.body;

//     await Messge.create({ name, email });
//     res.redirect("/success");
// })

// app.get("/users", (req, res) => {
//     res.json({
//         users,
//     })
// })

app.get("/register", async(req,res) => {
    res.render("register");
})

app.post("/register", async(req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    
    console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60),
    });
    res.redirect("/");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async(req, res) => {
    const {email,password} = req.body;

    let user = await User.findOne({email});

    if(!user){
        return res.redirect("/register");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.render("login", {email, message: "Invalid Credentials"});
    }
    
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now()+60*1000),
    })
    res.redirect("/");
})

app.get("/logout", (req, res) => {
    // res.clearCookie("token");
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.redirect("/");
})

app.listen(4000, () => {
    console.log("Server is running on Port:4000");
})