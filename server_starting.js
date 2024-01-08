// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const {generateLovePercent,gfName,gfName2, gfName3} = require("./feature")
// console.log(gfName);
// console.log(gfName2);
// console.log(gfName3);
// console.log(generateLovePercent());

// const home1 = fs.readFile("./index.html", () => {
//     console.log("File read");
// })
// console.log(home1);

// console.log(path.dirname("/home/index.html"));

// const home = fs.readFileSync("./index.html");

// const server = http.createServer((req, res) => {
//     // res.end("<h1>Noice</h1>");
//     // console.log("Servered");
//     console.log(req.method);
//     if(req.url==="/"){
//         // fs.readFile("./index.html", (err, home) => {
//             res.end(home);
//         // })
//     }
//     else if(req.url==="/about"){
//         res.end("<h1>About Page</h1>");
//     }
//     else if(req.url==="/contact"){
//         res.end("<h1>Contact Page</h1>");
//     }
//     else if(req.url==="/love"){
//         res.end(`<h1>Love is ${generateLovePercent()}</h1>`);
//     }
//     else{
//         res.end("<h1>Page Not Found</h1>");
//     }
// })

// server.listen(4000, () => {
//     console.log("Server is working");
// })