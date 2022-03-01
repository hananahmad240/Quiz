const express = require("express");
const dotenv = require("dotenv");
const _ = require("lodash")
const async = require("async");
let RSVP = require('rsvp');
dotenv.config({
    path: ".env",
});

const app = express();
const port = process.env.PORT;


app.set('views', __dirname + "/views");
app.set("view engine", "jade")


// TODO Problem 1 With Plane Node.js
app.get('/I/want/title',  (req, res) => {
    try {
        let formatUrls = [];
        let formatInvalidUrls = [];
        let { address } = req.query;
        if (_.isEmpty(address)) {
            throw {err:"Plz Provide Some address to validate it !"}
        } else {
            address = !_.isArray(address) ? [address] : address
            let validUrls = address.filter(x => isValidURL(x));
            if (_.isEmpty(validUrls)) {
                let notValidUrls = address.filter(x => !isValidURL(x));
                for (const notValidUrl of notValidUrls) {
                    formatInvalidUrls.push({ label: notValidUrl, value: notValidUrl })
                }
                res.render("error", { formatInvalidUrls })
            }
            for (const validUrl of validUrls) {
                formatUrls.push({ label: validUrl, value: validUrl })
            }
        }
        res.render('index', { formatUrls: formatUrls })
    }
    catch (err) {
        res.send({ err: err }).status(400)
    }
});


// TODO Problem 2 With Plane async.js
// app.get('/I/want/title', (req, res) => {
//     let startQuiz = function () {
//         let events = ["Quiz"];
//         events.forEach(event => {
//             process(event, function () {
//                 console.log("Got callback for : " + event);
//             });
//         });
//         console.log("Ending Demo");
//     }

//     let process = function (processType, callback) {
//         let processTime = 0;
//         switch (processType) {
//             case "Quiz":
//                 processTime = 5000;
//                 let formatUrls = [];
//                 let formatInvalidUrls = [];
//                 let { address } = req.query;
//                 if (_.isEmpty(address)) {
//                     callback("Plz Provide Some address to validate it !");
//                 } else {
//                     address = !_.isArray(address) ? [address] : address
//                     let validUrls = address.filter(x => isValidURL(x));
//                     if (_.isEmpty(validUrls)) {
//                         let notValidUrls = address.filter(x => !isValidURL(x));
//                         for (const notValidUrl of notValidUrls) {
//                             formatInvalidUrls.push({ label: notValidUrl, value: notValidUrl })
//                         }
//                         res.render("error", { formatInvalidUrls })
//                     }
//                     for (const validUrl of validUrls) {
//                         formatUrls.push({ label: validUrl, value: validUrl })
//                     }
//                 }
//                 res.render('index', { formatUrls: formatUrls })
//                 break;
//         }
//         setTimeout(function () {
//             console.log("Finished : " + processType);
//             callback();
//         }, processTime);
//     }

//     startQuiz();

// });


// TODO Problem 3
// app.get('/I/want/title', (req, res) => {
//     let promise = new RSVP.Promise((resolve, reject) => {
//         let formatUrls = [];
//         let formatInvalidUrls = [];
//         let { address } = req.query;
//         if (_.isEmpty(address)) {
//             reject("Plz Provide Some address to validate it !")
//         } else {
//             address = !_.isArray(address) ? [address] : address
//             let validUrls = address.filter(x => isValidURL(x));
//             if (_.isEmpty(validUrls)) {
//                 let notValidUrls = address.filter(x => !isValidURL(x));
//                 for (const notValidUrl of notValidUrls) {
//                     formatInvalidUrls.push({ label: notValidUrl, value: notValidUrl })
//                 }
//                 resolve(formatInvalidUrls)
//                 res.render("error", { formatInvalidUrls })
//             }
//             for (const validUrl of validUrls) {
//                 formatUrls.push({ label: validUrl, value: validUrl })
//             }
//             resolve(formatUrls)
//         }
//     });

//     promise.then((value) => {
//         res.render('index', { formatUrls: value })
//     }).catch((error) => {
//         res.send({ err: err }).status(400)
//     });

// });




app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

const isValidURL = (string) => {
    let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};