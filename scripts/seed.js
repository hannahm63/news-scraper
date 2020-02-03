const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/techCrunchArticlesDB'
);

const articleSeed = [
    {
        title: "Test Article #1",
        link: "fakelink.com",
        summary: "sidfliuvn sildjvb iv idsuvh sldv u uvsidnv sdf.",
        publishDate: "2020-02-02",
        author: "hannah",
        favorited: false,
        dateScraped: new Date(Date.now())
    },
    {
        title: "Test Article #2",
        link: "fakelink.com/sdfs",
        summary: "sidfliuvn sildjvb iv idsuvh sldv u uvsidnv sdf.",
        publishDate: "2020-02-14",
        author: "marie",
        favorited: false,
        dateScraped: new Date(Date.now())
    }
];

db.Article
    .remove({})
    .then(() => db.Article.collection.insertMany(articleSeed))
    .then(data => {
        console.log(`${data.result.n} user records inserted!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
